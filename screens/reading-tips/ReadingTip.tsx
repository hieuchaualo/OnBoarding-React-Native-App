import React, { FC, useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { Column, LoadingView, Row } from '../../components';
import { getReadingTipsList } from '../../api';
import { AxiosResponse } from 'axios';
import { IReadingTip } from '../../interfaces';
import { toImgUrl } from '../../utils';

const paginationDefault = {
  limit: 12,
  currentPage: 1,
  totalPages: 1
}

type ReadingTipProps = NativeStackScreenProps<RootStackParamList, RootStackName.ReadingTip>;

export const ReadingTip: FC<ReadingTipProps> = ({ navigation }) => {
  const { navigate } = navigation

  const [isShowLoading, setIsShowLoading] = React.useState(false);
  const [isShowLoadMore, setIsShowLoadMore] = React.useState(false);
  const [readingTipsList, setReadingTipsList] = React.useState<IReadingTip[]>([]);

  const readingTipsPagination = useRef(paginationDefault)

  const fetchNextMiniTestsList = async () => {
    setIsShowLoadMore(true)
    try {
      const nextPage = readingTipsPagination.current.currentPage + 1
      if (nextPage > readingTipsPagination.current.totalPages) return setIsShowLoadMore(false);
      const response: AxiosResponse<any, any> = await getReadingTipsList(nextPage);
      if (response?.status === 200) {
        const responseData = response.data.data
        readingTipsPagination.current = responseData
        setReadingTipsList([...readingTipsList, ...responseData.data]);
      }
      setIsShowLoadMore(false)
    } catch (error) {
      console.error(error);
      setIsShowLoadMore(false)
    }
  }

  const fetchReadingTipsList = async () => {
    setIsShowLoading(true)
    try {
      const response: AxiosResponse<any, any> = await getReadingTipsList();
      if (response?.status === 200) {
        const responseData = response.data.data.data
        readingTipsPagination.current = paginationDefault
        setReadingTipsList(responseData);
        setIsShowLoading(false)
      } else setIsShowLoading(false)
    } catch (error) {
      console.error(error);
      setIsShowLoading(false)
    }
  }


  useEffect(() => {
    fetchReadingTipsList()
    return () => setReadingTipsList([])
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <View style={{ paddingTop: ThemeDimensions.positive1 }}>
        <Text style={ThemeStyles.h1}>
          Reading tips
        </Text>
      </View>
      <FlatList
        refreshing={isShowLoading}
        onRefresh={() => fetchReadingTipsList()}
        onEndReached={fetchNextMiniTestsList}
        onEndReachedThreshold={0.7}
        ListFooterComponent={() => isShowLoadMore
          ? <Row style={{ padding: ThemeDimensions.positive2 }}><LoadingView /></Row>
          : <View style={{ padding: ThemeDimensions.positive1 }} />
        }
        data={readingTipsList}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <View key={item._id} style={{
          backgroundColor: ThemeColors.white,
          borderRadius: ThemeDimensions.positive1,
          margin: ThemeDimensions.positive1,
        }}>
          <TouchableOpacity onPress={() => navigate(
            RootStackName.ReadingTipDetail, { readingTipId: item._id }
          )}>
            <Row>
              <View style={{ padding: ThemeDimensions.positive1 }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: toImgUrl(item.thumbnail) }}
                  // onError={(event) => console.error(event.nativeEvent.error)}
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
                  {(typeof item.creator === 'object') && item.creator.name}
                </Text>

              </Column>
            </Row>
          </TouchableOpacity>
        </View>}
      />
    </View>
  );
}