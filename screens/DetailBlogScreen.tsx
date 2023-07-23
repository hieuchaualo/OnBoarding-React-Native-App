import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../navigation/types";
  import { getItemAsync } from "expo-secure-store";
  const {width, height} = Dimensions.get('window');
  
  type Props = NativeStackScreenProps<RootStackParamList, "DetailBlog">;
  
  const DetailBlogScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
      <SafeAreaView>
        <ScrollView>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require("../assets/images/login.png")} />
      </View>
      <View style={{paddingHorizontal: 5, paddingTop: 5}}>
        <Text style={[styles.baseText]}>The 10 types of IELTS reading questions</Text>
      </View>
      <View style={styles.bottomView}>
        <Text style={[styles.baseText, styles.subTitleText]}>{'  •  '}</Text>
        <Text style={[styles.baseText, styles.subTitleText]}>
          25 Jul 2023
        </Text>
      </View>
      <View style={styles.body}>
        <Text>Question Types

1) Multiple choice questions

These are types of questions that requires you to pick the correct answer from the given choices which are in capital letters of ABC and D. This type of questions tests your ability to understand detailed and specific information.

2) Information identification questions

These are types of questions that requires you to identify whether the given information is either true false or it’s not given. This type of question tests your ability to clearly understand what the text is talking about.

3) Information matching

These types of questions requires you to find a specific information and placing them where they fit to be. You need to have clearly understood the text and be able to understand every paragraph and what information it contains.

4) Head Matching

These questions requires you to pick a heading from the given headings and place each of them to the paragraphs. Mainly, if you have clearly understood the given text, you’ll be able to make a heading out of every paragraph.

5) Sentence completion

In this type of question, you will find an incomplete sentence. You are supposed to complete it with words taken from the text. You therefore need to quickly map the incomplete text to a particular location in the text for you to find the correct answer.

6) Summary completion

A summary part of the text will be given to you. You are required to complete it by picking words from the text with a given maximum number of words to complete it.

7) Features matching

These are types of questions that that requires you to find a specific information about given features and match it. For example you can be given different people who discovered different things at different times. You are now required to match who discovered what at what time. You therefore need to be very keen when matching.

8) Matching sentence endings

This is a very simple question. Part of a sentence is picked from a line in the text. What you need to do here is to just locate where it has been taken from and complete the sentence and there you have your have your correct answer!

9) Short answer questions

You have to be extra careful here! This is a question that expects you to answer the question from the given facts in the text. Moreover you need to check the number of words because you are limited. A maximum number of words is always given.

10) Matching information

You just need not to get this question wrong. All that is required of you here is to find some given information and place them where they fit.

Having highlighted the kind of questions you would expect in an IELTS reading task exam,try these few tips and expect exemplary performance!</Text>
        <View style={styles.bottomPadding} />
      </View>
    </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default DetailBlogScreen;
  const styles = StyleSheet.create({
    image: {
      width: width,
      height: 220,
    },
    body: {
      top: 5,
      left: 5,
      width: width - 10,
    },
    author: {
      width: width,
      marginTop: -10,
      marginHorizontal: width * 0.03,
      color: 'darkgray',
    },
    desc: {
      width: width,
      marginTop: 5,
      marginHorizontal: width * 0.03,
      color: 'gray',
      maxWidth: width * 0.8,
    },
    overflow: {
      overflow: 'hidden',
      borderRadius: 15,
    },
    view: {
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 15,
      elevation: 20,
      shadowColor: '#000',
      shadowOffset: {width: -1, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 3,
      backgroundColor: '#fff',
    },
    text: {
      width: width * 0.75,
      marginHorizontal: 5,
      marginVertical: 5,
      fontSize: 15,
      fontWeight: 'bold',
      maxWidth: width * 0.75,
      padding: 5,
    },
    bottomView: {
      backgroundColor: '#f5f5f7',
      flexDirection: 'row',
      maxWidth: width - 10,
      left: 5,
      top: 1,
    },
    baseText: {
      fontFamily: 'Verdana',
      fontSize: 15,
      fontWeight: 'bold',
    },
    bottomPadding: {
      height: 20,
    },
    gradientimage: {
      backgroundColor: 'transparent',
      width: width,
      height: 240,
    },
    subTitleText: {
      fontSize: 10,
      color: 'gray',
    },
  });