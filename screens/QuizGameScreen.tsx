import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Text,
    ImageBackground,
    Image,
    Alert,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import FeatherIcon from "react-native-vector-icons/Feather";
import { getItemAsync } from "expo-secure-store";
import { getReadingTest, getReadingTests } from "../api/readingTestApi";
import { set } from "react-hook-form";
const { height } = Dimensions.get("window");


type Props = NativeStackScreenProps<RootStackParamList, "QuizGame">;

const QuizGameScreen: React.FC<Props> = ({navigation: { navigate }, }) => {
return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerAction}>
            <TouchableOpacity
                onPress={() => {
                // handle onPress
                }}
            >
                <FeatherIcon name="arrow-left" size={24} />
            </TouchableOpacity>
            </View>

            <Text style={styles.headerTitle}>Quiz Game</Text>

            <View style={[styles.headerAction, { alignItems: "flex-end" }]}>
            <TouchableOpacity
                onPress={() => {
                // handle onPress
                }}
            >
                <FeatherIcon name="more-vertical" size={24} />
            </TouchableOpacity>
            </View>
        </View>

        <ScrollView style={{ marginBottom: 64 }}>
        <ImageBackground
          style={{
            margin:24,
            height: height / 12,
          }}
          resizeMode="contain"
          source={require("../assets/images/bear.png")}
        />

        <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              textAlign: "center",
            }}
          >
            RUNNING WORDS
          </Text>

          <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/star-3.png")}
              style={{
                width: Spacing * 3,
                height: Spacing * 3,
                
              }}
            />
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                fontSize: Spacing * 2,
                color: Colors.text,
                paddingLeft: Spacing,
                alignItems: "center",
              }}
            >
              New Best
            </Text>
          </View>
            <Text style={styles.description}>
            Max Speed: 500
            </Text>
            <Text style={styles.description}>
            Average Speed: 500
            </Text>
            
            </View>

          <TouchableOpacity
          onPress={async () => {
          }}
          style={styles.btn}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Play Game
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("HowPlay")}
          style={{
            padding: Spacing * 1.5,
            backgroundColor: Colors.gray,
            marginTop: Spacing * 3,
            marginHorizontal: Spacing * 3,
            borderRadius: Spacing,

          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-bold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            How to Play
          </Text>
        </TouchableOpacity>


        </ScrollView>
        </View>
    </SafeAreaView>
    </View>
);
};

export default QuizGameScreen;

const styles = StyleSheet.create({
container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
},
overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
},
header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
},
headerTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#000",
},
headerAction: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
},
item: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "Colors.gray",
    borderBottomWidth: 2,
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: 12,
},
option:{
    padding: 8,
    marginVertical: Spacing * 0.5,
    borderRadius: Spacing,
    flexDirection: "row",
    alignItems: "center",
},
optionText: {
    fontFamily: Font[ "poppins-regular" ],
    letterSpacing: 0.5,
    lineHeight: 26,
    fontSize: FontSize.small,
},
text: {
    fontFamily: Font[ "poppins-semiBold"],
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 26,
    fontSize: FontSize.medium,
    paddingBottom:8,
},

info: {
    marginTop: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
},
infoTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "600",
    letterSpacing: 0.38,
    color: "#000000",
    marginBottom: 6,
},
description: {
    fontFamily: Font["poppins-regular"],
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 28,
    fontSize: FontSize.medium,
},
overlayContent: {
    flexDirection: "column",
    alignItems: "flex-start",
},
overlayContentTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 2,
},
timer: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "600",
    color: "#8e8e93",
    marginRight: 4,
},

btn: {
  padding: Spacing * 1.5,
  backgroundColor: Colors.primary,
  marginTop: Spacing * 6,
  marginHorizontal: Spacing * 3,
  borderRadius: Spacing,
  shadowColor: Colors.primary,
  shadowOffset: {
    width: 0,
    height: Spacing,
  },
  shadowOpacity: 0.3,
  shadowRadius: Spacing,
},
btnText: {
    color: "#fff",
    fontFamily: Font[ "poppins-semiBold"],
    fontSize: FontSize.medium,
},
card:{
  marginTop: 12,
  backgroundColor: "#FBE6A5",
  borderRadius: 16,
  padding:16,
},
});
