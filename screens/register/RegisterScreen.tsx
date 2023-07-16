import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import AppTextInput from "../../components/AppTextInput";
import { regexEmail } from "../../constants/regexPattern";
import { createAccount } from "../../api";
import { setItemAsync } from "expo-secure-store";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailNotValidated, setisEmailNotValidated] = useState(false);
  const [isEmailExists, setisEmailExists] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordNotValidated, setisPasswordNotValidated] = useState(false);
  const [isRePasswordValid, setisRePasswordNotValidated] = useState(false);

  const checkEmailInvalid = () => {
    setisEmailNotValidated(!regexEmail.test(email));
    return !regexEmail.test(email);
  };

  const checkPasswordlInvalid = () => {
    setisPasswordNotValidated(!(password.length >= 8));
    return !(password.length >= 8);
  };

  const checkRePasswordlInvalid = () => {
    setisRePasswordNotValidated(password !== rePassword);
    return password !== rePassword;
  };

  const register = async () => {
    try {
      const response: any = await createAccount({
        name: userName,
        email,
        password,
      });
      console.log(response);
      if (response?.message?.includes('E11000')) {
        setisEmailExists(true);
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
    <SafeAreaView>
      <ScrollView>
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
                fontFamily: Font["poppins-bold"],
                marginVertical: Spacing * 3,
              }}
            >
              Create account
            </Text>
            <Text
              style={{
                fontFamily: Font["poppins-regular"],
                fontSize: FontSize.small,
                maxWidth: "80%",
                textAlign: "center",
              }}
            >
              Create an account so you can explore all the existing jobs
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          >
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
              <Text
                style={{
                  fontFamily: Font["poppins-regular"],
                  fontSize: FontSize.small,
                  color: "#F00",
                  alignSelf: "flex-start",
                }}
              >
                Your Email is invalid. Please enter again.
              </Text>
            )}
            {isEmailExists && (
              <Text
                style={{
                  fontFamily: Font["poppins-regular"],
                  fontSize: FontSize.small,
                  color: "#F00",
                  alignSelf: "flex-start",
                }}
              >
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
              <Text
                style={{
                  fontFamily: Font["poppins-regular"],
                  fontSize: FontSize.small,
                  color: "#F00",
                  alignSelf: "flex-start",
                }}
              >
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
              <Text
                style={{
                  fontFamily: Font["poppins-regular"],
                  fontSize: FontSize.small,
                  color: "#F00",
                  alignSelf: "flex-start",
                }}
              >
                Your dhfdhfh is invalid. Please enter again.
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={async () => {
              const emailInvalid = checkEmailInvalid();
              const passwordInvalid = checkPasswordlInvalid();
              const rePasswordInvalid = checkRePasswordlInvalid();
              if (emailInvalid || passwordInvalid || rePasswordInvalid) {
                console.log(emailInvalid, passwordInvalid, rePasswordInvalid);
              } else register();
            }}
            style={{
              padding: Spacing * 2,
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
                fontFamily: Font["poppins-bold"],
                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
          <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 6,
            flexDirection: "row",
          }}
        >
          <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Already have an account
            </Text>
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Login
            </Text>

        </View>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              padding: Spacing,
            }}
          >

            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Already have an account
            </Text>
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          >
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                color: Colors.primary,
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
