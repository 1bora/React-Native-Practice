import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function App() {
  const handlePress = () => console.log('Text clicked');
  console.log(require('./assets/favicon.png'));
  return (
    <View style={styles.container}>
      <Text numberOfLines={1} onPress={handlePress}>
        엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴엄청엄청긴
      </Text>
      <Text>Hello React Native</Text>
      {/* <Image source={require('./assets/favicon.png')} /> */}
      <Image
        blurRadius={1}
        fadeDuration={1000}
        source={{
          width: 200,
          height: 300,
          uri: 'https://picsum.photos/200/300',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
