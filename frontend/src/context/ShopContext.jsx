/* eslint-disable react/prop-types */
import { createContext,useState,useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export const ShopContext=createContext();
const ShopContextProvider=(props)=>{
    const currency='VNĐ';
    const deliveryFee=10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(true);
    const [cartItems,setCartItems]=useState({});  
    const [products,setProducts]=useState([]);
    const [token,setToken]=useState('');  
   const navigate =useNavigate();
   
    const addToCart= async (itemId,size)=>{
      if(!size){
        toast.error('Please select product size');
        return
      }
     let cartData=structuredClone(cartItems);
     if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size]+=1;
     } else{
      cartData[itemId][size]=1;
     }
    } else {
      cartData[itemId]={};
      cartData[itemId][size]=1;
    }
    setCartItems(cartData);
    if(token){
      try {
        await axios.post(`${backendUrl}/api/cart/add`,{itemId,size},{headers:{token}});
        toast.success('Item added to cart');
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    }
  }

const getCartCount=()=>{
  let count=0;
  for(const items in cartItems){
    for(const item in cartItems[items]){
        try {
          if(cartItems[items][item]>0){
            count+=cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
    }
  }
  return count;
}

const updateQuantity=async (itemId,size,quantity)=>{
  console.log('Updating quantity:', { itemId, size, quantity });
  let cartData = structuredClone(cartItems);
  console.log('Before update:', cartData);
  cartData[itemId][size] = quantity;
  console.log('After update:', cartData);
  setCartItems(cartData);
  if(token){
    try {
      await axios.post(`${backendUrl}/api/cart/update`,{itemId,size,quantity},{headers:{token}});
      toast.success('Cart updated');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }
}
const getCartAmount=()=>{
  let totalAmount=0;
  for(const items in cartItems){
    const product=products.find((product)=>product._id===items);
    for(const item in cartItems[items]){
      try{
        if(cartItems[items][item]>0){
          totalAmount+=cartItems[items][item]*product.price;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  console.log('Total amount:', totalAmount);
  return totalAmount;
}

const getProductData=async ()=>{
 try {
  const response=await axios.get(`${backendUrl}/api/product/products`);
  if(response.data.success){
    setProducts(response.data.products);
  } else {
    toast.error(response.data.message);
  }
 } catch (error) {
   console.log(error);
  toast.error('Something went wrong');
 }
}
const getUserCart=async (token)=>{
  try {
    const response=await axios.post(`${backendUrl}/api/cart/get`,{},{headers:{token}});
    if(response.data.success){
      setCartItems(response.data.cartData);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong');
  }
}

useEffect(() => {
  getProductData();
}, []);

useEffect(()=>{
  if(!token&&localStorage.getItem('token')){
   setToken(localStorage.getItem('token'));
   getUserCart(localStorage.getItem('token'));
  }
},[token]);
    const values={
       products,currency,deliveryFee,
       search,setSearch,showSearch,setShowSearch,
        cartItems,setCartItems,addToCart,getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,token,setToken
    }
  return (
    <ShopContext.Provider value={values}>
      {props.children}
    </ShopContext.Provider>
  );
}
export default ShopContextProvider;