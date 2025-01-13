import Title from '../components/Title'
import React,{useContext,useState,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import axios, { all } from 'axios'
import { toast } from 'react-toastify'
const Orders = () => {
  const {backendUrl,token,currency}=useContext(ShopContext);
  const [orderData,setOrderData]=useState([]);  
  const fetchOrders=async ()=>{
    try {
      console.log(token);
      if(!token){
        return null;
      }
      const response=await axios.post(`${backendUrl}/api/order/userorders`,{},{headers:{token}});
      if(response.data.success){
        let allOrder=[];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
          item['status']=order.status
          item['payment']=order.payment
          item['paymentMethod']=order.paymentMethod
          item['date']=order.date
          allOrder.push(item);
          })
        });
      setOrderData(allOrder.reverse());
       console.log(allOrder);
      }
    } catch (error) {
      console.log(error);
      toast.error('Internal Server Error while fetching orders');
    }
  }
  useEffect(()=>{
    fetchOrders();
  },[token]);
  // Add this new useEffect to monitor orderData changes
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
      <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
        orderData.map((item,index)=>(
            <div key={index} className='flex flex-col items-center border-b border-t py-4 md:flex-row md:items-center md:justify-between gap-4'>
                   <div className='flex items-start gap-6 text-sm'>
                     <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                     <div >
                      <p className='sm:text-base font-medium'>{item.name}</p>
                      <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                       <p className='text-lg'>{item.price}{currency}</p>
                       <p>Quantity: {item.quantity}</p>
                       <p>Size: {item.size}</p>
                      </div>
                      <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                      <p className='mt-1'>Payment Method: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                     </div>
                    
                   </div>
                   <div className='flex justify-between md:w-1/2'>
                          <div className='flex items-center gap-2'> 
                            <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                            <p className='text-sm md:text-base'>{item.status}</p>
                          </div>
                     </div>
                     <button onClick={fetchOrders}  className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders