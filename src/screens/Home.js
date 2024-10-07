import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Colors } from '../themes/Colors';
import ProductCart from '../components/ProductCart';
import { Items } from '../database/Database';
import SectionHeader from '../components/SectionHeader';


export default function Home() {

const [products, setProducts] = useState([]);
const [accessory, setAccessory] =useState([]);

useEffect(() => {
  getDataFromDB();
},[]);

const getDataFromDB = () => {
  let productList = [];
  let accessoryList = [];

  for(let index = 0; index < Items.length; index++ ){
   if(Items[index].category === 'product'){
    productList.push(Items[index]);
   }else{
    accessoryList.push(Items[index]);
   }
  }
  setProducts(productList);
  setAccessory(accessoryList);
};

  return (
    <View style={styles.Header}>
      <StatusBar backgroundColor={Colors.white} barStyle={"dark-content"}/>
   <ScrollView showsVerticalScrollIndicator={false}> 
   <Header/>
   <View style={styles.HeaderContainer}>
    <Text style={styles.Text}>Hi-Fi Shop &amp; Service</Text>
    <Text style={styles.TextTwo}>
      Audio shop on Rustaveli Ave 57.
      {'\n'}This shop offers bpth products and services
    </Text>
   </View>
   <View style={{padding:16}}>
   <SectionHeader title={'Products'} count={'41'}/>
  <View style={styles.Cart}>
{products.map(data=> (<ProductCart key={data.id} data={data}/>))}
  </View>
   </View>

   <View style={{padding:16}}>
   <SectionHeader title={'Accessories'} count={'78'}/>
   <View 
   style={{
    flexDirection:'row',
     flexWrap:'wrap',  
     justifyContent:'space-around'
     }}>
    {accessory.map(data => <ProductCart data={data} key={data.id}/>)}
   </View>
   </View>

   </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  Header:{
    backgroundColor:Colors.white,
    width:'100%',
    height:'100%',
  },
  HeaderContainer:{
    marginBottom:10,
    padding:16,
  },
Text:{
  fontSize:26,
  color:Colors.black,
  fontWeight:'500',
  letterSpacing:1,
  marginBottom:10,
},
TextTwo:{
  fontSize:14,
fontWeight:'400',
letterSpacing:1,
lineHeight:24,
color:Colors.black,
},
Cart:{
  flexDirection:'row',
  justifyContent:'space-around',
  flexWrap:'wrap',
}
});