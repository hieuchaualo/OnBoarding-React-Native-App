import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fromSecondToDateTime } from "../../utils";
import { IMiniTestHistory } from "../../interfaces";
import { updateMiniTestHistory, getNextMiniTestIdById } from "../../api";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from "../../constants";
import { RootStackParamList } from "../../types";
import { Button, Column, Row } from "../../components";
import { FontAwesome5 } from "@expo/vector-icons";

const iconFacesResources = {
  "smell": require("../../assets/images/icon_good.png"),
  "meh": require("../../assets/images/icon_meh.png"),
  "frown": require("../../assets/images/icon_frown.png"),
}

const GoodResult: FC = () => <>
  <Image source={iconFacesResources.smell} style={styles.icon} />
  <Text style={{ ...ThemeStyles.h4, color: ThemeColors.success }}>
    Yay! {'\n'} Keep up the good work!
  </Text>
</>

const MehResult: FC = () => <>
  <Image source={iconFacesResources.meh} style={styles.icon} />
  <Text style={{ ...ThemeStyles.h4, color: ThemeColors.secondary }}>
    Don't give up!
    {'\n'}
    Just find the right way!
  </Text>
</>

const FrownResult: FC = () => <>
  <Image source={iconFacesResources.frown} style={styles.icon} />
  <Text style={{ ...ThemeStyles.h4, color: ThemeColors.secondary }}>
    Unexpected!
    {'\n'}
    Practice more to improve your reading skill!
  </Text>
</>

type ResultProps = NativeStackScreenProps<RootStackParamList, RootStackName.Result>;

const Result: FC<ResultProps> = ({ route, navigation }) => {
  const { finalAnswersForm, finalAnswers, totalTime, miniTestId, timeLimit } = route.params
  const [score, setScore] = useState(0);
  const [nextMiniTestId, setNextMiniTestId] = useState<string>('');

  useEffect(() => {
    let _score = 0;
    finalAnswers.forEach(
      (answer, answersKeyIndex) => answer.toLowerCase() === finalAnswersForm[answersKeyIndex].toLowerCase() && _score++
    );

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

    const getNextMiniTestId = async () => {
      try {
        const response = await getNextMiniTestIdById(miniTestId)
        if (response.status === 200) {
          setNextMiniTestId(response.data.data[0]?._id ?? '')
        }
      } catch (error) {
        console.error(error)
      }
    }

    const backDisable = navigation.addListener('beforeRemove', event => {
      if (event.data.action.type === "NAVIGATE") {
        navigation.dispatch(event.data.action)
        navigation.removeListener('beforeRemove', backDisable)
      }
      event.preventDefault()
    })

    pushMiniTestHistory()
    getNextMiniTestId()
    setScore(_score);

    return () => navigation.removeListener('beforeRemove', backDisable);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <ScrollView>
        <View style={{ padding: ThemeDimensions.positive2 }}>
          <Text style={ThemeStyles.h2}>
            Result Details
          </Text>

          <Column style={{ marginTop: ThemeDimensions.positive2 }}>
            {(score / finalAnswers.length >= 0.8) && <GoodResult />}
            {(score / finalAnswers.length < 0.8 && score / finalAnswers.length >= 0.5) && <MehResult />}
            {(score / finalAnswers.length < 0.5) && <FrownResult />}
          </Column>

          <Row style={{ flex: 1, flexWrap: 'wrap', paddingVertical: ThemeDimensions.positive3 }}>
            <View style={styles.cell}>
              <Text style={{ ...ThemeStyles.c4 }}>
                Questions: { }
                <Text style={styles.cellTextHighlight}>
                  {finalAnswers.length}
                </Text>
              </Text>
            </View>

            <View style={{ ...styles.cell, borderColor: ThemeColors.success }}>
              <Text style={{ ...ThemeStyles.c4 }}>
                Correct: { }
                <Text style={styles.cellTextHighlight}>
                  {score}
                </Text>
              </Text>
            </View>

            <View style={styles.cell}>
              <Text style={{ ...ThemeStyles.c4 }}>
                Marks: { }
                <Text style={styles.cellTextHighlight}>
                  {score}/{finalAnswers.length}
                </Text>
              </Text>
            </View>

            <View style={{ ...styles.cell, borderColor: ThemeColors.danger }}>
              <Text style={{ ...ThemeStyles.c4 }}>
                Incorrect: { }
                <Text style={styles.cellTextHighlight}>
                  {finalAnswers.length - score}
                </Text>
              </Text>
            </View>

            <View style={styles.cell}>
              <Text style={{ ...ThemeStyles.c4 }}>
                Taken: { }
                {fromSecondToDateTime(totalTime)}
              </Text>
            </View>

            <View style={{ ...styles.cell, borderColor: ThemeColors.yellowDark }}>
              <Text style={{ ...ThemeStyles.c4 }}>
                Unanswered: { }
                <Text style={styles.cellTextHighlight}>
                  {finalAnswersForm.filter((answer) => answer === "").length}
                </Text>
              </Text>
            </View>
          </Row>

          {/* Answer key */}
          <View style={{
            paddingTop: ThemeDimensions.positive2,
            backgroundColor: ThemeColors.white,
            borderRadius: ThemeDimensions.positive1,
          }}>
            <Row style={{ flex: 1, flexWrap: 'wrap' }}>
              <View style={{ width: ThemeDimensions.percentage5, }}>
                <Text style={{ ...ThemeStyles.c4, fontFamily: ThemeFonts.semiBold }}>
                  #
                </Text>
              </View>

              <View style={{
                width: ThemeDimensions.percentage45,
                paddingHorizontal: ThemeDimensions.positive1,
              }}>
                <Text style={{ ...ThemeStyles.c4, fontFamily: ThemeFonts.semiBold }}>
                  Your answer
                </Text>
              </View>

              <View style={{ width: ThemeDimensions.percentage40 }}>
                <Text style={{ ...ThemeStyles.c4, fontFamily: ThemeFonts.semiBold }}>
                  Answer key
                </Text>
              </View>
            </Row>

            {finalAnswers.map((answer, finalAnswersIndex) => {
              const isCorrect = answer.toLowerCase() === finalAnswersForm[finalAnswersIndex].toLowerCase()

              return (
                <Row key={finalAnswersIndex} style={{ alignItems: "flex-start", paddingVertical: ThemeDimensions.positive1 }}>
                  <View style={{ width: ThemeDimensions.percentage5, }}>
                    <Text style={{ ...ThemeStyles.c4, fontFamily: ThemeFonts.semiBold }}>
                      {finalAnswersIndex + 1}
                    </Text>
                  </View>

                  <View style={{
                    width: ThemeDimensions.percentage45,
                    paddingHorizontal: ThemeDimensions.positive1,
                  }}>
                    <Text style={{
                      ...ThemeStyles.c4,
                      color: isCorrect ? ThemeColors.success : ThemeColors.danger,
                    }}>
                      {isCorrect
                        ? <FeatherIcon
                          color={ThemeColors.success}
                          name="check"
                          size={ThemeDimensions.positive3}
                        />
                        : <FeatherIcon
                          color={ThemeColors.danger}
                          name="x"
                          size={ThemeDimensions.positive3}
                        />
                      } { }
                      {finalAnswersForm[finalAnswersIndex]}
                    </Text>
                  </View>

                  <View style={{ width: ThemeDimensions.percentage40 }}>
                    <Text style={ThemeStyles.c4}>
                      {answer}
                    </Text>
                  </View>
                </Row>
              )
            })}
          </View>
        </View>
      </ScrollView >

      <Row style={{
        paddingHorizontal: ThemeDimensions.positive2,
        paddingVertical: ThemeDimensions.positive1,
        backgroundColor: ThemeColors.white,
        borderTopColor: ThemeColors.grey,
        borderTopWidth: 1,
      }}>
        <Column style={{ alignItems: 'flex-start' }}>
          <Button
            onPress={() => navigation.navigate(RootStackName.Home)}
            style={{
              paddingHorizontal: ThemeDimensions.positive2,
              paddingVertical: 2,
            }}
            background={ThemeColors.white}
            backgroundHover={ThemeColors.grey}
          >
            <Row>
              <FontAwesome5 name="chevron-left" color={ThemeColors.third} size={ThemeDimensions.positive2} />
              <Text style={{ ...ThemeStyles.c4, paddingTop: 2 }}>
                { } Back to home
              </Text>
            </Row>
          </Button>
        </Column>

        <Column style={{ alignItems: 'flex-end' }}>
          {(nextMiniTestId !== '') && <Button
            onPress={() => navigation.navigate(RootStackName.Exercises, { miniTestId: nextMiniTestId })}
            style={{
              paddingHorizontal: ThemeDimensions.positive2,
              paddingVertical: 2,
            }}
          >
            <Row>
              <Text style={{ ...ThemeStyles.c4, paddingTop: 2, color: ThemeColors.white }}>
                Next exercise { }
              </Text>
              <FontAwesome5 name="chevron-right" color={ThemeColors.white} size={ThemeDimensions.positive2} />
            </Row>
          </Button>
          }
        </Column>
      </Row>
    </View >
  );
};


export { Result };

const styles = StyleSheet.create({
  cell: {
    width: ThemeDimensions.percentage50,
    borderColor: ThemeColors.grey,
    borderLeftWidth: 4,
    padding: ThemeDimensions.positive1,
    marginVertical: ThemeDimensions.positive1,
  },
  cellTextHighlight: {
    fontFamily: ThemeFonts.semiBold,
    color: ThemeColors.primary,
    fontSize: ThemeDimensions.fontSize.xl,
  },
  icon: {
    width: ThemeDimensions.positive15,
    height: ThemeDimensions.positive15,
    marginVertical: ThemeDimensions.positive2,
  }
});
