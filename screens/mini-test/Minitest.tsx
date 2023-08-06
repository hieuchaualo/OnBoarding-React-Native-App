import React, { useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IMiniTest, MiniTestTypes } from '../../interfaces';
import { AxiosResponse } from 'axios';
import { getMiniTestsList } from '../../api';
import { fromSecondToDateTime, toImgUrl } from '../../utils';
import { Column, LoadingView, Row } from '../../components';
import { ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { RootStackParamList } from '../../types';

const tabs = ['True - False - Not given', 'Sentence Completion', 'Multiple Choice'];

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
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      {/* <View style={styles.container}> */}
      <Row>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Row>
            {tabs.map((tabName) => {
              const isActive = tabName === currentTab;
              return (
                <View style={{ flex: 1 }} key={tabName}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setCurrentTab(tabName);
                    }}>
                    <View
                      style={{
                        padding: ThemeDimensions.positive2,
                        paddingBottom: ThemeDimensions.positive1,
                        borderBottomWidth: 2,
                        borderBottomEndRadius: ThemeDimensions.positive1,
                        borderBottomColor: isActive ? ThemeColors.primary : ThemeColors.grey,
                      }}>
                      <Text style={{
                        ...ThemeStyles.c5,
                        fontFamily: ThemeFonts.semiBold,
                        color: isActive ? ThemeColors.primary : ThemeColors.secondary,
                      }}>
                        {tabName}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </Row>
        </ScrollView>
      </Row>

      <ScrollView>
        <View style={{ padding: ThemeDimensions.positive1 }}>
          {isShowLoading
            ? <View style={{ marginTop: ThemeDimensions.windowHeight30 }}>
              <LoadingView />
            </View>
            : (miniTestsList.map((miniTest) =>
              <View
                key={miniTest._id}
                style={{
                  backgroundColor: ThemeColors.white,
                  borderRadius: ThemeDimensions.positive1,
                  margin: ThemeDimensions.positive1,
                }}>
                <TouchableOpacity
                  onPress={() => navigate('Exercises', { miniTestId: miniTest._id })}
                // background={TouchableNativeFeedback.Ripple(ThemeColors.grey, true)}
                >
                  <Row>
                    <Image
                      resizeMode="cover"
                      source={{ uri: toImgUrl(miniTest.thumbnail) }}
                      style={{
                        borderTopLeftRadius: ThemeDimensions.positive1,
                        borderBottomLeftRadius: ThemeDimensions.positive1,
                        height: ThemeDimensions.positive15,
                        width: ThemeDimensions.positive15,
                      }}
                    />

                    <Column style={{ alignItems: 'flex-start', padding: ThemeDimensions.positive2 }}>
                      <Text numberOfLines={2} style={{
                        ...ThemeStyles.c4,
                        fontFamily: ThemeFonts.semiBold,
                        textAlign: 'left',
                        paddingBottom: ThemeDimensions.positive1,
                      }}>
                        {miniTest.title}
                      </Text>

                      {miniTest.timeLimit &&
                        <Text style={{ ...ThemeStyles.c5, color: ThemeColors.secondary }}>
                          Time limit: {fromSecondToDateTime(miniTest.timeLimit)}
                        </Text>
                      }
                    </Column>
                  </Row>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      </ScrollView>

    </View >

  );
}

export { MinitestScreen };