import React, { FC, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from "../../constants"
import { RootStackParamList } from "../../types"
import { Button, Column, Row } from "../../components"
import { getItemAsync } from "expo-secure-store";


type QuizGameProps = NativeStackScreenProps<RootStackParamList, RootStackName.QuizGame>;

export const QuizGame: FC<QuizGameProps> = ({ navigation: { navigate }, }) => {
  const [lastScore, setLastScore] = useState<{ max: number; average: number; }>()

  const getLastScore = async () => {
    const lastScoreString = await getItemAsync("quiz_game_score")
    if (lastScoreString) setLastScore(JSON.parse(lastScoreString))
  }
  useEffect(() => {
    getLastScore()
    return () => setLastScore(undefined)
  }, [])
  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light, padding: ThemeDimensions.positive3 }}>
      <ScrollView>
        <Image
          style={{
            height: ThemeDimensions.positive20,
            width: ThemeDimensions.percentage100,
            marginVertical: ThemeDimensions.positive5,
          }}
          resizeMode="contain"
          source={require("../../assets/images/bear.png")}
        />
        <Text style={ThemeStyles.h2}>
          RUNNING WORDS
        </Text>

        <View style={{
          marginVertical: ThemeDimensions.positive2,
          backgroundColor: ThemeColors.yellowLight,
          borderRadius: ThemeDimensions.positive2,
          padding: ThemeDimensions.positive2,
        }}>
          <Row style={{ justifyContent: 'flex-start' }}>
            <Image
              source={require("../../assets/images/star-3.png")}
              style={{
                width: ThemeDimensions.positive4,
                height: ThemeDimensions.positive4,
              }}
            />
            <Text
              style={{
                fontFamily: ThemeFonts.semiBold,
                fontSize: ThemeDimensions.fontSize.xl,
                color: ThemeColors.dark,
                paddingLeft: ThemeDimensions.positive1,
                marginVertical: ThemeDimensions.positive1,
              }}
            >
              New Best
            </Text>
          </Row>

          <Row style={{ justifyContent: 'flex-start' }}>
            <Text style={ThemeStyles.c4}>
              Max Speed: {lastScore?.max}
            </Text>
          </Row>

          <Row style={{ justifyContent: 'flex-start' }}>
            <Text style={ThemeStyles.c4}>
              Average Speed: {lastScore?.average}
            </Text>
          </Row>
        </View>

        <Column>
          <Button onPress={() => navigate(RootStackName.PlayQuizGame)} title="Play game" style={{
            marginVertical: ThemeDimensions.positive1,
            padding: ThemeDimensions.positive2,
            width: ThemeDimensions.percentage75,
          }} />

          <Button
            onPress={() => navigate(RootStackName.HowToPlayQuizGame)}
            background={ThemeColors.pinkLight}
            backgroundHover={ThemeColors.pinkDark}
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
              How to play
            </Text>
          </Button>
        </Column>
      </ScrollView>
    </View>
  );
};