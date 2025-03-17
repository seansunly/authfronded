import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategoryCafeById, selectCategoryById } from '../../redux/feature/categoryCafe/categoryCafeSlice';
import CartCategoryCardDashBord from '../../components/categoryComponts/CartCategoryCardDashBord';

export default function ViewCategoryPage() {
  const dispatch = useDispatch() ;
    const param =useParams();
    console.log("test params: ", param.codeCategory)

    const categoryId= useSelector(selectCategoryById)
    console.log("productById:", categoryId)
    
    useEffect(()=>{
      dispatch(fetchCategoryCafeById(param.codeCategory)) // replace 1 with the actual product id  //
  },[])
  //console.log("productById:", productById.price)

  return (
    <div className=' justify-center'>
      <CartCategoryCardDashBord 
      title={categoryId.title}
      codeCategory={categoryId.codeCategory}
      metaTile={categoryId.metaTile}
      slug={categoryId.slug}
      text={categoryId.text}
      isDeleted={categoryId.isDeleted}

      />
    </div>
  )
}
