import React from "react";
import { SafeAreaView } from 'react-native';
import { Text,View,StyleSheet,TouchableOpacity } from "react-native";
import EditScreenInfo from '@/components/EditScreenInfo';

import { useLayoutEffect } from 'react';
import { blue, red } from "react-native-reanimated/lib/typescript/Colors";


export default function TabOneScreen() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.title}>track 2</Text>
    //   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    //   <EditScreenInfo path="app/(tabs)/index.tsx" />
    // </View>
    <SafeAreaView style={styles.safe}>
     <View >
          <Text>Enjoy the Life</Text>
          <Text>with good health</Text>
        
    </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  safe:{
    flex: 1,
   
   
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
