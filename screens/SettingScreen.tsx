import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React from "react";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
  
  type Props = NativeStackScreenProps<RootStackParamList, "Setting">;
  
  const SettingScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
      <SafeAreaView>
        <View>
          <Text>Profile Screen</Text>
        </View>
      </SafeAreaView>
    );
  };
  
  export default SettingScreen;
  
  const styles = StyleSheet.create({});