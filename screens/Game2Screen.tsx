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


type Props = NativeStackScreenProps<RootStackParamList, "Game2">;

const Game2Screen: React.FC<Props> = ({navigation: { navigate }, }) => {
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
            <Text style = {{textAlign: "center"}}> Speed</Text>
            <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              fontFamily: Font["poppins-bold"],
              textAlign: "center",
            }}
          >
            200
          </Text>
            <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.button}>
            <Text style={styles.text}>
             Tuan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.button}>
            <Text style={styles.text}>
              Luc
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.button}>
            <Text style={styles.text}>
              bi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.button}>
            <Text style={styles.text}>
              dien
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.button}>
            <Text style={styles.text}>
              roi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={styles.button}>
            <Text style={styles.text}>
              ne
            </Text>
          </TouchableOpacity>
          
        </View>
        </ScrollView>
        </View>
    </SafeAreaView>
    </View>
);
};

export default Game2Screen;

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
row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: Spacing * 2,
    paddingTop: Spacing * 2,
  },
  tab:{
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    width: "48%",
    minWidth: '48%',
    borderColor: '#6D7176',
    borderLeftWidth: 4,
    borderLeftStyle: 'solid',
  },
text:{
    fontFamily: Font["poppins-regular"],
    color: Colors.onPrimary,
    fontSize: FontSize.large,
    textAlign: "center",
},
  button: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    padding:16,
    marginBottom:8,
    width: "48%",
    minWidth: '48%',
    borderRadius: Spacing,
  },
});
