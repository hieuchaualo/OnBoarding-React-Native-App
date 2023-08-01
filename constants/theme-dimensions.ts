import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const ThemeDimensions = {
    positive1: 6,
    positive2: 12,
    positive3: 18,
    positive4: 24,
    positive5: 30,
    positive8: 48,
    positive10: 60,
    positive20: 120,

    negative1: -6,
    negative2: -12,
    negative3: -18,
    negative4: -24,
    negative5: -30,
    negative10: -60,
    negative20: -120,

    percentage25: '25%',
    percentage50: '50%',
    percentage75: '75%',
    percentage100: '100%',

    windowHeight: height,
    windowHeight75: height * 0.75,
    windowHeight50: height * 0.5,
    windowHeight40: height * 0.4,
    windowHeight30: height * 0.3,
    windowHeight25: height * 0.25,

    windowWidth: width,
    windowWidth75: width * 0.75,
    windowWidth50: width / 2,
    windowWidth25: width / 4,

    fontSize: {
        sm: 12,
        md: 14,
        lg: 16,
        xl: 20,
        xxl: 24,
        xxxl: 30,
    }
};