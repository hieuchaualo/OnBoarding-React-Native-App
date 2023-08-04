import { FunctionComponent } from "react"
import FeatherIcon from "react-native-vector-icons/Feather";
import { Text } from "react-native"
import { RootStackName, ThemeColors, ThemeDimensions, ThemeFonts } from "../../../constants"
import { Button } from "../../button"
import { Row } from "../../row"
import { RootStackParamList } from "../../../types";

type BottomNavProps = {
    activeKey: keyof RootStackParamList;
    navigate: (screen: keyof RootStackParamList) => void;
}

const BottomNav: FunctionComponent<BottomNavProps> = ({ navigate, activeKey }) => {
    return (
        <Row style={{
            justifyContent: "space-evenly",
            padding: ThemeDimensions.positive1,
            backgroundColor: ThemeColors.white,
            borderTopColor: ThemeColors.grey,
            borderTopWidth: 1,
        }}>
            <Button
                onPress={() => (activeKey !== RootStackName.Home) && navigate(RootStackName.Home)}
                background={ThemeColors.white}
                backgroundHover={ThemeColors.white}
            >
                <FeatherIcon
                    name="home"
                    size={ThemeDimensions.fontSize.xxl}
                    color={(activeKey === RootStackName.Home) ? ThemeColors.primary : ThemeColors.secondary}
                />
                <Text style={{
                    marginTop: 4,
                    color: (activeKey === RootStackName.Home) ? ThemeColors.primary : ThemeColors.secondary,
                    fontFamily: ThemeFonts.regular,
                    fontSize: ThemeDimensions.fontSize.sm
                }}>
                    Home
                </Text>
            </Button>

            <Button
                onPress={() => (activeKey !== RootStackName.TestHistory) && navigate(RootStackName.TestHistory)}
                background={ThemeColors.white}
                backgroundHover={ThemeColors.white}
            >
                <FeatherIcon
                    name="file-text"
                    size={ThemeDimensions.fontSize.xxl}
                    color={(activeKey === RootStackName.TestHistory) ? ThemeColors.primary : ThemeColors.secondary}
                />
                <Text style={{
                    marginTop: 4,
                    color: (activeKey === RootStackName.TestHistory) ? ThemeColors.primary : ThemeColors.secondary,
                    fontFamily: ThemeFonts.regular,
                    fontSize: ThemeDimensions.fontSize.sm
                }}>
                    Test History
                </Text>
            </Button>

            <Button
                onPress={() => (activeKey !== RootStackName.HowPlay) && {}}
                background={ThemeColors.white}
                backgroundHover={ThemeColors.white}
            >
                <FeatherIcon
                    name="file-text"
                    size={ThemeDimensions.fontSize.xxl}
                    color={(activeKey === RootStackName.HowPlay) ? ThemeColors.primary : ThemeColors.secondary}
                />
                <Text style={{
                    marginTop: 4,
                    color: (activeKey === RootStackName.HowPlay) ? ThemeColors.primary : ThemeColors.secondary,
                    fontFamily: ThemeFonts.regular,
                    fontSize: ThemeDimensions.fontSize.sm
                }}>
                    Notification
                </Text>
            </Button>

            <Button
                onPress={() => (activeKey !== RootStackName.Nhap) && navigate(RootStackName.Nhap)}
                background={ThemeColors.white}
                backgroundHover={ThemeColors.white}
            >
                <FeatherIcon
                    name="user"
                    size={ThemeDimensions.fontSize.xxl}
                    color={(activeKey === RootStackName.Nhap) ? ThemeColors.primary : ThemeColors.secondary}
                />
                <Text style={{
                    marginTop: 4,
                    color: (activeKey === RootStackName.Nhap) ? ThemeColors.primary : ThemeColors.secondary,
                    fontFamily: ThemeFonts.regular,
                    fontSize: ThemeDimensions.fontSize.sm
                }}>
                    Profile
                </Text>
            </Button>
        </Row>
    )
}

export {
    BottomNav,
}