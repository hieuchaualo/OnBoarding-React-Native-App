import {
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import FeatherIcon from 'react-native-vector-icons/Feather';
const { height } = Dimensions.get("window");
import { Timer } from 'react-native-stopwatch-timer';

type Props = NativeStackScreenProps<RootStackParamList, "Exercises">;

const ExercisesScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const [isTimerStart, setIsTimerStart] = useState(true);
  const [timerDuration, setTimerDuration] = useState(10000);
  const [resetTimer, setResetTimer] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerAction}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <FeatherIcon name="arrow-left" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.headerTitle}>Mini Test</Text>

            <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}>
                <FeatherIcon name="more-vertical" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          <ImageBackground
              style={{
                height: height / 4,
              }}
              resizeMode="contain"
              source={require("../assets/images/ha.jpg")}
            />
            <View style={styles.info}>
              <Text style={styles.infoTitle}>The happiest country in the world</Text>
              <Text style={styles.description}>
              During the settlement of New Zealand by European immigrants, natural timbers played a major role. Wood was easily accessible and relatively cheap. A tradition of wooden housed arose, supported by the recognition that they were less likely to collapse suddenly during earthquakes, a not infrequent event in this part of the world. But in addition to demand from the domestic market, there was also a demand for forest products from overseas.

Early explores recognised the suitability of the tall, straight trunks of the kauri for constructing sailing vessels. The kauri is a species of coniferous tree found only in small areas of the southern hemisphere. So from the early 1800s, huge amounts of this type of wood were sold to Australia and the UK for that purpose. For a period, the forestry industry was the country’s major export earner but the rate of harvest was unsustainable and, by the beginning of the 2O'n century, indigenous timber exports were rapidly declining.

From the 1940s, newly established plantations of an imported, species of tree called radiate pine supplied timber and other wood products in increasing quantities. By the 1960s, plantation- grown timber was providing most of the the basis of paper.

Pulp: wood which is crushed until soft enough to country's sawn timber needs, especially for construction. Today, less than two per cent of timber is cut from indigenous forest, and almost ail of that is used for higher- value end uses, such as furniture and fittings. As the pine industry developed, it became apparent that this type of wood was also well suited for many uses. It makes excellent pulp*, and is frequently used for post, poles, furnishings and moldings, particleboard, fiberboard, and for plywood and' engineered' wood products. Pine by- products are used in the chemical and pharmaceutical industries and residues are consumed for fuel. This amazing versatility has encouraged the development of an integrated forest- products industry which is almost unique in the world.

Exporters of wood products have largely targeted the rapidly growing markets of South and East Asia and Australia. 80 percent of exports by value go to only five markets: Japan, Korea, China, the United States and Australia. The product mix remains heavily based on raw materials, with logs, sawn wood, pulp and paper comprising 75 per cent of export value. However, finished wood products such as panels and furniture components are exported to more than 50 countries.

In New Zealand itself, the construction industry is the principal user of solid wood products, servicing around 20000 new house starts annually. However, the small size of New Zealand's population (just over four million), plus its small manufacturing and remanufacturing base, limit the forestry industry's domestic opportunities. For the last few years local wood consumption has been around only four million cubic metres. Accordingly, the development of the export market is the key to the industry's growth and contribution to the national economy in decades to come.

In 2004, forestry export receipts were about 11 per cent of the country's total export income, their value having increased steadily for ten years, until affected by the exchange fluctuations and shipping costs of recent years. The forestry industry is New Zealand's third largest export sector, generating around $ 3.3 billion annually from logs and processed wood products. But it is generally agreed that it is operating well below its capacity and, with the domestic market already at its peak, almost all of the extra wood produced in future will have to be marketed overseas. That presents a major marketing challenge for the industry.

Although the export of logs will continue to provide valuable earnings for forest owners, there is broad acceptance that the industry mu3t be based on valuable earnings or forest owners, there is broad acceptance that the industry must be based on value- added products in future. So the industry is investigating various processing. Infrastructure and investment strategies with a view to increasing the level of local manufacturing before export. The keys to factors, better international marketing, product innovation, internationally competitive processing, better infrastructure, and a suitable political, regulatory and investment environment. The industry claim that given the right conditions, by 2025 the forestry sector could be the country's biggest export earner, generating $20 billion a year and employing 60000 people

One competitive advantages that New Zealand has is its ability to source large quantities of softwood from renewable forests. Consumers in several key wood markets are becoming more worried about sustainability, and the industry is supporting the development of national standards as well as the recognition of these internationally. However, New Zealand is not the only country with a planation- style forestry industry. Chile, brazil, Argentina, South Africa and Australia all have extensive plantings of fast growing species ( hardwood and softwood), and in the northern hemisphere, Scandinavian countries have all expanded their forest or controlled their use in the interests of future production.

Finally, in addition to completion from other wood producers, New Zealand faces competition from goods such as wood substitutes. These include stool framing for houses. This further underlines the necessity for globally competitive production and marketing strategies. 


Pulp: wood which Is crushed until soft enough to form the basis of paper.
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <View style={styles.overlay}>
        <View style={styles.overlayContent}>
          <View style={styles.overlayContentTop}>
          <Timer
            style = {styles.timer}
            totalDuration={timerDuration}
            // msecs
            //Time Duration
            start={isTimerStart}
            //To start
            reset={resetTimer}
            //To resetnpm start
            options={options}
            //options for the styling
            handleFinish={() => {
              Alert.alert(
                'Time out',
                'Two button alert dialog',
                [
                  {text: 'View Result', onPress: () => console.log('Yes button clicked')},
                ],
                { 
                  cancelable: true 
                }
              );
            }}
          />
          </View>
        </View>
        

        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExercisesScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },



  info: {
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  infoTitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    letterSpacing: 0.38,
    color: '#000000',
    marginBottom: 6,
  },

  infoRatingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8e8e93',
    marginLeft: 2,
  },
  infoDescription: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.078,
    color: '#8e8e93',
  },
  description:{
    fontFamily: Font["poppins-regular"],
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 28,
    fontSize: FontSize.medium,
  },
  stats: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  statsItem: {
    flexGrow: 2,
    flexShrink: 1,
    flexBasis: 0,
    paddingVertical: 12,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderColor: '#fff',
  },
  statsItemText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: '#8e8e93',
    marginBottom: 4,
  },
  statsItemValue: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: '#000',
  },
  overlayContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  overlayContentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 2,
  },
  timer: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    color: '#8e8e93',
    marginRight: 4,
  },

  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
const options = {
  text: {
    fontFamily: Font["poppins-semiBold"],
    color: '#8e8e93',
    fontSize: FontSize.large,
  },
};