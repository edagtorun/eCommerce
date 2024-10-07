import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../themes/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart({
    data, 
    product, 
    setProduct, 
    getDataFromDB, 
    getTotal}) {
const navigation = useNavigation();



//* Gonderilen type' ve idli urunun miktarini arttirma ve azaltma
const updateQuantity = (id, type) => {
    let updatedProducts = product.map(item =>{
        if(item.id === id){
            //* Gonderilen type increase ise arttirma islemi gerceklestir degilse azaltma islemi gerceklestir.
            let newQuantity = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        // * Guncellenmis miktar sifirdan buyuk ise guncellenmis miktari ata degilse 1 olarak kalsin.
            item.quantity = newQuantity > 0 ? newQuantity :  removeItemFromCart(id);
        }
        return item; 
    });
    setProduct(updatedProducts);
    getTotal(updatedProducts);
};

//* Gonderilen idli elemani asyncStorage'dan sildik
const removeItemFromCart = async id => {
let itemsArray = await AsyncStorage.getItem("cartItems");

itemsArray = JSON.parse(itemsArray);

if(itemsArray){
    let array = itemsArray.filter(item =>item !== id);

    await AsyncStorage.setItem('cartItems', JSON.stringify(array));
    getDataFromDB();
}
};
  return (
   <TouchableOpacity 
   onPress={() => navigation.navigate("ProductInfo", {productID: data.id})}
   style={styles.Container}>
    <View style={styles.imageContainer}>
        <Image style={styles.image} source={data.productImage}/>
    </View>
    <View style={styles.productDetail}>
     <View >
        <Text>
            {data.productName}
        </Text>
        <View style={styles.Prices}>
            <Text style={styles.Price1}>
                {data.productPrice * data.quantity}₺
            </Text>
            <Text style={styles.Price2}>
                {
                    data.productPrice * data.quantity + (data.productPrice * data.quantity) / 20 
                }₺ eski fiyat
            </Text>
        </View>
     </View> 
     <View style={styles.buttonGroup}>
        <View  style={styles.buttons}>
            <TouchableOpacity style={styles.buttonOne} onPress={() => updateQuantity(data.id, 'decrease')}> 
                <Icon name='minus' size={16}/>
            </TouchableOpacity>
            <Text>{data.quantity}</Text>
            <TouchableOpacity style={styles.buttonOne} onPress={() => updateQuantity(data.id, 'increase')}>
            <Icon name='plus' size={16}/>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonTwo} onPress={() => removeItemFromCart(data.id)}>
            <Icon name='delete-outline' size={16} />
        </TouchableOpacity>
     </View>
    </View>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    Container:{
        width:'100%',
        height:100,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:6,
    },
    imageContainer:{
        width:'30%',
        height:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.backgroundLight,
        marginRight:22,
        borderRadius:10,
    },  
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'contain',
    },
    productDetail:{
        flex:1,
        height:'100%',
        justifyContent:'space-around'
    },
    Prices:{
        flexDirection:'row',
        alignItems:'center',
        opacity:0.6,
        marginTop:4,
    },
    Price1:{
        fontSize:14,
        fontWeight:'400',
        marginRight:4,
        maxWidth:'85%',
    },
    Price2:{
        fontSize:12,
    },
    buttonGroup:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    buttons:{
        flexDirection:'row',
        alignItems:'center',
        gap:20,
    },
    buttonOne:{
        backgroundColor:Colors.backgroundLight,
        padding:4,
        borderRadius:100,
        borderWidth:0.4,
        opacity:0.5,
    },
    buttonTwo:{
        backgroundColor:Colors.backgroundMedium,
        color:Colors.backgroundLight,
        padding:7,
        borderRadius:100,
        opacity:0.5,
    },
});