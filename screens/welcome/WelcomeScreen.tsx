import {
  Text,
  View,
  Image,
  ScrollView
} from "react-native";
import { FunctionComponent } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from "../../constants";
import { Button, Column, Row } from "../../components";

const welcomeHeadingImage = require("../../assets/images/login.png")

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: FunctionComponent<WelcomeScreenProps> = ({ navigation: { navigate } }) => {
  return (
    <ScrollView style={{ padding: ThemeDimensions.positive2 }}>
      <Image
        style={{
          height: ThemeDimensions.windowHeight40,
          width: ThemeDimensions.percentage100,
        }}
        resizeMode="contain"
        source={welcomeHeadingImage}
      />

      <View style={{ padding: ThemeDimensions.positive3 }}>
        <Text style={{ ...ThemeStyles.h1, padding: ThemeDimensions.positive2 }}>
          Increase Your Reading Skill
        </Text>
        <Text
          style={{
            ...ThemeStyles.h5,
            fontFamily: ThemeFonts.regular,
            color: ThemeColors.dark
          }}
        >
          Embark on an English journey of mastery with our immersive reading app!
        </Text>
      </View>

      <Row style={{ padding: ThemeDimensions.positive2 }}>
        <Column>
          <Button
            title="Login"
            style={{
              width: ThemeDimensions.percentage75,
              height: ThemeDimensions.positive10,
            }}
            onPress={() => navigate("Login")}
          />
        </Column>

        <Column>
          <Button
            title="Register"
            titleStyle={{ color: ThemeColors.dark, }}
            background={ThemeColors.white}
            backgroundHover={ThemeColors.light}
            onPress={() => navigate("Login")}
            style={{
              width: ThemeDimensions.percentage75,
              height: ThemeDimensions.positive10,
              shadowColor: ThemeColors.white,
            }}
          />
        </Column>
      </Row>
    </ScrollView>
  );
};

export { WelcomeScreen };
