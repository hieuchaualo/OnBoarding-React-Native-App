import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { FC, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getItemAsync } from "expo-secure-store";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts } from "../../constants";
import { IAccount } from "../../interfaces";
import { toImgUrl } from "../../utils";
import { Button, Row, BottomNav } from "../../components";
import { RootStackParamList } from "../../types";
import { AxiosResponse } from "axios";
import { getAccount } from "../../api";


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const navigate = navigation.navigate;
  const [account, setAccount] = useState<IAccount>();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = await getItemAsync("secure_token")
        if (token) {
          const response: AxiosResponse<any, any> = await getAccount();
          if (response?.status === 200) {
            const responseData = response.data.data
            setAccount(responseData)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAccount()
  }, [])

  // prevent going back
  useEffect(() => {
    const backDisable = navigation.addListener('beforeRemove', event => {
      if (event.data.action.type === "NAVIGATE") {
        navigation.dispatch(event.data.action)
        navigation.removeListener('beforeRemove', backDisable)
      }
      event.preventDefault()
    })
    return () => navigation.removeListener('beforeRemove', backDisable);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <ScrollView>
        <View style={{ padding: ThemeDimensions.positive3 }}>

          {/* Header */}
          <Row style={{ justifyContent: "space-between" }}>
            <Row>
              <Image
                source={
                  account?.avatar
                    ? { uri: toImgUrl(account?.avatar) }
                    : require("../../assets/images/avatar.jpg")
                }
                style={{
                  width: ThemeDimensions.positive6,
                  height: ThemeDimensions.positive6,
                  borderRadius: ThemeDimensions.positive3,
                }}
              />
              <Text style={{
                fontFamily: ThemeFonts.semiBold,
                fontSize: ThemeDimensions.fontSize.lg,
                color: ThemeColors.second,
                paddingLeft: ThemeDimensions.positive2,
              }}>
                {account?.name ?? "unnamed"}
              </Text>
            </Row>
            <TouchableOpacity onPress={() => navigate("TestHistory")}>
              <Ionicons
                name="notifications-outline"
                size={ThemeDimensions.positive4}
                color={ThemeColors.third}
              />
            </TouchableOpacity>
          </Row>

          {/* Heading */}
          <Row style={{ paddingVertical: ThemeDimensions.positive3 }}>
            <Text style={{
              fontSize: ThemeDimensions.fontSize.xxxl,
              fontFamily: ThemeFonts.bold,
              color: ThemeColors.dark,
              width: ThemeDimensions.percentage100
            }}>
              Ready to practice
              <Text style={{
                fontSize: ThemeDimensions.fontSize.xxxl,
                color: ThemeColors.primary,
              }}>
                {" "} English {" "}
              </Text>
              today ?
            </Text>
          </Row>

          {/* Button */}
          <Button
            onPress={() => navigate(RootStackName.MiniTest)}
            background={ThemeColors.pinkDark}
            backgroundHover={ThemeColors.pinkLight}
            style={{
              marginBottom: ThemeDimensions.positive2,
              padding: ThemeDimensions.positive4,
              width: ThemeDimensions.percentage100,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: 'flex-start',
            }}
          >
            <Image
              source={require("../../assets/images/test-2.png")}
              style={{
                width: ThemeDimensions.positive8,
                height: ThemeDimensions.positive8,
                borderRadius: ThemeDimensions.positive4,
              }}
            />
            <Text style={{
              fontFamily: ThemeFonts.semiBold,
              fontSize: ThemeDimensions.fontSize.xxl,
              color: ThemeColors.dark,
              paddingLeft: ThemeDimensions.positive4,
            }}>
              Mini test
            </Text>
          </Button>

          <Button
            onPress={() => navigate(RootStackName.QuizGame)}
            background={ThemeColors.yellowDark}
            backgroundHover={ThemeColors.yellowLight}
            style={{
              marginBottom: ThemeDimensions.positive2,
              padding: ThemeDimensions.positive4,
              width: ThemeDimensions.percentage100,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: 'flex-start',
            }}
          >
            <Image
              source={require("../../assets/images/quiz.png")}
              style={{
                width: ThemeDimensions.positive8,
                height: ThemeDimensions.positive8,
                borderRadius: ThemeDimensions.positive4,
              }}
            />
            <Text style={{
              fontFamily: ThemeFonts.semiBold,
              fontSize: ThemeDimensions.fontSize.xxl,
              color: ThemeColors.dark,
              paddingLeft: ThemeDimensions.positive4,
            }}>
              Quiz game
            </Text>
          </Button>

          <Button
            onPress={() => navigate(RootStackName.Blog)}
            background={ThemeColors.blueDark}
            backgroundHover={ThemeColors.blueLight}
            style={{
              marginBottom: ThemeDimensions.positive2,
              padding: ThemeDimensions.positive4,
              width: ThemeDimensions.percentage100,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: 'flex-start',
            }}
          >
            <Image
              source={require("../../assets/images/tips.png")}
              style={{
                width: ThemeDimensions.positive8,
                height: ThemeDimensions.positive8,
                borderRadius: ThemeDimensions.positive4,
              }}
            />
            <Text style={{
              fontFamily: ThemeFonts.semiBold,
              fontSize: ThemeDimensions.fontSize.xxl,
              color: ThemeColors.dark,
              paddingLeft: ThemeDimensions.positive4,
            }}>
              Reading tips
            </Text>
          </Button>
        </View>
      </ScrollView>

      <View>
        <BottomNav navigate={navigate} activeKey={RootStackName.Home} />
      </View>
    </View>
  );
};

export { HomeScreen };