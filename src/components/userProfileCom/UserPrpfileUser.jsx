import React from 'react';
import { Link } from 'react-router-dom';

export default function UserProfile({
  codeUser,
  email,
  firstName,
  gender,
  isBlocked,
  isDeleted,
  isVerified,
  lastName,
  middleName,
  mobilePhone,
  phoneNumber,
  profilePicture,
})

 {
  console.log("profilePicture", profilePicture)
  return (
    <div className='flex items-center justify-center mt-10 p-6 bg-gray-100 min-h-screen'>
      <div className='flex flex-col md:flex-row w-full max-w-5xl p-6 bg-white rounded-2xl shadow-xl'>
        {/* Left Section: Profile Display */}
        <div className='w-full md:w-1/3 p-6 bg-blue-600 rounded-l-2xl shadow-md flex flex-col items-center text-white'>
          <img
            className='w-32 h-32 rounded-full border-4 border-white mb-4'
            src={`http://${profilePicture}`}
            alt='Profile Picture'
          />
          <h4 className='text-2xl font-semibold mb-2'>{`${firstName || "NA"}  ${lastName || "NA"}`}</h4>
          <h3>{middleName || "NA"}</h3>
          <p className='text-gray-200 text-sm'>User ID: {codeUser || "NA"}</p>
        </div>

        {/* Right Section: User Details Display */}
        <div className='w-full md:w-2/3 p-10 bg-white rounded-r-2xl shadow-md'>
          <h2 className='text-3xl font-bold text-center text-gray-700 mb-6'>User Profile</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='p-4 bg-gray-50 rounded-lg shadow-sm'><strong>First Name:</strong> {firstName || "NA"}</div>
            <div className='p-4 bg-gray-50 rounded-lg shadow-sm'><strong>Last Name:</strong> {lastName || "NA"}</div>
            <div className='p-4 bg-gray-50 rounded-lg shadow-sm'><strong>Email:</strong> {email || "NA"}</div>
            <div className='p-4 bg-gray-50 rounded-lg shadow-sm'><strong>Mobile Phone:</strong> {mobilePhone}</div>
            <div className='p-4 bg-gray-50 rounded-lg shadow-sm'><strong>Phone Number:</strong> {phoneNumber || "NA"}</div>
            <div className='p-4 bg-gray-50 rounded-lg shadow-sm'><strong>Gender:</strong> {gender}</div>
            <div className='p-4 bg-gray-50 rounded-lg shadow-sm'><strong>Verified:</strong> {isVerified ? 'Yes' : 'No'}</div>
            <div className='p-4 bg-gray-50 rounded-lg shadow-sm'><strong>Blocked:</strong> {isBlocked ? 'Yes' : 'No'}</div>
            <div className='p-4 bg-gray-50 rounded-lg shadow-sm'><strong>Deleted:</strong> {isDeleted ? 'Yes' : 'No'}</div>
          </div>
          <div className='flex justify-center mt-6'>
            <Link to = "/userUpdateProfile" >
              <button className='px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'>
                Update Profile
              </button>
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
}
 