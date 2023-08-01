import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FC, useEffect, useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import AppTextInput from "../../components/AppTextInput";
import { getAccount, loginAccount } from "../../api";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { regexEmail } from "../../constants/regexPattern";
import { AxiosResponse } from "axios";
import { ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from "../../constants";
import { Button } from "../../components";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: FC<LoginScreenProps> = ({ navigation: { navigate } }) => {
  const [email, setEmail] = useState("");
  const [isEmailNotValidated, setIsEmailNotValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordNotValidated, setIsPasswordNotValidated] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = await getItemAsync("secure_token")
        if (token) {
          const response: AxiosResponse<any, any> = await getAccount();
          if (response?.status === 200) {
            const responseData = response.data.data
            const account = JSON.stringify({
              username: responseData.name,
              email: responseData.email,
              id: responseData._id,
            });
            await setItemAsync("account", account);
            navigate("Home")
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAccount()
  }, [])

  const checkEmailInvalid = () => {
    setIsEmailNotValidated(!regexEmail.test(email));
    return !regexEmail.test(email);
  };

  const checkPasswordInvalid = () => {
    setIsPasswordNotValidated(password.length < 8);
    return password.length < 8;
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

  const handleLoginPress = async () => {
    const emailInvalid = checkEmailInvalid();
    const passwordInvalid = checkPasswordInvalid();
    if (emailInvalid || passwordInvalid) { }
    else {
      const isLoginSuccess = await login();
      if (isLoginSuccess) navigate("Home");
    }
  }

  return (
    <ScrollView style={{ padding: ThemeDimensions.positive3 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={ThemeStyles.h1}>
          Login here
        </Text>
        <Text
          style={{
            ...ThemeStyles.h2,
            fontFamily: ThemeFonts.semiBold,
            color: ThemeColors.dark,
          }}
        >
          Welcome back you've been missed!
        </Text>
      </View>

      <AppTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      {isEmailNotValidated && (
        <Text style={{
          fontFamily: ThemeFonts.regular,
          fontSize: ThemeDimensions.fontSize.sm,
          color: ThemeColors.danger,
          alignSelf: "flex-start",
        }}>
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
        <Text style={{
          fontFamily: ThemeFonts.regular,
          fontSize: ThemeDimensions.fontSize.sm,
          color: ThemeColors.danger,
          alignSelf: "flex-start",
        }}>
          Your Password is invalid. Please enter again.
        </Text>
      )}

      <TouchableOpacity
      onPress={() => navigate("ForgotPassword")}
      style={{ marginTop: ThemeDimensions.positive2}}
      >
        <Text
          style={{
            fontFamily: ThemeFonts.semiBold,
            fontSize: ThemeDimensions.fontSize.sm,
            color: ThemeColors.primary,
            alignSelf: "flex-end",
          }}
        >
          Forgot your password ?
        </Text>
      </TouchableOpacity>

      <Button
        title="Login"
        style={{
          height: ThemeDimensions.positive10,
          marginVertical: ThemeDimensions.positive5
        }}
        onPress={handleLoginPress}
      />

      <Text
        style={{
          fontFamily: ThemeFonts.regular,
          color: ThemeColors.dark,
          textAlign: "center",
          fontSize: ThemeDimensions.fontSize.sm,
        }}
      >
        Don't have an account?
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
    </ScrollView>
  );
};

export { LoginScreen };
