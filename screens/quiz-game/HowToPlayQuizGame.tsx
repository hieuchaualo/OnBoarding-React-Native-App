import {
  View,
  ScrollView,
  Text,
  Image,
} from "react-native";
import React from "react";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from "../../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { Button, Column } from "../../components";


type HowToPlayQuizGameProps = NativeStackScreenProps<RootStackParamList, RootStackName.HowToPlayQuizGame>;

export const HowToPlayQuizGame: React.FC<HowToPlayQuizGameProps> = ({ navigation: { navigate }, }) => {
  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light, padding: ThemeDimensions.positive3 }}>

      <ScrollView>
        <Column style={{
          marginVertical: ThemeDimensions.positive2,
          padding: ThemeDimensions.positive3,
          backgroundColor: ThemeColors.yellowLight,
          borderRadius: ThemeDimensions.positive3,
        }}>
          <Image
            style={{ height: ThemeDimensions.positive10 }}
            resizeMode="contain"
            source={require("../../assets/images/start-button.png")}
          />
          <Text style={ThemeStyles.h1}>
            How To Play
          </Text>
          <Text style={{ ...ThemeStyles.c4, textAlign: 'justify' }}>
            This exercise accustoms to the maximum concentration in a limited period of time. It is necessary to remember and reproduce the last word shown on the screen.
          </Text>

          <Text style={{ ...ThemeStyles.c4, fontFamily: ThemeFonts.semiBold, paddingVertical: ThemeDimensions.positive1 }}>
            Recommendations
          </Text>
          <Text style={{ ...ThemeStyles.c4, textAlign: 'justify' }}>
            Before performing the exercise, it is recommended that you perform the eye gymnastics: head is still, looking down, up, left, right, focusing on the point in the distance, then on the point near. It is necessary to get rid of extraneous thoughts.
          </Text>
          <Image
            style={{
              marginTop: ThemeDimensions.positive3,
              height: ThemeDimensions.positive10,
            }}
            resizeMode="contain"
            source={require("../../assets/images/bear.png")}
          />
        </Column>
        <Column>
          <Button onPress={() => navigate(RootStackName.PlayQuizGame)} title="Play game" style={{
            marginVertical: ThemeDimensions.positive2,
            padding: ThemeDimensions.positive2,
            width: ThemeDimensions.percentage75,
          }} />
        </Column>
      </ScrollView >
    </View >
  );
};