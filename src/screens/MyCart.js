import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Cart from '../components/Cart';
import { Items } from '../database/Database';
import { Toast } from 'toastify-react-native';


export default function MyCart() {
const navigation =  useNavigation();
const [product, setProduct] = useState([]);
const [total, setTotal] = useState(0);

  useEffect(() => {
    getDataFromDB();
  },[navigation]);

  const getDataFromDB = async () => {
    //* AsyncStorage dan veriyi al
    let items = await AsyncStorage.getItem('cartItems');
    console.log(items);
    //* Aldığımız veriyi JSON a çevirme
    items = JSON.parse(items);

    let productData = [];
    if (items) {
      //* Sepetteki ürüne miktar ekleyebilimek için dönüp produtcData dizisine veriyi ekledik
      Items.forEach(data => {
        if (items.includes(data.id)) {
          data.quantity = 1; // eklenilen idli ürünlerin miktarlarını 1 yap
          productData.push(data); // productData dizisine ekle
        }
      });
      //* Product statei güncellendi
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct([]);
      setTotal(0);
    }
  };

  const getTotal = productData => {
    let total = 0;

    for(let index=0; index < productData.length; index++){
     let productPrice =  productData[index].productPrice * productData[index].quantity;
     total += productPrice;
    }
    setTotal(total);
  };

const checkout = async () => {
  try {
    await AsyncStorage.removeItem("cartItems");
  } catch (error) {
    return error;
  }
  navigation.navigate("Home");
}
  return (
    <>
    {product.length > 0 ? (<View style={styles.Container}>  
    <View style={styles.header}>
        <TouchableOpacity onPress={()=> navigation.goBack()}  style={styles.Touchable}>
          <Icon name='chevron-left' size={20} />
        </TouchableOpacity>
        <Text style={styles.Text}>Order Details</Text>
      </View> 
    <ScrollView>
     
      <Text style={styles.myCart}>My Cart</Text>
      <View style={{paddingHorizontal: 16,}}>
        {product.length > 0 ?
       product.map((data) =>
         <Cart key={data.id}
        data={data}
         product={product} 
         setProduct={setProduct}
         getDataFromDB={getDataFromDB}
         getTotal={getTotal}
         />)
         : null }
      </View>
      <View>
        <View >
          <Text style={styles.locationText}>Delivery Location</Text>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            paddingHorizontal:16,
            marginVertical:10,
          }}>
            <View style={{
          flexDirection:'row',
          width:'80%',
          alignItems:'center',
          gap:10,
        }}>
              <View style={styles.deliveryBox}>
                <Icon name='truck-delivery-outline' size={18} color={Colors.blue}/>
              </View>
              <View>
                <Text style={{fontSize: 14, color:Colors.black, fontWeight:'500'}}>
                  Ankara-Kizilay
                </Text>
              </View>
            </View>
        <Icon name='chevron-right' size={22} color={Colors.black}/>
          </View>
        </View>
      </View>

      <Text style={styles.locationText}>Payment Method</Text>
      <View style={{paddingHorizontal:16, marginVertical:10}}>
        <View style={{flexDirection:"row", justifyContent:'space-between'}}>
       <View style={{flexDirection:"row", gap:10}}>
       <View style={styles.creditCart}>
          <Text style={{
            color:Colors.blue,
          }}>VISA</Text>
        </View>
        <View style>
              <Text>VISA Classic</Text>
              <Text style={{opacity:0.6}}>****-2121</Text>
            </View>
          </View>
          <Icon name='chevron-right' size={22} color={Colors.black}/>
        </View>
      </View>

      <Text style={styles.locationText}> Order Info</Text>
      <View style={{paddingHorizontal:16, marginVertical:10, gap:10}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{
            opacity:0.5,
            fontSize:15,
            fontWeight:'400'
          }}>Subtotal</Text>
          <Text style={{color:Colors.black, fontSize:15, fontWeight:'400'}}>{total}₺</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{
            opacity:0.5,
            fontSize:15,
            fontWeight:'400'
          }}>Shipping Tax</Text>
          <Text style={{color:Colors.black, fontSize:15, fontWeight:'400'}}>{total / 20}₺</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{
            opacity:0.5,
            fontSize:15,
            fontWeight:'400'
          }}>Total</Text>
          <Text style={{color:Colors.black, fontSize:18, fontWeight:'600'}}>{total + total / 20}₺</Text>
        </View>
        
      </View>
    </ScrollView>

    <View style={{
      position:'absolute',
      bottom:10,
      height:'8%',
      width:'100%',
    
      justifyContent:'center',
      alignItems:'center',
    }}>
      <TouchableOpacity 
      onPress={()=> checkout()}
      style={{
        backgroundColor:Colors.blue,
         width:'86%', 
         height:'90%', 
         borderRadius:20,
         justifyContent:'center',
         alignItems:'center',
         }}>
      <Text style={{color:Colors.white, fontStyle:12, fontWeight:'500', letterSpacing:1,}}>  CHECKOUT {total + total / 20}</Text>
      </TouchableOpacity>
    </View>
    </View>) : 
    <View style={{
      justifyContent:'center',
      alignItems:'center',
      height:'100%',
      backgroundColor:Colors.white
    }}> 
      <Text>Sepette Urun Bulunmamaktadir</Text>
      <TouchableOpacity 
      onPress={()=>navigation.navigate("Home")} 
      style={{marginTop:10,}}>
        <Text style={{textDecorationLine:'underline', color:Colors.blue}}>Urun Eklemek icin Ana Sayfata Git</Text>
      </TouchableOpacity>
      </View>}
    
    </>
  );
}

const styles = StyleSheet.create({
  Container:{
    backgroundColor: Colors.white,
      width:'100%',
      height:'100%',
      position:'relative',
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:16,
    alignItems:'center',
    width:'65%',
  },
  Touchable:{
    backgroundColor:Colors.backgroundLight,
    padding:12,
    borderRadius:12,
  marginLeft:10,

  },
  Text:{
    fontSize:18,
    fontWeight:"600",
    color:Colors.black,
    paddingHorizontal:10,
  },
  myCart:{
    fontSize:20,
    color:Colors.black,
    paddingTop:20,
    paddingLeft:16,
    marginBottom:10,
    fontWeight:'500',
  },
  locationText:{
    fontSize:16,
    color:Colors.black,
    paddingTop:20,
    paddingLeft:16,
    marginBottom:10,
    marginVertical:10,
    letterSpacing:1,
    fontWeight:'500',
  },
  deliveryBox:{
    backgroundColor:Colors.backgroundLight,
    padding:12,
    borderRadius:10,
  },
  creditCart:{
    backgroundColor:Colors.backgroundLight,
    padding:12,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
  }
});