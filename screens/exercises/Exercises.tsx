import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import FeatherIcon from "react-native-vector-icons/Feather";
import { getMiniTestById } from "../../api";
import { IMiniTest, MiniTestTypes } from "../../interfaces";
import { LoadingView } from "../../components";
import { toImgUrl } from "../../utils";
import { AnswerByOptions, AnswerByTextInput, TimeCountdown } from "./components";
import { ThemeFonts } from "../../constants";
const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Exercises">;

const ExercisesScreen: React.FC<Props> = ({ route, navigation }) => {
  const { miniTestId } = route.params;
  const { navigate } = navigation;

  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);

  const [answersForm, setAnswersForm] = React.useState([""]);
  const [miniTest, setMiniTest] = React.useState<IMiniTest>();

  useEffect(() => {
    const fetchMiniTestById = async () => {
      const response = await getMiniTestById(miniTestId);
      if (response.status === 200) {
        const miniTestData: IMiniTest = response.data.data
        setMiniTest(miniTestData);
        setAnswersForm(Array(miniTestData.quizzes?.length).fill(""));
      }
    }
    fetchMiniTestById()
    return () => setMiniTest(undefined)
  }, [miniTestId]);

  useEffect(() => {
    const interval = setInterval(() => setTotalTime(totalTime + 1), 1000);
    return () => clearInterval(interval);
  }, [totalTime])

  const handleOnAnswer = (quizIndex: number, option: string) => {
    const newAnswerForm = answersForm.map((answerValue, answersIndex) =>
      answersIndex === quizIndex ? option : answerValue
    );
    setAnswersForm(newAnswerForm);
  }

  const handleOnTimeout = () => {
    setIsTimeout(true)
  }

  if (!miniTest) return (
    <SafeAreaView style={{ backgroundColor: '#f3f5f9', height }} >
      <View style={{ marginTop: height / 2.2 }}>
        <LoadingView />
      </View>
    </SafeAreaView>
  )

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

            <Text style={styles.headerTitle}>Mini Test</Text>

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
            <ImageBackground
              style={{
                height: height / 4,
              }}
              resizeMode="contain"
              source={{ uri: toImgUrl(miniTest.thumbnail) }}
            />
            <View style={styles.info}>
              <Text style={styles.infoTitle}>{miniTest.title}</Text>
              <Text style={styles.description}>{miniTest.content}</Text>
            </View>

            <View style={{ paddingTop: 32, marginBottom: 100 }}>
              {miniTest.quizzes?.map((quiz, quizIndex) => (
                <View style={styles.card} key={quiz._id}>
                  <Text style={styles.text} >
                    {quizIndex + 1}. {quiz.question}
                  </Text>
                  {miniTest.typeOfQuiz === MiniTestTypes.FillTheBlank
                    ? <AnswerByTextInput
                      quizIndex={quizIndex}
                      answer={answersForm[quizIndex]}
                      handleOnAnswer={handleOnAnswer}
                    />
                    : <AnswerByOptions
                      quizIndex={quizIndex}
                      options={quiz.options}
                      answersForm={answersForm}
                      handleOnAnswer={handleOnAnswer}
                      optionStyle={styles.option}
                      optionTextStyle={styles.optionText}
                    />
                  }
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <View style={styles.overlayContentTop}>
            <TimeCountdown
              style={styles.text}
              timeRemainingInSecond={miniTest.timeLimit}
              handleOnTimeout={handleOnTimeout}
              isReverse={false}
            />
          </View>
          <View style={styles.overlayContentTop}>
            {isTimeout && <TimeCountdown
              style={{ ...styles.text, color: Colors.danger }}
              timeRemainingInSecond={0}
              handleOnTimeout={() => { }}
              isReverse={true}
            />
            }
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (isTimeout) {
              // do nothing
            }

            navigate(
              "Result",
              {
                finalAnswers: miniTest.quizzes?.map(quiz => quiz.answers[0]) ?? [],
                finalAnswersForm: answersForm,
                totalTime,
                miniTestId: miniTest._id,
                timeLimit: miniTest.timeLimit ?? 0,
              }
            );
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>
              {isTimeout ? "Timeout!" : "Submit"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { ExercisesScreen };

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "Colors.gray",
    borderBottomWidth: 2,
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  option: {
    padding: 8,
    marginVertical: Spacing * 0.5,
    borderRadius: Spacing,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    paddingHorizontal: 10,
    fontFamily: ThemeFonts.bold,
    letterSpacing: 0.5,
    lineHeight: 26,
    fontSize: FontSize.small,
  },
  text: {
    fontFamily: ThemeFonts.semiBold,
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 26,
    fontSize: FontSize.medium,
    paddingBottom: 8,
  },

  info: {
    marginTop: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  infoTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "600",
    letterSpacing: 0.38,
    color: "#000000",
    marginBottom: 6,
  },
  description: {
    fontFamily: ThemeFonts.bold,
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 28,
    fontSize: FontSize.medium,
  },
  overlayContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  overlayContentTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  timer: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    color: "#8e8e93",
    marginRight: 4,
  },

  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  btnText: {
    color: "#fff",
    fontFamily: ThemeFonts.semiBold,
    fontSize: FontSize.medium,
  },
  card: {
    padding: 8,
    alignItems: 'stretch',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
