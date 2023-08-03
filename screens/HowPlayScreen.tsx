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
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import { ThemeFonts } from "../constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FeatherIcon from "react-native-vector-icons/Feather";
import { RootStackParamList } from "../types";
const { height } = Dimensions.get("window");


type Props = NativeStackScreenProps<RootStackParamList, "HowPlay">;

const HowPlayScreen: React.FC<Props> = ({navigation: { navigate }, }) => {
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

        <ScrollView>
            <View style={styles.card}>
            <ImageBackground
            style={{
                height: height / 12,
            }}
            resizeMode="contain"
            source={require("../assets/images/start-button.png")}
            />
             <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: ThemeFonts.bold,
              textAlign: "center",
            }}
          >
            How To Play
          </Text>
            <Text style={styles.description}>
            This exercise accustoms to the maximum concentration in a limited period of time. 
            It is necessary to remember and reproduce the last word shown on the screen.
            </Text>
            <Text style={[styles.description, {fontFamily: ThemeFonts.semiBold} ]}>
            Recommendations
            </Text>
            <Text style={styles.description}>
            Before performing the exercise, it is recommended that you perform the eye gymnastics: head is still, looking down, up, left, right, focusing on the point in the distance, then on the point near.
            It is necessary to get rid of extraneous thoughts.
            </Text>
            <ImageBackground
                style={{
                    margin:24,
                    height: height / 12,
                }}
                resizeMode="contain"
                source={require("../assets/images/bear.png")}
                />
            </View>
          <TouchableOpacity
           onPress={() => navigate("Game2")}
          style={{
            padding: Spacing * 1.5,
            backgroundColor: Colors.primary,
            marginTop: Spacing * 3,
            marginHorizontal: Spacing * 3,
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
            Play Game
          </Text>
        </TouchableOpacity>
        </ScrollView>
        </View>
    </SafeAreaView>
    </View>
);
};

export default HowPlayScreen;

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
card:{
    backgroundColor: "#FBE6A5",
    borderRadius: 16,
    padding:16,
},
description: {
    fontFamily: ThemeFonts.regular,
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 24,
    fontSize: FontSize.small,
    marginBottom: 4,
  },
});
