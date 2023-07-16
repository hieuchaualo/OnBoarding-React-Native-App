import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import { useForm, Controller } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import AppTextInput from "../../components/AppTextInput";
const { height } = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Result">;

const ResultScreen: React.FC<Props> = ({ route, navigation }) => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    console.log(route.params.finalAnswers);
    let _score = 0;
    route.params.finalAnswers.map((answer, answersKeyIndex) => {
      if (
        answer.toLowerCase() ===
        route.params.finalAnswersForm[answersKeyIndex].toLowerCase()
      )
        _score++;
    });
    setScore(_score);
  }, []);
  return (
    <SafeAreaView>
      <View>
        <Text>Marks: {score}</Text>
        <Text>Total questions: {route.params.finalAnswers.length}</Text>
        <Text>Correct: {score}</Text>
        <Text>Incorrect: {route.params.finalAnswers.length - score}</Text>
        <Text>
          Unanwsered:{" "}
          {
            route.params.finalAnswersForm.filter((answer) => answer === "")
              .length
          }
        </Text>

        {route.params.finalAnswers.map((answer, finalAnswersIndex) => (
          <Text>
            {answer} | {route.params.finalAnswersForm[finalAnswersIndex]} |
            {answer.toLowerCase() === route.params.finalAnswersForm[finalAnswersIndex].toLowerCase()
              ? <Text>V</Text>
              : <Text>X</Text>
              }
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ResultScreen;
