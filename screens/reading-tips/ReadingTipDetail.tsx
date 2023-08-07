import {
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { RootStackName, ThemeColors, ThemeDimensions, ThemeStyles } from "../../constants";
import { IReadingTip } from "../../interfaces";
import { toImgUrl } from "../../utils";
import { LoadingView } from "../../components";
import { getReadingTipById } from "../../api";

type ReadingTipDetailProps = NativeStackScreenProps<RootStackParamList, RootStackName.ReadingTipDetail>;

const ReadingTipDetail: FC<ReadingTipDetailProps> = ({ route }) => {
  const { readingTipId } = route.params;
  const [readingTip, setReadingTip] = useState<IReadingTip>()

  useEffect(() => {
    const fetchMiniTestById = async () => {
      const response = await getReadingTipById(readingTipId);
      if (response.status === 200) {
        const readingTipData: IReadingTip = response.data.data
        setReadingTip(readingTipData);
      }
    }
    fetchMiniTestById()
    return () => setReadingTip(undefined)
  }, [readingTipId]);

  if (!readingTip) return (
    <View style={{
      marginTop: ThemeDimensions.windowHeight40,
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
        <View style={{ paddingHorizontal: ThemeDimensions.positive2, paddingTop: ThemeDimensions.positive3 }}>
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

          <Text style={{ ...ThemeStyles.c4, textAlign: 'justify' }} selectable={true}>
            {readingTip?.content}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export { ReadingTipDetail };