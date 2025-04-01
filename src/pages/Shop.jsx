import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { actionGetAllProduct} from '../api/search'



import Productcontainer from '../components/product/Productcontainer';


function Shop(props) {

  const queryParams = new URLSearchParams(useLocation().search);
  const category = queryParams.get('category'); 
  const keyword = queryParams.get('keyword'); 
  const minprice = queryParams.get('minprice');
  const maxprice = queryParams.get('maxprice');
  const limit = queryParams.get('limit');

  console.log("query",category,keyword)
  //state
  const [AllProducts,setAllProducts] = useState([])

  //get product data
  const getProduct = async (category,keyword,minprice,maxprice,limit) => {
      try {
  
        const res = await actionGetAllProduct(category,keyword,minprice,maxprice,limit)
        
        const { products } = res.data
  
        setAllProducts( products)
  
        
        return ("success")
      } catch (error) {
              console.log("1" , error)
        return ("fail")
      }
    }

  //effect
  useEffect( ()=>{ getProduct(category,keyword,minprice,maxprice,limit) } ,[category,keyword])

  return (
    <div>    
    <Productcontainer AllProducts = {AllProducts}  searchby = {category} />
    </div>
  )
}

export default Shop