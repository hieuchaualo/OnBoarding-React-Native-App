import {
  View,
  ScrollView,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles, LibWords, LibWordsType
} from "../../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { Button, Row } from "../../components";

const TOTAL_TEXT_BOX = 8
const TOTAL_ANSWER_BOX = 6
const SPEED_STEP = 50
const textBoxes = Array(TOTAL_TEXT_BOX).fill('')

const getRandomArbitrary = (min: number, max: number) => Math.random() * (max - min) + min;

const getRandomWordsList = (min: number, max: number): string[] => {
  const wordsLibWordsKeys: string[] = Object.keys(LibWords)
  const randomLibWordsKey: string = wordsLibWordsKeys[Math.round(getRandomArbitrary(0, wordsLibWordsKeys.length - 1))]
  const randomLibWords = LibWords[randomLibWordsKey as keyof LibWordsType]
  const randomLibWordsMax = randomLibWords.length - 1

  const randomWordsList: string[] = []
  const randomWordListLength = Math.round(getRandomArbitrary(min, max))
  for (let index = 0; index < randomWordListLength; index++) {
    const randomWord = randomLibWords[Math.round(getRandomArbitrary(0, randomLibWordsMax))]
    randomWordsList.push(randomWord)
  }

  return randomWordsList;
}

const generateRandomAnswerList = (randomWordsList: string[]) => {
  const randomAnswerList: string[] = []
  const randomWordsListMax = randomWordsList.length - 1
  for (let index = 0; index < TOTAL_ANSWER_BOX; index++) {
    const randomWord = randomWordsList[Math.round(getRandomArbitrary(0, randomWordsListMax))]
    randomAnswerList.push(randomWord)
  }
  randomAnswerList[Math.round(getRandomArbitrary(0, randomAnswerList.length - 1))] = randomWordsList[randomWordsListMax]

  return randomAnswerList
}

type PlayQuizGameProps = NativeStackScreenProps<RootStackParamList, RootStackName.PlayQuizGame>;

export const PlayQuizGame: React.FC<PlayQuizGameProps> = ({ navigation: { navigate }, }) => {
  const [speed, setSpeed] = useState<number>(150)
  const [isShowRandomAnswer, setIsShowRandomAnswer] = useState<boolean>(false)
  const [randomWordsList, setRandomWordsList] = useState<string[]>([])
  const [randomAnswerList, setRandomAnswerList] = useState<string[]>([])

  const [randomWordsListRenderIndex, setRandomWordsListRenderIndex] = useState<number>(Number.MAX_SAFE_INTEGER)

  useEffect(() => {
    let interval: (string | number | NodeJS.Timeout | undefined) = 0
    if (randomWordsListRenderIndex < randomWordsList?.length) {
      interval = setInterval(() => setRandomWordsListRenderIndex(randomWordsListRenderIndex + 1), 60 * 1000 / speed);
    }
    if (randomWordsListRenderIndex === randomWordsList?.length) setIsShowRandomAnswer(true)
    return () => clearInterval(interval);
  }, [randomWordsListRenderIndex])

  useEffect(() => {
    const _randomWordsList = getRandomWordsList(10, 20)
    const _randomAnswerList = generateRandomAnswerList(_randomWordsList)

    setRandomWordsList(_randomWordsList)
    setRandomAnswerList(_randomAnswerList)

    setRandomWordsListRenderIndex(-1)
  }, [])

  const handleOnAnswer = (answer: string) => {
    if (answer === randomWordsList[randomWordsList.length - 1]) setSpeed(speed + SPEED_STEP)
    else if (speed > SPEED_STEP) setSpeed(speed - SPEED_STEP)

    setIsShowRandomAnswer(false)

    const _randomWordsList = getRandomWordsList(10, 20)
    const _randomAnswerList = generateRandomAnswerList(_randomWordsList)

    setRandomWordsList(_randomWordsList)
    setRandomAnswerList(_randomAnswerList)

    setRandomWordsListRenderIndex(-1)
  }

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <View style={{ marginVertical: ThemeDimensions.positive2 }}>
        <Text style={ThemeStyles.c4}> Speed: </Text>
        <Text style={ThemeStyles.h1}>
          {speed}
        </Text>
      </View>
      <ScrollView>
        <Row style={{
          flex: 1,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          padding: ThemeDimensions.positive1,
        }}>
          {textBoxes?.map((_word, textColumnsIndex) => (
            <View key={textColumnsIndex} style={{
              width: ThemeDimensions.percentage50,
              padding: ThemeDimensions.positive2,
            }}>
              <View style={{
                padding: ThemeDimensions.positive1,
                borderBottomWidth: 2,
                borderColor: ThemeColors.dark,
                borderStyle: "dashed",
              }}>
                <Text style={{ ...ThemeStyles.c3, fontFamily: ThemeFonts.semiBold }}>
                  {(randomWordsListRenderIndex % TOTAL_TEXT_BOX === textColumnsIndex) && (randomWordsListRenderIndex < randomWordsList.length)
                    ? randomWordsList[randomWordsListRenderIndex]
                    : ' '
                  }
                </Text>
              </View>
            </View>
          ))}
        </Row>

        <Row style={{
          flex: 1,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          padding: ThemeDimensions.positive1,
        }}>
          {isShowRandomAnswer && randomAnswerList?.map((randomAnswer, randomAnswerIndex) => (
            <View key={randomAnswerIndex} style={{
              width: ThemeDimensions.percentage50,
              padding: ThemeDimensions.positive2,
            }}>
              <Button title={randomAnswer} onPress={() => handleOnAnswer(randomAnswer)} style={{
                paddingVertical: ThemeDimensions.positive2,
                paddingHorizontal: ThemeDimensions.positive1,
              }} />
            </View>
          ))}

          {isShowRandomAnswer && (
            <View style={{
              width: ThemeDimensions.percentage100,
              padding: ThemeDimensions.positive2,
            }}>
              <Button
                title={`I don't know`}
                onPress={() => handleOnAnswer('')}
                background={ThemeColors.secondary}
                backgroundHover={ThemeColors.third}
                style={{
                  paddingVertical: ThemeDimensions.positive2,
                  paddingHorizontal: ThemeDimensions.positive1,
                }}
              />
            </View>
          )}
        </Row>
      </ScrollView>
    </View>
  );
};