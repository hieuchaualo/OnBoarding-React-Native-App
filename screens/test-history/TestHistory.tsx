import { FC, ReactNode, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FeatherIcon from "react-native-vector-icons/Feather";
import { IMiniTestHistory } from '../../interfaces';
import { getMiniTestHistory } from '../../api';
import { fromSecondToDateTime } from '../../utils';
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { BottomNav, Column, LoadingView, Row } from '../../components';
import { RootStackParamList } from '../../types';
import { PieChart } from 'react-native-chart-kit';

const iconStyle = {
  padding: ThemeDimensions.positive2,
  borderTopLeftRadius: ThemeDimensions.positive1,
  borderBottomLeftRadius: ThemeDimensions.positive1,
}

const FrownIcon = (): ReactNode => <View style={{
  ...iconStyle,
  backgroundColor: ThemeColors.pinkLight,
}}>
  <FeatherIcon name="frown" size={ThemeDimensions.positive8} color={ThemeColors.danger} />
</View>

const MehIcon = (): ReactNode => <View style={{
  ...iconStyle,
  backgroundColor: ThemeColors.yellowLight,
}}>
  <FeatherIcon name="meh" size={ThemeDimensions.positive8} color={ThemeColors.warning} />
</View>

const SmellIcon = (): ReactNode => <View style={{
  ...iconStyle,
  backgroundColor: '#ceecce',
}}>
  <FeatherIcon name="smile" size={ThemeDimensions.positive8} color={ThemeColors.teal} />
</View>


const iconByScore = {
  excellent: SmellIcon,
  ordinary: MehIcon,
  fail: FrownIcon,
}

function getRankingByScore(score: number, timing: number) {
  if (score > 1.0) return (
    'fail'
  )

  if (score >= 0.8) {
    if (timing < 0.8) return (
      'excellent'
    )
    if (timing < 1.0) return (
      'ordinary'
    )
  }

  if (score >= 0.65) {
    if (timing < 1.0) return (
      'ordinary'
    )
  }

  return (
    'fail'
  )
}

type TRanking = {
  excellent: number;
  ordinary: number;
  fail: number;
}

const getRanking = (miniTestHistoryList: IMiniTestHistory[]): TRanking => {
  const ranking = {
    excellent: 0,
    ordinary: 0,
    fail: 0,
  }

  miniTestHistoryList.forEach(miniTestHistory => {
    const rankingNamed = getRankingByScore(
      Number(miniTestHistory.totalCorrectAnswers) / Number(miniTestHistory.totalQuestions),
      Number(miniTestHistory.timeTaken) / Number(miniTestHistory.timeLimit),
    )
    ranking[rankingNamed] += 1
  })

  return ranking
}

type TestHistoryProps = NativeStackScreenProps<RootStackParamList, "TestHistory">;

const TestHistory: FC<TestHistoryProps> = ({ navigation }) => {
  const [miniTestHistoryList, setMiniTestHistoryList] = useState<IMiniTestHistory[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [pieChartData, setPieChartData] = useState<TRanking>()

  useEffect(() => {
    const fetchMiniTestById = async () => {
      try {
        const response = await getMiniTestHistory();
        if (response.status === 200) {
          const miniTestHistoryData: IMiniTestHistory[] = response.data.data
          setMiniTestHistoryList(miniTestHistoryData);
          setIsLoading(false)
          const ranking = getRanking(miniTestHistoryData)
          setPieChartData(ranking)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchMiniTestById()
    return () => setMiniTestHistoryList(undefined)
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <View style={{ padding: ThemeDimensions.positive2, paddingBottom: 0, }}>
        <Text style={ThemeStyles.h2}>
          Mini test history
        </Text>
      </View>

      <ScrollView>
        {pieChartData && <Row>
          <Column style={{ paddingTop: ThemeDimensions.positive1, }}>
            <PieChart
              data={[
                {
                  name: "Excellent",
                  ranking: pieChartData.excellent,
                  color: ThemeColors.success,
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15
                },
                {
                  name: "Ordinary",
                  ranking: pieChartData.ordinary,
                  color: ThemeColors.warning,
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15
                },
                {
                  name: "Fail",
                  ranking: pieChartData.fail,
                  color: ThemeColors.danger,
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15
                },
              ]}
              width={ThemeDimensions.windowWidth - ThemeDimensions.positive4}
              height={ThemeDimensions.windowWidth50}
              accessor={"ranking"}
              backgroundColor={ThemeColors.white}
              chartConfig={{
                decimalPlaces: 0, // optional, defaults to 2dp
                color: () => ThemeColors.warning,
                labelColor: () => ThemeColors.primary,
                backgroundGradientFrom: ThemeColors.white,
                backgroundGradientTo: ThemeColors.white,
                propsForDots: { r: ThemeDimensions.positive1 },
              }}
              paddingLeft={"0"}
              style={{
                margin: ThemeDimensions.positive1,
                backgroundColor: ThemeColors.white,
                borderRadius: ThemeDimensions.positive1,
              }}
            />
          </Column>
        </Row>}

        <View style={{ padding: ThemeDimensions.positive1, paddingTop: 0, }}>
          {isLoading
            ? <Column style={{ height: ThemeDimensions.windowHeight75 }}><LoadingView /></Column>
            : miniTestHistoryList?.map((miniTestHistory, miniTestHistoryIndex) => (
              <Row
                key={miniTestHistory._id ?? miniTestHistoryIndex}
                style={{
                  margin: ThemeDimensions.positive1,
                  backgroundColor: ThemeColors.white,
                  borderRadius: ThemeDimensions.positive1,
                }}
              >
                <Column style={{ flex: undefined }}>
                  {iconByScore[getRankingByScore(
                    Number(miniTestHistory.totalCorrectAnswers) / Number(miniTestHistory.totalQuestions),
                    Number(miniTestHistory.timeTaken) / Number(miniTestHistory.timeLimit),
                  )]()}
                </Column>

                <Column style={{ paddingHorizontal: ThemeDimensions.positive2, }}>
                  <Text numberOfLines={2} style={{
                    fontFamily: ThemeFonts.semiBold,
                    fontSize: ThemeDimensions.fontSize.md,
                    color: ThemeColors.dark,
                    width: ThemeDimensions.percentage100,
                  }}>
                    {typeof miniTestHistory.miniTest === 'object' && miniTestHistory.miniTest.title}
                  </Text>

                  <Row style={{ justifyContent: 'space-between', width: ThemeDimensions.percentage100 }}>
                    <Text style={{
                      fontFamily: ThemeFonts.regular,
                      fontSize: ThemeDimensions.fontSize.md,
                      color: ThemeColors.secondary,
                    }}>
                      Taken: {fromSecondToDateTime(miniTestHistory.timeTaken)}
                    </Text>

                    <Text style={{
                      fontFamily: ThemeFonts.regular,
                      fontSize: ThemeDimensions.fontSize.md,
                      color: ThemeColors.secondary,
                    }}>
                      Mark: {miniTestHistory.totalCorrectAnswers}/{miniTestHistory.totalQuestions}
                    </Text>
                  </Row>
                </Column>
              </Row>
            ))}
        </View>
      </ScrollView>
      <BottomNav navigate={navigation.navigate} activeKey={RootStackName.TestHistory} />
    </View>
  );
}

export { TestHistory };