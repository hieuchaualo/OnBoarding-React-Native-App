import React, { FC, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../types';
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts, ThemeStyles } from '../../constants';
import { Column, LoadingView, Row } from '../../components';
import { getReadingTipsList } from '../../api';
import { AxiosResponse } from 'axios';
import { IReadingTip } from '../../interfaces';
import { toImgUrl } from '../../utils';

type ReadingTipProps = NativeStackScreenProps<RootStackParamList, RootStackName.ReadingTip>;

export const ReadingTip: FC<ReadingTipProps> = ({ navigation }) => {
  const { navigate } = navigation

  const [isShowLoading, setIsShowLoading] = React.useState(false);
  const [readingTipsList, setReadingTipsList] = React.useState<IReadingTip[]>([]);

  useEffect(() => {
    const fetchReadingTipsList = async () => {
      setIsShowLoading(true)
      try {
        const response: AxiosResponse<any, any> = await getReadingTipsList();
        if (response?.status === 200) {
          const responseData = response.data.data.data
          setReadingTipsList(responseData);
          setIsShowLoading(false)
        } else setIsShowLoading(false)
      } catch (error) {
        console.error(error);
        setIsShowLoading(false)
      }
    }

    fetchReadingTipsList()
    return () => setReadingTipsList([])
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <ScrollView>
        <View style={{ padding: ThemeDimensions.positive1 }}>
          <View style={{ paddingTop: ThemeDimensions.positive1 }}>
            <Text style={ThemeStyles.h1}>
              Reading tips
            </Text>
          </View>
          {isShowLoading
            ? <View style={{ marginTop: ThemeDimensions.windowHeight30 }}>
              <LoadingView />
            </View>
            : (readingTipsList?.map((readingTip) =>
              <View key={readingTip._id} style={{
                backgroundColor: ThemeColors.white,
                borderRadius: ThemeDimensions.positive1,
                margin: ThemeDimensions.positive1,
              }}>
                <TouchableOpacity onPress={() => navigate(
                  RootStackName.ReadingTipDetail, { readingTipId: readingTip._id }
                )}>
                  <Row>
                    <Image
                      resizeMode="cover"
                      source={{ uri: toImgUrl(readingTip.thumbnail) }}
                      // onError={(event) => console.error(event.nativeEvent.error)}
                      style={{
                        borderTopLeftRadius: ThemeDimensions.positive1,
                        borderBottomLeftRadius: ThemeDimensions.positive1,
                        height: ThemeDimensions.positive16,
                        width: ThemeDimensions.positive16,
                      }}
                    />

                    <Column style={{ alignItems: 'flex-start', padding: ThemeDimensions.positive2 }}>
                      <Text numberOfLines={2} style={{
                        ...ThemeStyles.c4,
                        fontFamily: ThemeFonts.semiBold,
                        paddingBottom: ThemeDimensions.positive1,
                      }}>
                        {readingTip.title}
                      </Text>

                      <Text style={{ ...ThemeStyles.c5, color: ThemeColors.secondary }}>
                        {(typeof readingTip.creator === 'object') && readingTip.creator.name}
                      </Text>

                    </Column>
                  </Row>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </View>
  );
}