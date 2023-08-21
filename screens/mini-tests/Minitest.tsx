import React, { useEffect, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IMiniTest, MiniTestTypes } from '../../interfaces';
import { AxiosResponse } from 'axios';
import { getMiniTestsList } from '../../api';
import { fromSecondToDateTime, toImgUrl } from '../../utils';
import { Column, LoadingView, Row } from '../../components';
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { RootStackParamList } from '../../types';

const tabs = ['True - False - Not given', 'Sentence Completion', 'Multiple Choice'];

const paginationDefault = {
  limit: 12,
  currentPage: 1,
  totalPages: 1
}

const getOptionNameByCurrentTab = (currentTab: string): MiniTestTypes => {
  let option = MiniTestTypes.TrueFalse
  if (currentTab === tabs[1]) option = MiniTestTypes.FillTheBlank
  if (currentTab === tabs[2]) option = MiniTestTypes.MultipleChoice

  return option
}

type Props = NativeStackScreenProps<RootStackParamList, RootStackName.MiniTest>;

const MinitestScreen: React.FC<Props> = ({ navigation }) => {
  const { navigate } = navigation;
  const [currentTab, setCurrentTab] = React.useState(tabs[0]);
  const [isShowLoading, setIsShowLoading] = React.useState(false);
  const [isShowLoadMore, setIsShowLoadMore] = React.useState(false);
  const [miniTestsList, setMiniTestsList] = React.useState<IMiniTest[]>([]);

  const miniTestsListPagination = useRef(paginationDefault)

  const fetchMiniTestsList = async (option: MiniTestTypes) => {
    setIsShowLoading(true)
    try {
      const response: AxiosResponse<any, any> = await getMiniTestsList(option);
      if (response?.status === 200) {
        const responseData = response.data.data
        miniTestsListPagination.current = responseData
        setMiniTestsList(responseData.data);
      }
      setIsShowLoading(false)
    } catch (error) {
      console.error(error);
      setIsShowLoading(false)
    }
  }

  const fetchNextMiniTestsList = async () => {
    setIsShowLoadMore(true)
    try {
      const option = getOptionNameByCurrentTab(currentTab)
      const nextPage = miniTestsListPagination.current.currentPage + 1
      if (nextPage > miniTestsListPagination.current.totalPages) return setIsShowLoadMore(false);
      const response: AxiosResponse<any, any> = await getMiniTestsList(option, nextPage);
      if (response?.status === 200) {
        const responseData = response.data.data
        miniTestsListPagination.current = responseData
        setMiniTestsList([...miniTestsList, ...responseData.data]);
      }
      setIsShowLoadMore(false)
    } catch (error) {
      console.error(error);
      setIsShowLoadMore(false)
    }
  }

  useEffect(() => {
    fetchMiniTestsList(getOptionNameByCurrentTab(currentTab))
    return () => setMiniTestsList([])
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

      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          refreshing={isShowLoading}
          onRefresh={() => fetchMiniTestsList(getOptionNameByCurrentTab(currentTab))}
          onEndReached={fetchNextMiniTestsList}
          onEndReachedThreshold={0.7}
          ListFooterComponent={() => isShowLoadMore
            ? <Row style={{ padding: ThemeDimensions.positive2 }}><LoadingView /></Row>
            : <View style={{ padding: ThemeDimensions.positive1 }} />
          }
          data={miniTestsList}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <View
            key={item._id}
            style={{
              backgroundColor: ThemeColors.white,
              borderRadius: ThemeDimensions.positive1,
              margin: ThemeDimensions.positive2,
              marginBottom: 0,
            }}>
            <TouchableOpacity
              onPress={() => navigate(RootStackName.Exercises, { miniTestId: item._id })}
            // background={TouchableNativeFeedback.Ripple(ThemeColors.grey, true)}
            >
              <Row>
                <View style={{ padding: ThemeDimensions.positive1 }}>
                  <Image
                    resizeMode="cover"
                    source={{ uri: toImgUrl(item.thumbnail) }}
                    style={{
                      borderRadius: ThemeDimensions.positive1,
                      height: ThemeDimensions.positive16,
                      width: ThemeDimensions.positive16,
                    }}
                  />
                </View>

                <Column style={{ alignItems: 'flex-start', padding: ThemeDimensions.positive2 }}>
                  <Text numberOfLines={2} style={{
                    ...ThemeStyles.c4,
                    fontFamily: ThemeFonts.semiBold,
                    paddingBottom: ThemeDimensions.positive1,
                  }}>
                    {item.title}
                  </Text>

                  <Text style={{ ...ThemeStyles.c5, color: ThemeColors.secondary }}>
                    Time limit: {item.timeLimit ? fromSecondToDateTime(item.timeLimit) : 'None'}
                  </Text>

                </Column>
              </Row>
            </TouchableOpacity>
          </View>}
        />
      </SafeAreaView>
    </View >

  );
}

export { MinitestScreen };