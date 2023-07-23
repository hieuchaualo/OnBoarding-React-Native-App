import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { IMiniTest, MiniTestTypes } from '../../interfaces';
import { AxiosResponse } from 'axios';
import { getMiniTestsList } from '../../api';
import { toImgUrl } from '../../utils';
import { LoadingView } from '../../components';
const { height } = Dimensions.get("window");


const tabs = ['TRUE-FALSE-NOT GIVEN', 'Sentence Completion', 'Multiple Choice'];

type Props = NativeStackScreenProps<RootStackParamList, "MiniTest">;

const MinitestScreen: React.FC<Props> = ({ navigation }) => {
  const { navigate } = navigation;
  const [currentTab, setCurrentTab] = React.useState(tabs[0]);
  const [isShowLoading, setIsShowLoading] = React.useState(false);
  const [miniTestsList, setMiniTestsList] = React.useState<IMiniTest[]>([]);

  const fetchMiniTestsList = async (option: MiniTestTypes) => {
    setIsShowLoading(true)
    try {
      const response: AxiosResponse<any, any> = await getMiniTestsList(option);
      if (response?.status === 200) {
        const responseData = response.data.data.data
        setMiniTestsList(responseData);
        setIsShowLoading(false)
      } else setIsShowLoading(false)
    } catch (error) {
      console.error(error);
      setIsShowLoading(false)
    }
  }

  useEffect(() => {
    let option = MiniTestTypes.TrueFalse
    if (currentTab === tabs[1]) option = MiniTestTypes.FillTheBlank
    if (currentTab === tabs[2]) option = MiniTestTypes.MultipleChoice

    fetchMiniTestsList(option)

    return setMiniTestsList([])
  }, [currentTab])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f5f9' }}>
      {/* <View style={styles.container}> */}
      <View style={styles.header}>
        <ScrollView horizontal={true}>
          <View style={styles.container}>
            {tabs.map((tab) => {
              const isActive = tab === currentTab;
              return (
                <View style={{ flex: 1 }} key={tab}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCurrentTab(tab);
                    }}>
                    <View
                      style={[
                        styles.item,
                        isActive && { borderBottomColor: Colors.primary, },
                      ]}>
                      <Text style={[styles.text, isActive && { color: Colors.primary, }]}>
                        {tab}
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
        <ScrollView style={{ paddingHorizontal: 16, paddingBottom: 16 }} >
          {isShowLoading
            ? <View style={{ marginTop: height / 2.5 }}>
              <LoadingView />
            </View>
            : miniTestsList.map((miniTest) => {
              return (
                <TouchableOpacity
                  key={miniTest._id}
                  onPress={() => {
                    navigate('Exercises', { miniTestId: miniTest._id })
                    // handle onPress
                  }}>
                  <View style={styles.card}>
                    <Image
                      resizeMode="cover"
                      source={{ uri: toImgUrl(miniTest.thumbnail) }}
                      style={styles.cardImg}
                    />

                    <View style={styles.cardBody}>
                      <Text>
                        <Text style={styles.cardTitle}>{miniTest.title}</Text>{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          // handle onPress
                        }}>
                        <View style={styles.btn}>
                          <Text style={styles.btnText}>Take test</Text>
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
    fontSize: 14,
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
    fontSize: 14,
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