import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "../../constants/Spacing";
import Colors from "../../constants/Colors";
import FeatherIcon from "react-native-vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fromSecondToDateTime } from "../../utils";
import { IMiniTestHistory } from "../../interfaces";
import { updateMiniTestHistory } from "../../api";
import { ThemeFonts } from "../../constants";
import FontSize from "../../constants/FontSize";
import { RootStackParamList } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

const ResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const { finalAnswersForm, finalAnswers, totalTime, miniTestId, timeLimit } = route.params
  const [score, setScore] = useState(0);

  useEffect(() => {
    let _score = 0;
    finalAnswers.forEach((answer, answersKeyIndex) => {
      if (
        answer.toLowerCase() === finalAnswersForm[answersKeyIndex].toLowerCase()
      )
        _score++;
    });

    const pushMiniTestHistory = async () => {
      try {
        const formBody: IMiniTestHistory = {
          timeLimit,
          miniTest: miniTestId,
          timeTaken: totalTime,
          totalCorrectAnswers: _score,
          totalQuestions: finalAnswers.length,
        }
        const response = await updateMiniTestHistory(formBody)
      } catch (error) {
        console.error(error)
      }
    }

    pushMiniTestHistory()
    setScore(_score);
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

            <Text style={styles.headerTitle}>Result</Text>

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
          <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
            <View>
              <View style={styles.row}>
                <View style={styles.tab}>
                  <Text style={styles.title}>Total questions:
                    <Text style={styles.score}> {finalAnswers.length}
                    </Text>
                  </Text>
                </View>
                <View style={[styles.tab, { borderColor: '#1EA431' }]}>
                  <Text style={styles.title}>Correct:
                    <Text style={styles.score}>  {score}
                    </Text>
                  </Text>
                </View>
                <View style={styles.tab}>
                  <Text style={styles.title}>Marks:
                    <Text style={styles.score}> {score}
                    </Text>
                  </Text>
                </View>
                <View style={[styles.tab, { borderColor: '#DB221A' }]}>
                  <Text style={styles.title}>Incorrect:
                    <Text style={styles.score}> {finalAnswers.length - score}
                    </Text>
                  </Text>
                </View>
                <View style={styles.tab}>
                  <Text style={styles.title}>Timer: {
                    fromSecondToDateTime(totalTime)
                  }</Text>
                </View>
                <View style={[styles.tab, { borderColor: '#D67813' }]}>
                  <Text style={styles.title}>
                    Unanswered:
                    <Text style={styles.score}> {" "}
                      {finalAnswersForm.filter((answer) => answer === "").length}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.card}>
                <Text style={styles.title2} >Answer Table</Text>
                {finalAnswers.map((answer, finalAnswersIndex) => (
                  <Text style={styles.text} key={finalAnswersIndex} >
                    {answer} | {finalAnswersForm[finalAnswersIndex]} {answer.toLowerCase() === finalAnswersForm[finalAnswersIndex].toLowerCase()
                      ? <FeatherIcon
                        color='#1EA431'
                        name="check"
                        size={22}
                      />
                      : <FeatherIcon
                        color='#DB221A'
                        name="x"
                        size={22}
                      />
                    }
                  </Text>
                ))}

              </View>

            </View>

            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/images/healthy.png")}
                style={{
                  width: Spacing * 8,
                  height: Spacing * 8,
                  marginBottom: 16
                }}
              />
              <Text style={[styles.title2, { color: "#0FB866" }]} >Yay!  Keep up the good work!</Text>
            </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};


export { ResultScreen };

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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: Spacing * 2,
    paddingTop: Spacing * 2,
  },
  title: {
    textAlign: 'left',
    fontFamily: ThemeFonts.regular,
    color: Colors.text,
    letterSpacing: 0.5,
    fontSize: FontSize.medium,
    paddingBottom: 8,
    borderColor: Colors.gray,
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
  },

  score: {
    color: Colors.primary,
    fontSize: FontSize.large,
    fontFamily: ThemeFonts.bold
  },
  tab: {
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    width: "48%",
    minWidth: '48%',
    borderColor: '#6D7176',
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
  },
  card: {
    padding: 8,
    alignItems: 'stretch',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  title2: {
    fontFamily: ThemeFonts.semiBold,
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 26,
    fontSize: FontSize.medium,
    paddingBottom: 8,
  },
  text: {
    fontFamily: ThemeFonts.regular,
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 26,
    fontSize: FontSize.medium,
    paddingBottom: 8,
  },
});
