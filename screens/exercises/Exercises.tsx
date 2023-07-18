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
  Image,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import FeatherIcon from "react-native-vector-icons/Feather";
import { getItemAsync } from "expo-secure-store";
import { getReadingTest, getReadingTests } from "../../api/readingTestApi";
import { set } from "react-hook-form";
const { height } = Dimensions.get("window");

interface IQuiz {
  question: string;
  options: string[];
  answers: string[];
}
interface ReadingTests {
  content: string;
  title: string;
  quiz: [IQuiz];
}

const TRUE_FALSE_NOTGIVEN_OPTIONS = ["TRUE", "FALSE", "NOT GIVEN"];
type Props = NativeStackScreenProps<RootStackParamList, "Exercises">;

const ExercisesScreen: React.FC<Props> = ({
  navigation: { navigate },
}) => {
  const [isTimerStart, setIsTimerStart] = useState(true);
  const [timerDuration, setTimerDuration] = useState(600000);
  const [resetTimer, setResetTimer] = useState(false);
  const [value, setValue] = React.useState("");
  const [answersForm, setAnswersForm] = React.useState([""]);
  const [readingTest, setReadingTest] = React.useState<ReadingTests>({
    content: "",
    title: "",
    quiz: [
      {
        question: "",
        options: [],
        answers: [],
      },
    ],
  });
  useEffect(() => {
    (async () => {
      const listReadingTest = await getReadingTests();
      const _listReadingTest = listReadingTest.data.data;
      const _readingTest = await getReadingTest(_listReadingTest[0]._id);
      setReadingTest(_readingTest.data);
      setAnswersForm(Array(_readingTest.data.quiz.length).fill(""));
    })();
    answersForm.map((answer) => console.log(answer));
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
              source={require("../../assets/images/ha.jpg")}
            />
            <View style={styles.info}>
              <Text style={styles.infoTitle}>{readingTest.title}</Text>
              <Text style={styles.description}>{readingTest.content}</Text>
            </View>

            <View style = {{paddingTop: 32}}>
              {readingTest.quiz.map((quizz, quizzIndex) => (
                <View style={styles.card}>
                  <Text style = {styles.text} >{quizz.question}</Text>
                  {(quizz.options.length === 0
                    ? TRUE_FALSE_NOTGIVEN_OPTIONS
                    : readingTest.quiz[0].options
                  ).map((option, optionIndex) => (
                    <View key={optionIndex}>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          const newAnswerForm = answersForm.map(
                            (answerValue, answersIndex) =>
                              answersIndex === quizzIndex ? option : answerValue
                          );
                          setAnswersForm(newAnswerForm);
                        }}
                      >
                        <View
                          style={[
                            styles.option,
                            answersForm[quizzIndex] === option
                              ? { backgroundColor: "#F6C9C6"}
                              : { backgroundColor: Colors.gray, },
                          ]}
                        >
                          <Text
                            style={[
                              styles.optionText,
                              answersForm[quizzIndex] === option
                                ? { color: Colors.text}
                                : { borderBottomColor: Colors.gray },
                            ]}
                          >
                            {option}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <View style={styles.overlayContentTop}></View>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigate("Result", {
              finalAnswers: readingTest.quiz.map(quizz => quizz.answers[0]),
              finalAnswersForm: answersForm,
            });
          }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExercisesScreen;

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
  option:{
    padding: 8,
    marginVertical: Spacing * 0.5,
    borderRadius: Spacing,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontFamily: Font[ "poppins-regular" ],
    letterSpacing: 0.5,
    lineHeight: 26,
    fontSize: FontSize.small,
  },
  text: {
    fontFamily: Font[ "poppins-semiBold"],
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 26,
    fontSize: FontSize.medium,
    paddingBottom:8,
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
    fontFamily: Font["poppins-regular"],
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
    marginBottom: 2,
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
    fontFamily: Font[ "poppins-semiBold"],
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
