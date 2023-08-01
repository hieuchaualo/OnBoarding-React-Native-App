import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { getItemAsync } from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import FeatherIcon from "react-native-vector-icons/Feather";
import { ThemeFonts } from "../../constants";


type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen: React.FC<Props> = (props) => {
  const navigate = props.navigation.navigate;
  const [data, setData] = useState({ username: "unnamed" });

  useEffect(() => {
    const getAccountFromSucreStore = async () => {
      const account = await getItemAsync("account");
      setData(JSON.parse(account ?? ""));
    };
    getAccountFromSucreStore()
    return () => setData({ username: "unnamed" })
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f5f9' }}>
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
                source={require("../../assets/images/avatar.jpg")}
                style={{
                  width: Spacing * 4,
                  height: Spacing * 4,
                  borderRadius: 100,
                }}
              />
              <Text
                style={{
                  fontFamily: ThemeFonts.semiBold,
                  fontSize: Spacing * 2,
                  color: Colors.text,
                  paddingLeft: Spacing,
                  alignItems: "center",
                }}
              >
                Hi, {data?.username || "unnamed"}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => navigate("TestHistory")}
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
                fontFamily: ThemeFonts.bold,
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
              onPress={() => navigate("MiniTest")}
              style={{
                padding: Spacing * 2.5,
                backgroundColor: "#F6C9C6",
                marginVertical: Spacing * 1,
                borderRadius: Spacing,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/test-2.png")}
                style={{
                  width: Spacing * 4,
                  height: Spacing * 4,
                  borderRadius: 100,
                }}
              />
              <Text style={styles.text}>Mini Test</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // ha ha handle here
              }}
              style={{
                padding: Spacing * 2.5,
                backgroundColor: "#FBE6A5",
                marginVertical: Spacing * 1,
                borderRadius: Spacing,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/quiz.png")}
                style={{
                  width: Spacing * 4,
                  height: Spacing * 4,
                  borderRadius: 100,
                }}
              />
              <Text style={styles.text}>Quiz Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("QuizGame")}
              style={{
                padding: Spacing * 2.5,
                backgroundColor: "#C8F0CC",
                marginVertical: Spacing * 1,
                borderRadius: Spacing,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/read.png")}
                style={{
                  width: Spacing * 4,
                  height: Spacing * 4,
                  borderRadius: 100,
                }}
              />
              <Text style={styles.text}>Speed Reading</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate("Blog")}
              style={{
                padding: Spacing * 2.5,
                backgroundColor: "#D5EFFD",
                marginVertical: Spacing * 1,
                borderRadius: Spacing,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/tips.png")}
                style={{
                  width: Spacing * 4,
                  height: Spacing * 4,
                  borderRadius: 100,
                }}
              />
              <Text style={styles.text}>Reading Tips</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.overlay}>
        <View style={styles.footer}>
          <TouchableWithoutFeedback
            onPress={() => {
              // handle onPress
            }} style={{ flex: 1, paddingHorizontal: 8, alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <FeatherIcon name="home" size={24} color={'#E86F5D'} />
              <Text style={{ marginTop: 4, color: "#E86F5D", fontFamily: ThemeFonts.regular, fontSize: FontSize.small }} >Home</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigate("TestHistory");
            }} style={{ flex: 1, paddingHorizontal: 8, alignItems: 'center' }}>
            <View style={{ alignItems: 'center' }} >
              <FeatherIcon name="file-text" size={24} color={'#8A8A8E'} />
              <Text style={styles.tab} >Test History</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              // handle onPress
            }} style={{ flex: 1, paddingHorizontal: 8 }}>
            <View style={{ alignItems: 'center' }}>
              <FeatherIcon name="bell" size={24} color={'#8A8A8E'} />
              <Text style={styles.tab}>Notification</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigate("Nhap")
            }}
            style={{ flex: 1, paddingHorizontal: 8 }}>
            <View style={{ alignItems: 'center' }} >
              <FeatherIcon name="user" size={24} color={'#8A8A8E'} />
              <Text style={styles.tab} >Profile</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>



  );
};

export { HomeScreen };

const styles = StyleSheet.create({
  buttoncontainer: {
    display: "flex",
    justifyContent: "space-between",
  },

  button: {
    padding: Spacing * 2.5,
    backgroundColor: Colors.primary || "#FAE3DC",
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

  text: {
    fontFamily: ThemeFonts.semiBold,
    color: "#333333",
    fontSize: FontSize.large,
    paddingLeft: Spacing * 2,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  footer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tab: {
    marginTop: 4,
    color: "#8A8A8E",
    fontFamily: ThemeFonts.regular,
    fontSize: FontSize.small,

  }



});
