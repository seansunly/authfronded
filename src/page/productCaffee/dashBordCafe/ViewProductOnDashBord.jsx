import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ViewProductCardDashBord from '../../../components/productCaffeeComponets/ViewProductCardDashBord'
import { fetchProductCafeById, selectproductCaffeeById } from '../../../redux/feature/productCaffee/productCaffeeSlice'

export default function ViewProductOnDashBord() {
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
    <div className=' justify-center'>
      <ViewProductCardDashBord 

            tile={productById.tile}
            codeProduct={productById.codeProduct}
            isDeleted={productById.isDeleted}
            nameCategory={productById.nameCategory}
            price={productById.price}
            image={productById.image}
            shop={productById.shop}
            discount={productById.discount}
            quantity={productById.quantity}
            content={productById.content}
            metaTile={productById.metaTile}
            slug={productById.slug}
            endDate={productById.endDate}
            createAt={productById.createAt}
            updateAt={productById.updateAt}
            startDate={productById.startDate}
            haveNotInStock={productById.haveNotInStock}
            isDeletedCategory={productById.isDeletedCategory}
            priceDiscount={productById.priceDiscount}
      />
    </div>
  )
}
