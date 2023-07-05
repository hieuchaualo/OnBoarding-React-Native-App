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
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import {useForm, Controller} from 'react-hook-form';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";
const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPassword">;

const ForgotPasswordScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
return (
    <SafeAreaView>
      <View >
        <ImageBackground
          style={{
            height: height / 2.5,
          }}
          resizeMode="contain"
          source={require("../assets/images/forgot.jpg")}
        />
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 4,
            padding: Spacing * 2,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              textAlign: "center",
            }}
          >
            Forgot Password
          </Text>

          <Text
            style={{
              fontSize: FontSize.small,
              color: Colors.text,
              fontFamily: Font["poppins-regular"],
              textAlign: "center",
              marginTop: Spacing * 2,
            }}
          >
            Enter your email 
          </Text>
        </View>
        <View
          style={{
            padding: Spacing * 2,
          }}
        >
          <AppTextInput placeholder="Email" />
          <TouchableOpacity
            style={styles.button}
          >
            <Text
              style={{
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>  
      </View>
    </SafeAreaView>
);
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    button: {
        padding: Spacing * 1.5,
        backgroundColor: Colors.primary,
        marginVertical: Spacing * 1,
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
  