import {
  Dimensions,
  ImageBackground,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from "react-native";
import { FunctionComponent } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { ThemeColors, ThemeFonts, ThemeStyles } from "../../constants";
const { height } = Dimensions.get("window");

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeScreen: FunctionComponent<WelcomeScreenProps> = ({ navigation: { navigate } }) => {
  return (
    <View>
      <ImageBackground
        style={{
          height: height / 3,
        }}
        resizeMode="contain"
        source={require("../../assets/images/login.png")}
      />
      <View
        style={{
          paddingHorizontal: Spacing * 4,
          paddingTop: Spacing * 4,
        }}
      >
        <Text
          style={{
            fontSize: FontSize.xxLarge,
            color: Colors.primary,
            fontFamily: ThemeFonts.bold,
            textAlign: "center",
          }}
        >
          Increase Your Reading Skill
        </Text>

        <Text
          style={{
            fontSize: FontSize.small,
            color: Colors.text,
            fontFamily: ThemeFonts.regular,
            textAlign: "center",
            marginTop: Spacing * 2,
          }}
        >
          Embark on an English journey of mastery with our immersive reading app!
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: Spacing * 2,
          paddingTop: Spacing * 6,
          flexDirection: "row",
        }}
      >
        <TouchableHighlight
          onPress={() => navigate("Login")}
          style={ThemeStyles.buttonPrimary}
          underlayColor={ThemeColors.primaryLight}
        >
          <Text style={ThemeStyles.buttonPrimaryText}>
            Login
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigate("Register")}
          style={ThemeStyles.buttonPrimary}
          underlayColor={ThemeColors.primaryLight}
        >
          <Text style={ThemeStyles.buttonPrimaryText}>
          Register
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export { WelcomeScreen };

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing * 1.5,
    paddingHorizontal: Spacing * 2,
    width: "48%",
    borderRadius: Spacing,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: Spacing,
    },
    shadowOpacity: 0.3,
    shadowRadius: Spacing,
  },
});
