import React,{useEffect, useState} from 'react'
import { useCart } from '../../context/CatContext'
import axios from 'axios'

const Products = () => {

    const [products, setProducts] = useState([])

    const getProducts = async () =>{
        try{
            const response = await axios.get('https://fakestoreapi.com/products')
            setProducts(response.data)
        } catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        getProducts()
    }, [])

    const {addToCart} = useCart()
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    {products.map((product,index) => {
        return(
            <div className="max-w-7xl w-full flex flex-row bg-white shadow-lg rounded-lg" key={index}>
      {/* Product Image */}
      <div className="w-1/2 rounded-xl">
        <img
          src={product.image}
          alt={product.title}
          className="rounded-l-lg w-100 h-100 object-cover p-8 rounded-lg"
        />
        {/* {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-sm rounded-md">
            {discount}% Off
          </div>
        )} */}
      </div>
  
      {/* Product Details */}
      <div className="w-1/2 p-6 flex flex-col justify-between">
        {/* Product Title and Info */}
        <div>
          <h5 className="text-2xl font-bold text-gray-800 mb-4">{tile}</h5>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Category:</strong> {nameCategory}
          </p>
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
  
          {/* Price Section */}
          <div className="flex items-center space-x-4 mb-4">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-semibold text-green-600">
                  ${priceDiscount}
                </span>
                <span className="text-sm line-through text-gray-500">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-gray-800">
                ${price}
              </span>
            )}
          </div>
  
          {/* Quantity Section */}
          <p className="text-sm text-gray-500 mb-4">
            {quantity > 0 ? (
              <span>In Stock: {quantity}</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
  
          {/* Shop Information */}
          <p className="text-sm text-gray-500">
            <strong>Shop:</strong> {shop}
          </p>
        </div>
  
        {/* Action Buttons */}
        <div className="flex justify-start gap-4 mt-6">
          {/* <Button onClick={()=>handleAddToCart()} gradientDuoTone="greenToBlue" disabled={quantity === 0}>
            Add to Cart
          </Button> */}
          <Button onClick={()=>addToCart(product)} gradientDuoTone="greenToBlue" disabled={quantity === 0}>
            Add to Cart
          </Button>
          <Button color="gray" disabled={quantity === 0}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
        )
    })}
  </div>
  )
}

export default Products
