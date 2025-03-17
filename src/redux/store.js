import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import countSlice from "./feature/countSlice";
import productReducer from "./feature/product/productSlice";
import customerSlice from "./feature/customer/customerSlice";
import staffTypeSlice from "./feature/staff/StaffTypeSlice";
import addToCartSlice from "./addToCart/addToCartSlice";
import userSlice from "./feature/user/UserSlice";
import productCaffeeSlice from "./feature/productCaffee/productCaffeeSlice";
import categorySlice from "./feature/categoryCafe/categoryCafeSlice";
import addToCartCafeSlice from "./feature/productCaffee/addTocartCafeSlice";
import  paymentCaffeeSlice  from "./feature/productCaffee/paymentCafeSlice";

// Persist Config for cartCafe slice
const cartCafePersistConfig = {
  key: "cartCafe",
  storage,
};

const persistedCartCafeReducer = persistReducer(cartCafePersistConfig, addToCartCafeSlice);

// Create Store
export const store = configureStore({
  reducer: {
    counter: countSlice,
    product: productReducer,
    customer: customerSlice,
    staffTypes: staffTypeSlice,
    cart: addToCartSlice,
    user: userSlice,
    productCaffees: productCaffeeSlice,
    categorys: categorySlice,
    cartCafe: persistedCartCafeReducer, // Use persisted reducer for cartCafe
    paymentCaffee: paymentCaffeeSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
