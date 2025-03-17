import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectAllCustomers } from '../redux/feature/customer/customerSlice';
import { fetchCustomers } from '../redux/feature/customer/customerSlice';

export default function Customer() {

    const dispatch=useDispatch();

    const customers = useSelector(selectAllCustomers)

    useEffect(() => {
        dispatch(fetchCustomers());
    },[])

    console.log("customers:", customers)



  return (
    <div>Customer</div>
  )
}
