import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { decrement, decrementByAmount, increment, incrementByAmount, selectIdValue } from '../redux/feature/countSlice';

export default function Counter() {
    const dispatch = useDispatch();
    const [amount, setamount] = useState(10);

    const count = useSelector((state) => state.counter.value);
    //console.log("count:", count);

    const count1 = useSelector(selectIdValue);
   // console.log("count1:", count1);
  return (
    <div>
      <div>
        <h1 className=" text-3xl text-blue-800 text-center font-bold mt-5">
          hello sunly aly
        </h1>

        <h2 className=" text-3xl text-blue-800 text-center font-bold mt-5">
          Count: {count}
        </h2>
        <div className="text-3xl text-blue-800 text-center font-bold mt-5 space-x-4">
          <button
            onClick={() => dispatch(increment())}
            className="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Count +1
          </button>
          <button
            onClick={() => dispatch(incrementByAmount(amount))}
            className="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Count +10
          </button>
          <button
            onClick={() => dispatch(decrement())}
            className="px-4 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Increment -1
          </button>
          <button
            onClick={() => dispatch(decrementByAmount(amount))}
            className="px-4 py-2 text-sm text-white bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Increment -10
          </button>
        </div>
      </div>
    </div>
  );
}
