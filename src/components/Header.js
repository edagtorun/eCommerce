import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from '../themes/Colors';
import { useNavigation } from '@react-navigation/native';

export default function Header() {

    const navigation = useNavigation();

  return (
    <View style={styles.Container}>
    <TouchableOpacity>
  <Icon name='shopping-bag'
   style={{ 
    fontSize:18,
    color:Colors.backgroundMedium,
    backgroundColor: Colors.backgroundLight,
    padding:12,
    borderRadius:10,
  }}
   />
      </TouchableOpacity>
   <TouchableOpacity onPress={()=> navigation.navigate('MyCart')}>
   <Icon name='shopping-cart'
    style={{ 
      fontSize:18,
      color:Colors.backgroundMedium,
     borderWidth:1,
     borderColor:Colors.backgroundLight,
      padding:12,
      borderRadius:10,
    }}
   />
   </TouchableOpacity>

 
  </View>
  );
}
const styles = StyleSheet.create({
    Container:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        padding:16,
      }
})