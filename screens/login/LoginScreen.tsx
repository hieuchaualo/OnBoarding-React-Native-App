import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FC, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppTextInput from "../../components/input/AppTextInput";
import { getAccount, loginAccount } from "../../api";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { regexEmail } from "../../constants/regexPattern";
import { AxiosResponse } from "axios";
import { ThemeColors, ThemeDimensions, ThemeStyles } from "../../constants";
import { Button, Column, Row } from "../../components";
import { RootStackParamList } from "../../types";

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const { navigate } = navigation;
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
    <ScrollView>
      <View style={{ padding: ThemeDimensions.positive2 }}>
        <Column style={{ paddingVertical: ThemeDimensions.positive2 }}>
          <Text style={ThemeStyles.h1}>
            Login here
          </Text>
          <Text style={{ ...ThemeStyles.b3, textAlign: 'center', marginVertical: ThemeDimensions.positive3 }}>
            Welcome back you've {'\n'} been missed!
          </Text>
        </Column>

        <View>
          <AppTextInput
            value={email}
            onChangeText={value => setEmail(value.trim())}
            placeholder="Email"
          />
          {isEmailNotValidated && (
            <Text style={{ ...ThemeStyles.c5, color: ThemeColors.danger, }}>
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
            <Text style={{ ...ThemeStyles.c5, color: ThemeColors.danger, }}>
              Your Password is invalid. Please enter again.
            </Text>
          )}

          <Button
            title="Login"
            style={{ padding: ThemeDimensions.positive3, marginTop: ThemeDimensions.positive2 }}
            onPress={handleLoginPress}
          />
        </View>

        <Column style={{ marginTop: ThemeDimensions.positive6 }}>
          <TouchableOpacity
            onPress={() => navigate("Register")}
            style={{ padding: ThemeDimensions.positive2, }}
          >
            <Text style={ThemeStyles.b5}>
              Don't have an account? { }
              <Text style={{ color: ThemeColors.primary, }}>
                Create here
              </Text>
            </Text>
          </TouchableOpacity>
        </Column>

        <Column style={{ paddingVertical: ThemeDimensions.positive4 }}>
          <Text style={ThemeStyles.b5}>
            Or continue with
          </Text>

          <Row style={{ marginTop: ThemeDimensions.positive1 }}>
            <TouchableOpacity
              style={{
                padding: ThemeDimensions.positive1,
                backgroundColor: ThemeColors.grey,
                borderRadius: ThemeDimensions.positive1,
                marginHorizontal: ThemeDimensions.positive1,
              }}
            >
              <Ionicons
                name="logo-google"
                color={ThemeColors.dark}
                size={ThemeDimensions.positive4}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: ThemeDimensions.positive1,
                backgroundColor: ThemeColors.grey,
                borderRadius: ThemeDimensions.positive1,
                marginHorizontal: ThemeDimensions.positive1,
              }}
            >
              <Ionicons
                name="logo-facebook"
                color={ThemeColors.dark}
                size={ThemeDimensions.positive4}
              />
            </TouchableOpacity>
          </Row>
        </Column>
      </View>
    </ScrollView>
  );
};

export { LoginScreen };
