import React from 'react'
import UserPrpfileUser from '../../components/userProfileCom/UserPrpfileUser'
import { useSelector } from 'react-redux'
import { selectUserBytoken ,fetchgetUsers} from '../../redux/feature/user/UserSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export default function UserProfilePage() {

  
  const dispatch = useDispatch();
  const getUserProfile = useSelector(selectUserBytoken);
  //const userStatus = useSelector((state) => state.user.status);  // Correct access of status
  
  useEffect(() => {
    dispatch(fetchgetUsers());
  }, [dispatch]);
  //console.log("User profile data:", getUserProfile);  // Log after data is updated

  useEffect(() => {
    //console.log("User profile data:", getUserProfile);  // Log after data is updated
  }, [getUserProfile]); // This ensures you log the updated profile data once it's fetched

  return (
    <div>
      <UserPrpfileUser 
      codeUser={getUserProfile.codeUser}
      email={getUserProfile.email}
      firstName={getUserProfile.firstName}
      gender={getUserProfile.gender}
      isBlocked={getUserProfile.isBlocked}
      isDeleted={getUserProfile.isDeleted}
      isVerified={getUserProfile.isVerified}
      lastName={getUserProfile.lastName}
      middleName={getUserProfile.middleName}
      mobilePhone={getUserProfile.mobilePhone}
      phoneNumber={getUserProfile.phoneNumber}
      profilePicture={getUserProfile.profilePicture}
      />
    </div>
  )
}
