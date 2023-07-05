import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";
import { Header } from '@rneui/themed';
import { Avatar, Accessory } from 'react-native-elements';
import styled from 'styled-components'
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { color } from "react-native-elements/dist/helpers";
  
  type Props = NativeStackScreenProps<RootStackParamList, "Profile">;
  
  const ProfileScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
<SafeAreaView>
      <ScrollView
        style={{
          paddingHorizontal: Spacing * 2, 
        }}
      >
        {/* Header */}
      <View
        style={{
          paddingTop: Spacing * 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/avatar.jpg")}
            style={{ width: Spacing * 4, height: Spacing * 4, borderRadius:100 }}
          />
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: Spacing * 2,
              color: Colors.text,
              paddingLeft: Spacing,
              alignItems: 'center'
            }}
          >
            Hi, Hieuchau
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: Spacing / 2,
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={Spacing * 3}
              color={Colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          paddingVertical: Spacing * 2,
        }}
      >
        <Text
          style={{
            fontSize: Spacing * 3.5,
            fontFamily: Font["poppins-bold"],
            color: Colors.text,
          }}
        >
          Ready to practive
          <Text
            style={{
              fontSize: Spacing * 4,
              color: Colors.primary,
            }}
          >
            {" "}
            English{" "}
          </Text>
          today ?
        </Text>
      </View>

      {/* Button */}
      <View style={styles.buttoncontainer}>
      <TouchableOpacity
         onPress={() => navigate("Home")}
          style={{
            padding: Spacing * 2.5,
            backgroundColor: '#F6C9C6',
            marginVertical: Spacing * 1,
            borderRadius: Spacing,
            flexDirection: "row",  
            alignItems: 'center', 
          }}
        >
          <Image
            source={require("../assets/images/test-2.png")}
            style={{ width: Spacing * 4, height: Spacing * 4, borderRadius:100 }}
          />
          <Text style={styles.text}>
            Mini Test
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={() => navigate("Home")}
          style={{
            padding: Spacing * 2.5,
            backgroundColor: '#FBE6A5',
            marginVertical: Spacing * 1,
            borderRadius: Spacing,
            flexDirection: "row", 
            alignItems: 'center', 
          }}
        >
          <Image
            source={require("../assets/images/quiz.png")}
            style={{ width: Spacing * 4, height: Spacing * 4, borderRadius:100 }}
          />
          <Text style={styles.text}>
            Quiz Game
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={() => navigate("Home")}
          style={{
            padding: Spacing * 2.5,
            backgroundColor: '#C8F0CC',
            marginVertical: Spacing * 1,
            borderRadius: Spacing,
            flexDirection: "row", 
            alignItems: 'center', 
          }}
        >
          <Image
            source={require("../assets/images/read.png")}
            style={{ width: Spacing * 4, height: Spacing * 4, borderRadius:100 }}
          />
          <Text style={styles.text}>
            Speed Reading
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={() => navigate("Home")}
          style={{
            padding: Spacing * 2.5,
            backgroundColor: '#D5EFFD',
            marginVertical: Spacing * 1,
            borderRadius: Spacing,
            flexDirection: "row", 
            alignItems: 'center', 
          }}
        >
          <Image
            source={require("../assets/images/tips.png")}
            style={{ width: Spacing * 4, height: Spacing * 4, borderRadius:100 }}
          />
          <Text style={styles.text}>
            Reading Tips
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  buttoncontainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  button:{
    padding: Spacing * 2.5,
    backgroundColor: Colors.primary || '#FAE3DC',
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

  text:{
    fontFamily: Font["poppins-semiBold"],
    color: '#333333',
    fontSize: FontSize.large,
    paddingLeft: Spacing * 2,
  }
});