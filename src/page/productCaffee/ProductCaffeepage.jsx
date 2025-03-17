import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetprodcutCaffee, selectAllProductCaffee } from '../../redux/feature/productCaffee/productCaffeeSlice';
import CaffeeCard from '../../components/productCaffeeComponets/CaffeeCard';



export default function ProductCaffeepage() {
  const dispatch = useDispatch();
  const productCaffee = useSelector(selectAllProductCaffee);

  useEffect(() => {
    dispatch(fetprodcutCaffee());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 m-10">
      
  {productCaffee && Array.isArray(productCaffee) && productCaffee.length > 0 ? (
    productCaffee.map((product, index) => (
      <div
        key={index}
        className="transform transition duration-500 hover:scale-105 hover:shadow-lg"
      >
        <CaffeeCard
          codeProduct={product.codeProduct}
          description={product.metaTile}
          isDeleted={product.isDeleted}
          nameCategory={product.nameCategory}
          price={product.price}
          image={product.image}
          shop={product.shop}
          discount={product.discount}
          quantity={product.quantity}
          tile={product.tile}
          priceDiscount={product.priceDiscount}
        />
      </div>
    ))
  ) : (
    <p className="text-center text-coffee-dark">No products available.</p>
  )}
</div>

  );
}
