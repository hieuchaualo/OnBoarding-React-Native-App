import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from '../navigation';

const SECTIONS = [ 
  {
    header: 'Content',
    items: [
      { id: 'settings', icon: 'settings', label: 'Settings', type: 'link' },
      { id: 'help-circle', icon: 'help-circle', label: 'Helps', type: 'link' },
      { id: 'log-out', icon: 'log-out', label: 'Logout', type: 'link' },
    ],
  },
];


type Props = NativeStackScreenProps<RootStackParamList, "Nhap">;

const NhapScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  return (

    <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>

        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur.
        </Text>
      </View>

      <View style={styles.profile}>
        <Image
          source={require("../assets/images/avatar.jpg")}
          style={styles.profileAvatar}
        />

        <Text style={styles.profileName}>John Doe</Text>

        <Text style={styles.profileEmail}>john.doe@mail.com</Text>

        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}>
          <View style={styles.profileAction}>
            <Text style={styles.profileActionText}>Edit Profile</Text>

            <FeatherIcon color="#fff" name="edit" size={16} />
          </View>
        </TouchableOpacity>
      </View>
      

      {SECTIONS.map(({ header, items }) => (
        <View style={styles.section} key={header}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{header}</Text>
          </View>
          <View style={styles.sectionBody}>
            {items.map(({ id, label, icon, type}, index) => {
              return (
                <View
                  key={id}
                  style={[
                    styles.rowWrapper,
                    index === 0 && { borderTopWidth: 0 },
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}>
                     <View style={styles.buttoncontainer}>
                        <View style={styles.row}>
                          <FeatherIcon
                            color="#616161"
                            name={icon}
                            style={styles.rowIcon}
                            size={22}
                          />

                          <Text style={styles.rowLabel}>{label}</Text>

                          <View style={styles.rowSpacer} />

                        </View>

                      </View> 
                    
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>

    
  </SafeAreaView>
);
}

export default NhapScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#a7a7a7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',  
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
    color: '#090909',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  buttoncontainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    // paddingRight: 24,
    // height: 50,
    padding: Spacing * 1.5,
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing * 1,
    marginRight: Spacing * 2,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ffffff',
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  rowValue: {
    fontSize: 17,
    color: '#ffffff',
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});