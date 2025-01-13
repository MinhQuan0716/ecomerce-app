import React,{useState,useContext,useEffect} from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {setToken,token,backendUrl,navigate} = useContext(ShopContext);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const onSubmitHandler=async (event)=>{
    event.preventDefault();
    try {
      if(currentState==='Login')
      {
        const response=await axios.post(`${backendUrl}/api/user/login`,{email,password});
        console.log(response.data);
        setToken(response.data.token);
       localStorage.setItem('token',response.data.token);
      }
      else if(currentState==='Sign Up'){
        const response=await axios.post(`${backendUrl}/api/user/register`,{name,email,password});
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    if(token)
    {
      navigate('/');
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' action="">
      {
        currentState==='Login'? 
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
           <p className='prata-regular text-3xl'>Login</p>
           <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>:
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>Sign Up</p>
        <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
     </div>
      }
        { 
        currentState==='Login'?'' : <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='name' required/>
        }
        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' type="Email" placeholder='email' required/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' type="Password" placeholder='password' required />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password</p>
        
        {
        currentState==='Login'?
        <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
         : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login</p>
         }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Sign Up'?'Register':'Login'}</button>
    </form>
  )
}

export default Login