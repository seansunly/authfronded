import React from 'react'
import ProductDetailCard from '../components/product/ProductDetailCard'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductById } from '../redux/feature/product/productSlice'
import { fetchProductById } from '../redux/feature/product/productSlice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'



export default function ProductDetail() {
    const dispatch = useDispatch() ;
    const param =useParams();
    console.log("test params: ", param.id)

    const productById= useSelector(selectProductById)
    console.log("productById:", productById)

    useEffect(()=>{
        dispatch(fetchProductById(param.id)) // replace 1 with the actual product id  //
    },[])
  return (
    <div>
      <h1 className="text-3xl text-blue-800 text-center mb-10">
        this is product detail
      </h1>
      <div className=" justify-center">
        <ProductDetailCard
          category={productById.category}
          description={productById.description}
          image={productById.image}
          price={productById.price}
          rating={productById.rating}
          title={productById.title}
        />
      </div>
    </div>
  );
}
