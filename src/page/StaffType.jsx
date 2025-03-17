import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { selectAllStaffType } from '../redux/feature/staff/StaffTypeSlice';
import { fetstaffType } from '../redux/feature/staff/StaffTypeSlice';
import StaffTpeCard from '../components/staffType/StaffTpeCard';


export default function StaffType() {
    
    const dispatch=useDispatch();
    const staffTyhpe= useSelector(selectAllStaffType)

    useEffect(()=>{
        dispatch(fetstaffType());
    }, [])
    console.log("staffType:", staffTyhpe)


  return (
    <div>
        <h1>this is page staffType</h1>
            <div>
                {Array.isArray(staffTyhpe) && staffTyhpe.length > 0 ? (
                    staffTyhpe.map((staffType, index) => (
                        <StaffTpeCard
                            key={index}
                            id={staffType.codeProduct}
                            description={staffType.metaTile}
                            isDeleted={staffType.isDeleted}
                            nameCategory={staffType.nameCategory}
                        />
                    ))
                ) : (
                    <p>No staff types available.</p>
                )}
            </div>
    </div>
  )
}
