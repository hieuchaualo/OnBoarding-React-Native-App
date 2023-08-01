import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import AppTextInput from "../../components/AppTextInput";
import { loginAccount } from "../../api";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { regexEmail } from "../../constants/regexPattern";
import { AxiosResponse } from "axios";
import { ThemeFonts } from "../../constants";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState("");
  const [isEmailNotValidated, setisEmailNotValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordNotValidated, setisPasswordNotValidated] = useState(false);

  const checkEmailInvalid = () => {
    setisEmailNotValidated(!regexEmail.test(email));
    return !regexEmail.test(email);
  };

  const checkPasswordlInvalid = () => {
    setisPasswordNotValidated(!(password.length >= 8));
    return !(password.length >= 8);
  };

  const login = async () => {
    try {
      const response: AxiosResponse<any, any> = await loginAccount({ email, password });
      if (response?.status === 201) {
        const responseData = response.data.data
        await setItemAsync("secure_token", responseData.token);
        const account = JSON.stringify({
          username: responseData.account.name,
          email: responseData.account.email,
          id: responseData.account._id,
        });
        await setItemAsync("account", account);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: ThemeFonts.bold,
              marginVertical: Spacing * 3,
            }}
          >
            Login here
          </Text>
          <Text
            style={{
              fontFamily: ThemeFonts.semiBold,
              fontSize: FontSize.large,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Welcome back you've been missed!
          </Text>
        </View>
        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <AppTextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          {isEmailNotValidated && (
            <Text
              style={{
                fontFamily: ThemeFonts.regular,
                fontSize: FontSize.small,
                color: "#F00",
                alignSelf: "flex-start",
              }}
            >
              Your Email is invalid. Please enter again.
            </Text>
          )}
          <AppTextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          {isPasswordNotValidated && (
            <Text
              style={{
                fontFamily: ThemeFonts.regular,
                fontSize: FontSize.small,
                color: "#F00",
                alignSelf: "flex-start",
              }}
            >
              Your Password is invalid. Please enter again.
            </Text>
          )}
        </View>

        <TouchableOpacity onPress={() => navigate("ForgotPassword")}>
          <Text
            style={{
              fontFamily: ThemeFonts.semiBold,
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot your password ?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            const emailInvalid = checkEmailInvalid();
            const passwordInvalid = checkPasswordlInvalid();
            if (emailInvalid || passwordInvalid) { }
            else {
              const isLoginSuccess = await login();
              if (isLoginSuccess) navigate("Home");
            }
          }}
          style={{
            padding: Spacing * 1.5,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: ThemeFonts.bold,
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: ThemeFonts.regular,
            color: Colors.text,
            textAlign: "center",
            fontSize: FontSize.small,
          }}
        >
          Don't have an account ?
        </Text>
        <TouchableOpacity
          onPress={() => navigate("Register")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              fontFamily: ThemeFonts.semiBold,
              color: Colors.primary,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <Text
            style={{
              fontFamily: ThemeFonts.semiBold,
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Or continue with
          </Text>

          <View
            style={{
              marginTop: Spacing,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-google"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: Spacing,
                backgroundColor: Colors.gray,
                borderRadius: Spacing / 2,
                marginHorizontal: Spacing,
              }}
            >
              <Ionicons
                name="logo-facebook"
                color={Colors.text}
                size={Spacing * 2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export { LoginScreen };
