import React,{useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
const Collection = () => {
  const { products,search,showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] =useState(false);
  const [filterProduct,setFilterProduct] = useState([]);
  const[cagetory,setCagetory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relevant');
  // function to toggle category
  const toggleCategory =(e)=>{
       if(cagetory.includes(e.target.value)){
           setCagetory(prev=>prev.filter(item=>item!=e.target.value));
       } else{
        setCagetory(prev=>[...prev,e.target.value]);
       }
  }
  useEffect(()=>{
  },[cagetory]);
// function to toggle subcategory
  const toggleSubCategory =(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item!=e.target.value));
    } else{
      setSubCategory(prev=>[...prev,e.target.value]);
    }
}
useEffect(()=>{
},[subCategory])
// function to apply filter
const applyFilter=()=>{
  let productCopy=products.slice();
  if(showSearch && search){
    productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));	
  }
  if(cagetory.length>0){
    productCopy=productCopy.filter(item=>cagetory.includes(item.category));
  } 
   if(subCategory.length>0){
    productCopy=productCopy.filter(item=>subCategory.includes(item.subCategory));
  }
  setFilterProduct(productCopy);
}
// function to sort product 
const sortProduct=()=>{     
  let fpCopy=products.slice();
  switch(sortType){
    case 'low-high':
     setFilterProduct( fpCopy.sort((a,b)=>a.price-b.price));
      break;
    case 'high-low':
     setFilterProduct( fpCopy.sort((a,b)=>b.price-a.price));
      break;
    default:
      applyFilter();
      break;
  }
}
// apply filter
useEffect(()=>{
  applyFilter();
},[cagetory,subCategory,search,showSearch,products])

// filter product
  useEffect(()=>{
    setFilterProduct(products);
  },[products])

  // sort product
 useEffect(()=>{
  sortProduct();
 },[sortType])

  return (   
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
  {/* Filter options */}
  <div className=' min-w-60'>
    <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTER
      <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} alt="" />
    </p>
    {/* Category filter */}
    <div className={`border border-gray-300 pl-5 py-3 mt-6 hidden sm:block ${showFilter ? '' : 'hidden'} sm:block`}>
      <p className='mb-2 text-sm font-medium'>Category</p>
      <div className='flex flex-col gap-1 text-sm font-light text-gray-700'>
        <p className='flex gap-2 items-center'>
          <input className='w-3' type="checkbox" value="Men"  onChange={toggleCategory}/> Men
        </p>
        <p className='flex gap-2 items-center'>
          <input className='w-3' type="checkbox" value="Women"onChange={toggleCategory} /> Women
        </p>
        <p className='flex gap-2 items-center'>
          <input className='w-3' type="checkbox" value="Kids" onChange={toggleCategory}/> Kids
        </p>
      </div>
    </div>

  {/* Subcategory filter */}
  <div className={`border border-gray-300 pl-5 py-3 my-5 hidden sm:block ${showFilter ? '' : 'hidden'} sm:block`}>
    <p className='mb-2 text-sm font-medium'>Type</p>
    <div className='flex flex-col gap-1 text-sm font-light text-gray-700'>
      <p className='flex gap-2 items-center'>
        <input className='w-3' type="checkbox" value="Topwear" onChange={toggleSubCategory}/> Topwear
      </p>
      <p className='flex gap-2 items-center'>
        <input className='w-3' type="checkbox" value="Bottomwear" onChange={toggleSubCategory}/> Bottomwear
      </p>
      <p className='flex gap-2 items-center'>
        <input className='w-3' type="checkbox" value="Winterwear" onChange={toggleSubCategory}/> Winterwear
      </p>
    </div>
  </div>
  </div>
  {/* Right side */}
  <div className='flex-1'>
       <div className='flex justify-between text-base sm:text-2xl mb-4'>
              <Title text1={'ALL'} text2={'COLLECTIONS'}/>
              {/* Product sort */}
              <select onChange={(e)=>(setSortType(e.target.value))} className='border-2 border-gray-600 text-sm py-2'>
                <option value="relevant">Sort by:Relevant</option>
                <option value="low-high">Sort by: Low to high</option>
                <option value="high-low">Sort by:High to low</option>
              </select>
       </div>
       {/* Map products */}
       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>
          {
            filterProduct.map((item,index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
       </div>
   </div>
</div>

  )
}

export default Collection