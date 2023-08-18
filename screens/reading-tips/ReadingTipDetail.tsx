import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeStyles } from "../../constants";
import { IReadingTip } from "../../interfaces";
import { toImgUrl } from "../../utils";
import { Button, Column, LoadingView, Row } from "../../components";
import { getNextReadingTipById, getReadingTipById, getReadingTipsList } from "../../api";
import { FontAwesome5 } from "@expo/vector-icons";
import { AxiosResponse } from "axios";

type ReadingTipDetailProps = NativeStackScreenProps<RootStackParamList, RootStackName.ReadingTipDetail>;

const ReadingTipDetail: FC<ReadingTipDetailProps> = ({ route, navigation }) => {
  const { readingTipId } = route.params;
  const [readingTip, setReadingTip] = useState<IReadingTip>()
  const [nextReadingTipId, setNextReadingTipId] = useState<string>('')
  const [previousReadingTipId, setPreviousReadingTipId] = useState<string>('')
  const [readingTipsList, setReadingTipsList] = React.useState<IReadingTip[]>([]);

  const getNextMiniTestId = async () => {
    try {
      const responsePrevious: AxiosResponse<any, any> = await getNextReadingTipById(readingTipId)
      if (responsePrevious.status === 200) {
        setPreviousReadingTipId(responsePrevious.data.data[0]?._id ?? '')
      }

      const responseNext: AxiosResponse<any, any> = await getNextReadingTipById(readingTipId)
      if (responseNext.status === 200) {
        setNextReadingTipId(responseNext.data.data[0]?._id ?? '')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchMiniTestById = async () => {
    const response = await getReadingTipById(readingTipId);
    if (response.status === 200) {
      const readingTipData: IReadingTip = response.data.data
      setReadingTip(readingTipData);
    }
  }
  const fetchReadingTipsList = async () => {
    try {
      const response: AxiosResponse<any, any> = await getReadingTipsList();
      if (response?.status === 200) {
        const responseData = response.data.data.data
        setReadingTipsList(responseData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchReadingTipsList()
    return () => setReadingTipsList([])
  }, []);

  useEffect(() => {
    fetchMiniTestById()
    getNextMiniTestId()
    return () => setReadingTip(undefined)
  }, [readingTipId]);

  if (!readingTip) return (
    <View style={{
      paddingTop: ThemeDimensions.windowHeight40,
      backgroundColor: ThemeColors.light,
      height: ThemeDimensions.windowHeight,
    }}>
      <LoadingView />
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColors.light }}>
      <ScrollView>
        <Image
          style={{
            aspectRatio: 16 / 9,
            width: ThemeDimensions.percentage100,
            resizeMode: 'cover',
          }}
          source={{ uri: toImgUrl(readingTip?.thumbnail) }}
        />
        <View style={{
          paddingHorizontal: ThemeDimensions.positive3,
          paddingTop: ThemeDimensions.positive3,
        }}>
          <Text style={{ ...ThemeStyles.h2, textAlign: 'left', color: ThemeColors.third }} selectable={true}>
            {readingTip?.title}
          </Text>

          <Text style={{
            ...ThemeStyles.c4,
            color: ThemeColors.secondary,
            marginBottom: ThemeDimensions.positive2,
          }}>
            {(typeof readingTip?.creator === "object") && '# ' + readingTip.creator.name}
          </Text>

          <Text style={{ ...ThemeStyles.c4 }} selectable={true}>
            {readingTip?.content}
          </Text>
        </View>

        {readingTipsList.length > 0 && <View style={{
          paddingHorizontal: ThemeDimensions.positive3,
          paddingVertical: ThemeDimensions.positive2,
        }}>
          <Text style={ThemeStyles.b3}>
            Suggestions:
          </Text>

          <ScrollView horizontal={true}>
            {readingTipsList?.map((readingTips) => <View
              key={readingTips._id}
              style={{
                backgroundColor: readingTips._id === readingTipId ? ThemeColors.grey : ThemeColors.white,
                borderRadius: ThemeDimensions.positive1,
                margin: ThemeDimensions.positive2,
                marginLeft: 0,
                width: ThemeDimensions.windowWidth50,
              }}>
              <TouchableOpacity
                activeOpacity={readingTips._id === readingTipId ? 1 : 0.5}
                onPress={() => readingTips._id === readingTipId ? {} : navigation.navigate(
                  RootStackName.ReadingTipDetail,
                  { readingTipId: readingTips._id },
                )}
              >
                <Column style={{ width: ThemeDimensions.percentage100 }}>
                  <View style={{ padding: ThemeDimensions.positive1, width: ThemeDimensions.percentage100 }}>
                    <Image
                      resizeMode="cover"
                      source={{ uri: toImgUrl(readingTips.thumbnail) }}
                      // onError={(event) => console.error(event.nativeEvent.error)}
                      style={{
                        borderRadius: ThemeDimensions.positive1,
                        height: ThemeDimensions.positive16,
                        width: ThemeDimensions.percentage100,
                      }}
                    />
                  </View>
                  <Column style={{ alignItems: 'flex-start', padding: ThemeDimensions.positive2, width: ThemeDimensions.percentage100 }}>
                    <Text numberOfLines={3} style={{
                      ...ThemeStyles.b4,
                      paddingBottom: ThemeDimensions.positive1,
                    }}>
                      {readingTips.title}
                    </Text>

                    <Text style={{ ...ThemeStyles.c5, color: ThemeColors.secondary }}>
                      {(typeof readingTips.creator === 'object') && readingTips.creator.name}
                    </Text>

                  </Column>
                </Column>
              </TouchableOpacity>
            </View>)}
          </ScrollView>
        </View>}
      </ScrollView>


      <Row style={{
        paddingHorizontal: ThemeDimensions.positive3,
        paddingVertical: ThemeDimensions.positive1,
        backgroundColor: ThemeColors.white,
        borderTopColor: ThemeColors.grey,
        borderTopWidth: 1,
      }}>
        <Column style={{ alignItems: 'flex-start' }}>
          {(nextReadingTipId !== '') && <Button
            onPress={() => navigation.navigate(RootStackName.ReadingTipDetail, { readingTipId: nextReadingTipId })}
            style={{
              paddingHorizontal: ThemeDimensions.positive2,
              paddingVertical: 2,
              width: ThemeDimensions.percentage100,
            }}
          >
            <Row>
              <FontAwesome5 name="chevron-left" color={ThemeColors.white} size={ThemeDimensions.positive2} />
              <Text style={{ ...ThemeStyles.c4, paddingTop: 2, color: ThemeColors.white }}>
                { } Previous
              </Text>
            </Row>
          </Button>
          }
        </Column>

        <Column style={{ alignItems: 'center' }}>
          <Button
            onPress={() => navigation.navigate(RootStackName.Home)}
            style={{
              paddingHorizontal: ThemeDimensions.positive2,
              paddingVertical: 2,
            }}
            background={ThemeColors.white}
            backgroundHover={ThemeColors.grey}
          >
            <FontAwesome5 name="home" color={ThemeColors.third} size={ThemeDimensions.positive3} />
          </Button>
        </Column>

        <Column style={{ alignItems: 'flex-end' }}>
          {(previousReadingTipId !== '') && <Button
            onPress={() => navigation.navigate(RootStackName.ReadingTipDetail, { readingTipId: previousReadingTipId })}
            style={{
              paddingHorizontal: ThemeDimensions.positive2,
              paddingVertical: 2,
              width: ThemeDimensions.percentage100,
            }}
          >
            <Row>
              <Text style={{ ...ThemeStyles.c4, paddingTop: 2, color: ThemeColors.white }}>
                Next { }
              </Text>
              <FontAwesome5 name="chevron-right" color={ThemeColors.white} size={ThemeDimensions.positive2} />
            </Row>
          </Button>
          }
        </Column>
      </Row>
    </View>
  );
};

export { ReadingTipDetail };