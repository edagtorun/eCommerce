import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../themes/Colors';
import React from 'react';

export default function SectionHeader({title, count}) {
  return (
    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}> 
   <View style={{flexDirection:'row', alignItems:'center', gap:10, }}>
      <Text style={styles.TextProduct}>{title}</Text>
      <Text style={styles.TextNumber}>{count}</Text>
    </View>
    <TouchableOpacity>
    <Text style={{color:Colors.blue}}>SeeAll</Text>
    </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
    TextProduct:{
        color:Colors.black,
         fontSize:18, 
         fontWeight:'500', 
         letterSpacing:1,
      },
      TextNumber:{
        color:Colors.black,
        fontSize:14,
        fontWeight:'400',
        opacity:0.5,
    
      },
})