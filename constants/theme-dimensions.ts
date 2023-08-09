import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const ThemeDimensions = {
    positive1: 6,
    positive2: 12,
    positive3: 18,
    positive4: 24,
    positive5: 30,
    positive6: 36,
    positive7: 42,
    positive8: 48,
    positive9: 56,
    positive10: 60,
    positive15: 90,
    positive16: 96,
    positive20: 120,

    percentage5: '5%',
    percentage10: '10%',
    percentage15: '15%',
    percentage20: '20%',
    percentage25: '25%',
    percentage40: '40%',
    percentage45: '45%',
    percentage50: '50%',
    percentage75: '75%',
    percentage80: '80%',
    percentage85: '85%',
    percentage90: '90%',
    percentage95: '95%',
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