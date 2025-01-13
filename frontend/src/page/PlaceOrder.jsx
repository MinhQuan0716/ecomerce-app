import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const PlaceOrder = () => {
  const {backendUrl, cartItems,token,navigate,setCartItems,getCartAmount,deliveryFee,products} = useContext(ShopContext);
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
     try {
      let orderItem=[];
      for (const items in cartItems) {
       for(const item in cartItems[items]){
            if(cartItems[items][item]>0){
              const itemInfo=structuredClone(products.find(product=>product._id===items));
             if(itemInfo){
              itemInfo.size=item;
              itemInfo.quantity=cartItems[items][item];
              orderItem.push(itemInfo);
             }
            }
       }
       let orderData={
        address:formData,
        items:orderItem,
        amount:getCartAmount()+deliveryFee,
       };
          switch (method) {
            // api call for code payment method
            case 'cod':
              // eslint-disable-next-line no-case-declarations
              const response=await axios.post(`${backendUrl}/api/order/place`,orderData,{headers:{token}});
              if(response.data.success){
                     setCartItems({});
                      navigate('/orders');
              } else {
                toast.error(response.data.message);
              }
              break;
            // api call for stripe payment method
            case 'stripe':
              navigate('/not-implemented');
              break;
            // api call for razorpay payment method
            case 'razorpay':
              navigate('/not-implemented');
              break;  
            default:
              break;
          }
      }
    }catch (error) {
       console.log(error);
      
     }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-500 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-500 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-500 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-500 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-500 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-500 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipCode' value={formData.zipCode} className='border border-gray-500 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip Code' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-500 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-500 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>
      {/* Right side */}
      <div className='mt-8'>
        <div className='mt-3 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment method */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className=' flex items-center cursor-pointer gap-3 border p-2 px-3'>
              <p className={`min-w-3.5 h-3.5 rounded-full border  ${method === 'stripe' ? 'bg-green-400' : ''} `}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className=' flex items-center cursor-pointer gap-3 border p-2 px-3'>
              <p className={`min-w-3.5 h-3.5 rounded-full border  ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className=' flex items-center cursor-pointer gap-3 border p-2 px-3'>
              <p className={`min-w-3.5 h-3.5 rounded-full border ${method === 'cod' ? 'bg-green-400' : ''} `}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit'  className='w-full bg-black text-white py-2.5 rounded mt-6'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder