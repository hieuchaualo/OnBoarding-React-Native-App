import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
const items = [
  {
    img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    name: 'Pacific navigation and voyaging',
    airport: 'DXB',
    departure: '2022-10-10',
    arrival: '2023-04-01',
    price: 966,
  },
  {
    img: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80',
    name: 'Italy',
    airport: 'VCE',
    departure: '2022-10-10',
    arrival: '2023-04-01',
    price: 652,
  },
  {
    img: 'https://images.unsplash.com/photo-1623536167776-922ccb1ff749?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=544&q=80',
    name: 'Bosnia',
    airport: 'BNX',
    departure: '2022-10-10',
    arrival: '2023-04-01',
    price: 566,
  },
  {
    img: 'https://images.unsplash.com/photo-1554939437-ecc492c67b78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    name: 'Spain',
    airport: 'BCN',
    departure: '2022-10-10',
    arrival: '2023-04-01',
    price: 602,
  },
];


interface ReadingTests {
  content: string;
  title: string;
}

const tabs = [{ name: 'TRUE-FALSE-NOT GIVEN' }, { name: 'Sentence Completion' }, { name: 'Multiple Choice' }];
type Props = NativeStackScreenProps<RootStackParamList, "MiniTest">;
  
const MinitestScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [value, setValue] = React.useState(0);
  const [readingTestList, setReadingTestList] = React.useState<ReadingTests>({
    content: "",
    title: "",

  });
  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f5f9' }}>
    {/* <View style={styles.container}> */}
    <View style={styles.header}>
    <ScrollView  horizontal={true}> 
      <View style={styles.container}>
        {tabs.map((item, index) => {
          const isActive = index === value;
          return (
            <View style={{ flex: 1 }} key={item.name}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setValue(index);
                }}>
                <View
                  style={[
                    styles.item,
                    isActive && { borderBottomColor:Colors.primary,},
                  ]}>
                  <Text style={[styles.text, isActive && { color: Colors.primary, }]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </View>
    </ScrollView>
    </View>
    <View style={styles.placeholder}>
      <ScrollView style={{padding: 16,}}>
        {items.map(
          ({ img, name, airport}, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.card}>
                  <Image

                    resizeMode="cover"
                    source={{ uri: img }}
                    style={styles.cardImg}
                  />

                  <View style={styles.cardBody}>
                    <Text>
                      <Text style={styles.cardTitle}>{name}</Text>{' '}

                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}>
                      <View style={styles.btn}>
                        <Text style={styles.btnText}>Book now</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          },
        )}
      </ScrollView>
          </View>

  </SafeAreaView>
  
  );
}

export default MinitestScreen;


const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 12,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
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
    width: 180,
    height: 120,
    borderRadius: 12,
    margin: 8,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: FontSize.medium,
    maxWidth: "80%",
    marginRight: 8,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: Colors.primary,
  },
  btnText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});