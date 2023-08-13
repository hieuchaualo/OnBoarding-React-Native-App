import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppTextInput from "../../components/AppTextInput";
import { regexEmail } from "../../constants/regexPattern";
import { createAccount } from "../../api";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeStyles } from "../../constants";
import { RootStackParamList } from "../../types";
import { Button, Column, Row } from "../../components";

type Props = NativeStackScreenProps<RootStackParamList, RootStackName.Register>;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailNotValidated, setIsEmailNotValidated] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordNotValidated, setIsPasswordNotValidated] = useState(false);
  const [isRePasswordValid, setIsRePasswordNotValidated] = useState(false);

  const checkEmailInvalid = () => {
    setIsEmailNotValidated(!regexEmail.test(email));
    return !regexEmail.test(email);
  };

  const checkPasswordInvalid = () => {
    setIsPasswordNotValidated(password.length < 8);
    return password.length < 8;
  };

  const checkRePasswordInvalid = () => {
    setIsRePasswordNotValidated(password !== rePassword);
    return password !== rePassword;
  };

  const register = async () => {
    try {
      const response: any = await createAccount({
        name: userName,
        email,
        password,
      });
      if (response?.message?.includes('E11000')) {
        setIsEmailExists(true);
        return false;
      }
      // await setItemAsync("secure_token", response?.data?.token);
      // const account = JSON.stringify({
      //   username: response.data.account.name,
      //   email: response.data.account.email,
      //   id: response.data.account._id,
      // });
      // await setItemAsync("account", account);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={{ padding: ThemeDimensions.positive2, }}>
          <Column style={{ paddingVertical: ThemeDimensions.positive2 }}>
            <Text style={ThemeStyles.h1}>
              Create account
            </Text>
          </Column>

          <View style={{ marginVertical: ThemeDimensions.positive2 }}>
            <AppTextInput
              value={userName}
              onChangeText={setUserName}
              placeholder="Username"
            />

            <AppTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
            {isEmailNotValidated && (
              <Text style={{ ...ThemeStyles.c5, color: ThemeColors.danger, }}>
                Your Email is invalid. Please enter again.
              </Text>
            )}
            {isEmailExists && (
              <Text style={{ ...ThemeStyles.c5, color: ThemeColors.danger, }}>
                Your Email is exists. Please enter another email.
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

            <AppTextInput
              value={rePassword}
              onChangeText={setRePassword}
              placeholder="Confirm Password"
              secureTextEntry
            />
            {isRePasswordValid && (
              <Text style={{ ...ThemeStyles.c5, color: ThemeColors.danger, }}>
                Can't confirm password valid. Please enter again.
              </Text>
            )}
          </View>

          <Button
            onPress={async () => {
              const emailInvalid = checkEmailInvalid();
              const passwordInvalid = checkPasswordInvalid();
              const rePasswordInvalid = checkRePasswordInvalid();
              if (emailInvalid || passwordInvalid || rePasswordInvalid) {
                // console.log(emailInvalid, passwordInvalid, rePasswordInvalid);
              } else register();
            }}
            title="Register"
            style={{
              padding: ThemeDimensions.positive3,
            }}
          >
          </Button>

          <Column style={{ paddingTop: ThemeDimensions.positive6 }}>
            <TouchableOpacity onPress={() => navigate("Login")}>
              <Text style={ThemeStyles.b5}>
                Already have an account? { }
                <Text style={{ color: ThemeColors.primary }}>
                  Login here
                </Text>
              </Text>
            </TouchableOpacity>
          </Column>

          <Column style={{ paddingVertical: ThemeDimensions.positive4 }}>
            <Text style={{...ThemeStyles.b5, padding: ThemeDimensions.positive1 }}>
              Or continue with
            </Text>

            <Row>
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
    </View>
  );
};

export { RegisterScreen };
