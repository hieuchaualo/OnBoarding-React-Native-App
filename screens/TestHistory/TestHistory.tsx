import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Colors from "../../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import FeatherIcon from "react-native-vector-icons/Feather";
import { IMiniTestHistory } from '../../interfaces';
import { getMiniTestHistory } from '../../api';
import { fromSecondToDateTime } from '../../utils';
import FontSize from '../../constants/FontSize';
import { ThemeFonts } from '../../constants';
const { height } = Dimensions.get("window");


const tabs = ['All', 'Excellent', 'Medium', 'Bad'];

function getIconByScore(score: number, timing: number) {
  console.log(score)
  if (score > 1.0) return (
    <View style={[styles.cardImg, { backgroundColor: '#F4C8C5' }]}>
      <FeatherIcon name="frown" size={48} color="#E63E03" />
    </View>
  )
  if (score >= 0.8) {
    if (timing < 0.8) return (
      <View style={[styles.cardImg, { backgroundColor: '#C7EFCB' }]}>
        <FeatherIcon name="smile" size={48} color="#0FB866" />
      </View>
    )
    if (timing < 1.0) return (
      <View style={[styles.cardImg, { backgroundColor: '#F9E5A3' }]}>
        <FeatherIcon name="meh" size={48} color="#FDA400" />
      </View>
    )
  }

  if (score >= 0.65) {
    if (timing < 1.0) return (
      <View style={[styles.cardImg, { backgroundColor: '#F9E5A3' }]}>
        <FeatherIcon name="meh" size={48} color="#FDA400" />
      </View>
    )
  }

  return (
    <View style={[styles.cardImg, { backgroundColor: '#F4C8C5' }]}>
      <FeatherIcon name="frown" size={48} color="#E63E03" />
    </View>
  )
}

type Props = NativeStackScreenProps<RootStackParamList, "TestHistory">;

const TestHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [miniTestHistoryList, setMiniTestHistoryList] = React.useState<IMiniTestHistory[]>();

  useEffect(() => {
    const fetchMiniTestById = async () => {
      try {
        const response = await getMiniTestHistory();
        if (response.status === 200) {
          const miniTestHistoryData: IMiniTestHistory[] = response.data.data
          setMiniTestHistoryList(miniTestHistoryData);
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchMiniTestById()
    return () => setMiniTestHistoryList(undefined)
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f5f9' }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerAction}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <FeatherIcon name="arrow-left" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.headerTitle}>My Test History</Text>

            <View style={[styles.headerAction, { alignItems: "flex-end" }]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
              >
                <FeatherIcon name="more-vertical" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={{ marginBottom: 64 }}>
            {miniTestHistoryList?.map((miniTestHistory, miniTestHistoryIndex) => (
              <View style={styles.card} key={miniTestHistory._id ?? miniTestHistoryIndex}>
                {getIconByScore(
                  Number(miniTestHistory.totalCorrectAnswers) / Number(miniTestHistory.totalQuestions),
                  Number(miniTestHistory.timeTaken) / Number(miniTestHistory.timeLimit),
                )}

                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>
                    {typeof miniTestHistoryList[0]?.miniTest === 'object' && miniTestHistoryList[0]?.miniTest.title}
                  </Text>
                  <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                      <Text style={styles.cardRowItemText}>Time taken: {fromSecondToDateTime(miniTestHistory.timeTaken)}</Text>
                    </View>
                    <Text style={styles.cardRowDivider}>·</Text>
                    <View style={styles.cardRowItem}>
                      <Text style={styles.cardRowItemText}>Mark: {miniTestHistory.totalCorrectAnswers}/{miniTestHistory.totalQuestions} </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export { TestHistoryScreen };


const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000",
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 8,
    alignItems: "center",
    justifyContent: 'center'
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  cardTitle: {
    fontFamily: ThemeFonts.semiBold,
    fontSize: FontSize.small,
    marginRight: 4,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: Colors.primary,
  },
  btnText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -8,
    marginBottom: 12,
  },
  cardRowDivider: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#939393',
  },
  cardRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderColor: 'transparent',
  },
  cardRowItemText: {
    fontFamily: ThemeFonts.regular,
    fontSize: FontSize.small,
    color: '#939393',
  },
});