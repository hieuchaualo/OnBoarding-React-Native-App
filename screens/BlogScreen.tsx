import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
type Props = NativeStackScreenProps<RootStackParamList, "Blog">;
const items = [
    {
      img: 'https://plus.unsplash.com/premium_photo-1661281316103-9aef5ad47c50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      title: 'New Study Finds Link Between Exercise and Brain Function',
      author: 'Samantha Lee',
      date: 'Mar 24, 2023',
    },
    {
      img: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      title: 'Tech Giant Announces New Line of Smart Home Devices',
      author: 'John Smith',
      date: 'Mar 23, 2023',
    },
    {
      img: 'https://images.unsplash.com/photo-1605367177286-f3d4789c47a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80',
      title: 'City Council Approves Plan to Expand Public Transportation',
      author: 'Emily Chen',
      date: 'Mar 22, 2023',
    },
    {
      img: 'https://images.unsplash.com/photo-1565615833231-e8c91a38a012?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      title: "Researchers Discover Potential Treatment for Alzheimer's",
      author: 'Samantha Lee',
      date: 'Mar 21, 2023',
    },
    {
      img: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80',
      title: 'New Startup Aims to Revolutionize Electric Car Market',
      author: 'John Smith',
      date: 'Mar 20, 2023',
    },
    {
      img: 'https://plus.unsplash.com/premium_photo-1663050986883-a5bdd99a7fa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2362&q=80',
      title: 'Local Election Results Are In: Democrats Retain Majority',
      author: 'Emily Chen',
      date: 'Mar 19, 2023',
    },
  ];
  
const BlogScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Reading Tips</Text>

        {items.map(({ img, title, author, date }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigate("DetailBlog")}
                // handle onPress
              >
              <View style={styles.card}>
                <Image
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.cardImg}
                />

                <View style={styles.cardBody}>

                  <Text style={styles.cardTitle}>{title}</Text>

                  <View style={styles.cardRow}>
                    <View style={styles.cardRowItem}>
                      <Text style={styles.cardRowItemText}>{author}</Text>
                    </View>

                    <Text style={styles.cardRowDivider}>·</Text>

                    <View style={styles.cardRowItem}>
                      <Text style={styles.cardRowItemText}>{date}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}


export default BlogScreen;

const styles = StyleSheet.create({
        container: {
          padding: 24,
        },
        title: {
          fontSize: 32,
          fontWeight: '700',
          color: '#1d1d1d',
          marginBottom: 12,
        },
        card: {
          flexDirection: 'row',
          alignItems: 'stretch',
          borderRadius: 12,
          marginBottom: 16,
          backgroundColor: '#fff',
        },
        cardImg: {
          width: 96,
          height: 96,
          borderRadius: 12,
        },
        cardBody: {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 0,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingHorizontal: 16,
        },
        cardTag: {
          fontWeight: '500',
          fontSize: 12,
          color: '#939393',
          marginBottom: 7,
          textTransform: 'capitalize',
        },
        cardTitle: {
          fontWeight: '600',
          fontSize: 16,
          lineHeight: 19,
          color: '#000',
          marginBottom: 8,
        },
        cardRow: {
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: -8,
          marginBottom: 'auto',
        },
        cardRowDivider: {
          fontSize: 17,
          fontWeight: 'bold',
          color: '#939393',
        },
        cardRowItem: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 6,
          borderRightWidth: 1,
          borderColor: 'transparent',
        },
        cardRowItemText: {
          fontWeight: '400',
          fontSize: 13,
          color: '#939393',
        },
        cardRowItemImg: {
          width: 22,
          height: 22,
          borderRadius: 9999,
          marginRight: 6,
        },
    });
