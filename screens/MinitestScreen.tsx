import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  SafeAreaView,
} from 'react-native';

const tabs = [{ name: 'My Account' }, { name: 'Company' }, { name: 'Team' }];
type Props = {
    countDownDate: Date;
  };

export default function Example() {
  const [value, setValue] = React.useState(0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {tabs.map((item, index) => {
          const isActive = index === value;

          return (
            <View style={{ flex: 1 }} key={item.name}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setValue(index);
                }}>
                <View
                  style={[
                    styles.item,
                    isActive && { borderBottomColor: '#6366f1' },
                  ]}>
                  <Text style={[styles.text, isActive && { color: '#6366f1' }]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 24,
    paddingHorizontal: 12,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#e5e7eb',
    borderBottomWidth: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  timerCountDownText: {
    fontWeight: "800",
    fontSize: 40,
    color: "#fff",
  },
});



export const TimerCountDownDisplay: React.FC<Props> = ({ countDownDate }) => {
  return (
    <View>
      <Text style={styles.timerCountDownText}>
        {countDownDate.getMinutes().toString().padStart(2, "0")}:
        {countDownDate.getSeconds().toString().padStart(2, "0")}
      </Text>
    </View>
  );
};
