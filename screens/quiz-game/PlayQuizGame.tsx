import {
  View,
  ScrollView,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles, LibWords, LibWordsType
} from "../../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { Button, Column, Row } from "../../components";
import { LineChart } from "react-native-chart-kit";
import { getItemAsync, setItemAsync } from "expo-secure-store";

const TOTAL_TEXT_BOX = 8
const TOTAL_ANSWER_BOX = 6
const SPEED_STEP = 50
const ROUND_LIMIT = 5
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
  const [round, setRound] = useState<number>(1)
  const [speed, setSpeed] = useState<number>(150)
  const [isShowRandomAnswer, setIsShowRandomAnswer] = useState<boolean>(false)
  const [randomWordsList, setRandomWordsList] = useState<string[]>([])
  const [randomAnswerList, setRandomAnswerList] = useState<string[]>([])
  const [randomWordsListRenderIndex, setRandomWordsListRenderIndex] = useState<number>(Number.MAX_SAFE_INTEGER)

  const speedLog = useRef<{
    max: number;
    log: number[];
  }>({
    max: 150,
    log: [],
  })

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

  const storeScore = async () => {
    const lastScoreString = await getItemAsync("quiz_game_score")
    if (!lastScoreString) return;
    const lastScore = JSON.parse(lastScoreString)
    if (lastScore.max < speedLog.current.max) {
      const score: string = JSON.stringify({
        max: speedLog.current.max,
        average: speedLog.current.log.reduce((previousValue, currentValue) => previousValue + currentValue) / (ROUND_LIMIT - 1),
      })
      await setItemAsync("quiz_game_score", score);
    }
  }

  const handleOnAnswer = (answer: string) => {
    speedLog.current.log.push(speed)
    if (speed > speedLog.current.max) speedLog.current.max = speed

    if (answer === randomWordsList[randomWordsList.length - 1]) {
      setSpeed(speed + SPEED_STEP)
    } else if (speed > SPEED_STEP) setSpeed(speed - SPEED_STEP)

    const _randomWordsList = getRandomWordsList(10, 20)
    const _randomAnswerList = generateRandomAnswerList(_randomWordsList)

    setRandomWordsList(_randomWordsList)
    setRandomAnswerList(_randomAnswerList)

    setRandomWordsListRenderIndex(-1)
    setIsShowRandomAnswer(false)
    setRound(round + 1)
  }

  const reset = () => {
    speedLog.current = {
      max: 150,
      log: [],
    }
    setSpeed(150)

    const _randomWordsList = getRandomWordsList(10, 20)
    const _randomAnswerList = generateRandomAnswerList(_randomWordsList)

    setRandomWordsList(_randomWordsList)
    setRandomAnswerList(_randomAnswerList)

    setRandomWordsListRenderIndex(-1)
    setIsShowRandomAnswer(false)
    setRound(1)
  }

  if (round === ROUND_LIMIT) {
    storeScore()
    return (
      <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
        <ScrollView>
          <View style={{ margin: ThemeDimensions.positive2 }}>
            <Text style={ThemeStyles.h1}>
              Result Details
            </Text>
            <View style={{
              paddingVertical: ThemeDimensions.positive3,
              backgroundColor: ThemeColors.white,
              borderRadius: ThemeDimensions.positive1,
            }}>
              <LineChart
                fromZero
                segments={Math.floor(speedLog.current.max / 50)}
                data={{
                  labels: (Array.from({ length: speedLog.current.log.length }, (_, i) => (i + 1).toString())),
                  datasets: [{ data: speedLog.current.log }]
                }}
                width={ThemeDimensions.windowWidth - ThemeDimensions.positive4}
                height={ThemeDimensions.windowWidth75}
                yAxisSuffix="s"
                chartConfig={{
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: () => ThemeColors.warning,
                  labelColor: () => ThemeColors.primary,
                  backgroundGradientFrom: ThemeColors.white,
                  backgroundGradientTo: ThemeColors.white,
                  propsForDots: { r: ThemeDimensions.positive1 },
                }}
              />
              <Text style={{ ...ThemeStyles.c4, textAlign: 'center' }}>
                Max speed: {speedLog.current.max}
                {`\n`}
                Average speed: {speedLog.current.log.reduce((previousValue, currentValue) => previousValue + currentValue) / (ROUND_LIMIT - 1)}
              </Text>
            </View>
          </View>

          <Column>
            <Button onPress={() => reset()} title="Play again" style={{
              marginVertical: ThemeDimensions.positive1,
              padding: ThemeDimensions.positive2,
              width: ThemeDimensions.percentage75,
            }} />

            <Button
              onPress={() => navigate(RootStackName.Home)}
              background={ThemeColors.grey}
              backgroundHover={ThemeColors.pinkLight}
              style={{
                marginVertical: ThemeDimensions.positive2,
                padding: ThemeDimensions.positive2,
                width: ThemeDimensions.percentage75,
              }}
            >
              <Text style={{
                color: ThemeColors.dark,
                fontSize: ThemeDimensions.fontSize.lg,
                fontFamily: ThemeFonts.bold,
              }}>
                Main menu
              </Text>
            </Button>
          </Column>
        </ScrollView>
      </View>
    )
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
                borderColor: ThemeColors.grey,
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