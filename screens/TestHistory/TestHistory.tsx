import { FC, useEffect, useState } from 'react';
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

function getIconByScore(score: number, timing: number) {
  if (score > 1.0) return (
    <View style={{
      backgroundColor: ThemeColors.pinkLight,
      padding: ThemeDimensions.positive2,
      borderRadius: ThemeDimensions.positive2
    }}>
      <FeatherIcon name="frown" size={ThemeDimensions.positive8} color={ThemeColors.danger} />
    </View>
  )
  if (score >= 0.8) {
    if (timing < 0.8) return (
      <View style={{
        backgroundColor: ThemeColors.teal,
        padding: ThemeDimensions.positive2,
        borderRadius: ThemeDimensions.positive2
      }}>
        <FeatherIcon name="smile" size={ThemeDimensions.positive8} color={ThemeColors.success} />
      </View>
    )
    if (timing < 1.0) return (
      <View style={{
        backgroundColor: ThemeColors.yellowLight,
        padding: ThemeDimensions.positive2,
        borderRadius: ThemeDimensions.positive2
      }}>
        <FeatherIcon name="meh" size={ThemeDimensions.positive8} color={ThemeColors.warning} />
      </View>
    )
  }

  if (score >= 0.65) {
    if (timing < 1.0) return (
      <View style={{
        backgroundColor: ThemeColors.yellowLight,
        padding: ThemeDimensions.positive2,
        borderRadius: ThemeDimensions.positive2
      }}>
        <FeatherIcon name="meh" size={ThemeDimensions.positive8} color={ThemeColors.warning} />
      </View>
    )
  }

  return (
    <View style={{
      backgroundColor: ThemeColors.pinkLight,
      padding: ThemeDimensions.positive2,
      borderRadius: ThemeDimensions.positive2
    }}>
      <FeatherIcon name="frown" size={ThemeDimensions.positive8} color={ThemeColors.danger} />
    </View>
  )
}

type TestHistoryProps = NativeStackScreenProps<RootStackParamList, "TestHistory">;

const TestHistory: FC<TestHistoryProps> = ({ navigation }) => {
  const [miniTestHistoryList, setMiniTestHistoryList] = useState<IMiniTestHistory[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMiniTestById = async () => {
      try {
        const response = await getMiniTestHistory();
        if (response.status === 200) {
          const miniTestHistoryData: IMiniTestHistory[] = response.data.data
          setMiniTestHistoryList(miniTestHistoryData);
          setIsLoading(false)
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
      <ScrollView>
        <View style={{ padding: ThemeDimensions.positive2, paddingBottom: 0, }}>
          <Text style={ThemeStyles.h2}>
            Mini test history
          </Text>
        </View>
        <View style={{ padding: ThemeDimensions.positive2, paddingTop: 0, }}>
          {isLoading
            ? <LoadingView />
            : miniTestHistoryList?.map((miniTestHistory, miniTestHistoryIndex) => (
              <Row
                key={miniTestHistory._id ?? miniTestHistoryIndex}
                style={{
                  marginVertical: ThemeDimensions.positive1,
                  backgroundColor: ThemeColors.white,
                  padding: ThemeDimensions.positive1,
                  borderRadius: ThemeDimensions.positive2,
                }}
              >
                <Column style={{ flex: undefined }}>
                  {getIconByScore(
                    Number(miniTestHistory.totalCorrectAnswers) / Number(miniTestHistory.totalQuestions),
                    Number(miniTestHistory.timeTaken) / Number(miniTestHistory.timeLimit),
                  )}
                </Column>

                <Column style={{ paddingHorizontal: ThemeDimensions.positive2 }}>
                  <Text style={{
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