import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  fetchProductCafeById, selectproductCaffeeById } from '../../redux/feature/productCaffee/productCaffeeSlice';
import ProductCafeDetailCard from '../../components/productCaffeeComponets/ProductCafeDetailCard';

export default function ProductCafeDetail() {
    const dispatch = useDispatch() ;
    const param =useParams();
    console.log("test params: ", param.codeProduct)

    const productById= useSelector(selectproductCaffeeById)
    console.log("productById:", productById)
    console.log("product")

    useEffect(()=>{
        dispatch(fetchProductCafeById(param.codeProduct)) // replace 1 with the actual product id  //
    },[])
    //console.log("productById:", productById.price)

  return (
    <div>
      <div>
      <h1 className="text-3xl text-blue-800 text-center mb-5">
        this is product detail
      </h1>
      <div className=" ">
        <ProductCafeDetailCard
          description={productById.metaTile}
          codeProduct={productById.codeProduct}
          isDeleted={productById.isDeleted}
          nameCategory={productById.nameCategory}
          price={productById.price}
          image={productById.image}
          shop={productById.shop}
          discount={productById.discount}
          quantity={productById.quantity}
          tile={productById.tile}
          priceDiscount={productById.priceDiscount}
        />
      </div>
    </div>
    </div>
  )
}
