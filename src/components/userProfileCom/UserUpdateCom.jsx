import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, selectUserStatus, selectUserError } from "../../redux/feature/user/UserSlice";

export default function UserUpdateCom({
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
}) {
  const dispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);

  const [formData, setFormData] = useState({
    codeUser,
    firstName,
    lastName,
    middleName,
    email,
    mobilePhone,
    phoneNumber,
    gender,
    isBlocked,
    isDeleted,
    isVerified,
    profilePicture: profilePicture || "https://via.placeholder.com/150",
  });

  const [imagePreview, setImagePreview] = useState(formData.profilePicture);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:8080/api/v1/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      console.log("Upload response:", data); // Debugging log
  
      if (!response.ok) throw new Error(`Upload failed: ${response.statusText}`);
  
      return data.uri || null; // Use `uri` from backend response
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let uploadedImageUrl = formData.profilePicture;
  
    // If a new image is selected, upload it
    if (selectedFile) {
      const uploadedUrl = await uploadImage(selectedFile);
      if (uploadedUrl) {
        uploadedImageUrl = uploadedUrl;
      } else {
        console.error("Image upload failed!");
        return;
      }
    }
  
    const updatedData = { ...formData, profilePicture: uploadedImageUrl };
  
    if (formData.codeUser && formData.codeUser !== "NA") {
      dispatch(updateUserProfile({ codeUser: formData.codeUser, userData: updatedData }));
    } else {
      console.error("Error: codeUser is missing or invalid.");
    }
  };
  

  return (
    <div className="flex items-center justify-center mt-10 p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col w-full max-w-4xl p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Update Profile</h2>

        {status === "pending" && <p className="text-blue-500 text-center">Updating...</p>}
        {status === "fulfilled" && <p className="text-green-500 text-center">Update Successful!</p>}
        {status === "rejected" && <p className="text-red-500 text-center">{error?.error || "An unknown error occurred"}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Code User</label>
            <input type="text" name="codeUser" value={formData.codeUser} readOnly className="w-full p-3 border rounded-lg bg-gray-200" />
          </div>
          <div>
            <label className="block text-gray-700">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Middle Name</label>
            <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Mobile Phone</label>
            <input type="text" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          </div>

          {/* Keep Verified, Blocked, and Deleted fields unchanged */}
          {/* <div>
            <label className="block text-gray-700">Verified</label>
            <input type="text" name="isVerified" value={formData.isVerified} readOnly className="w-full p-3 border rounded-lg bg-gray-200" />
          </div>
          <div>
            <label className="block text-gray-700">Blocked</label>
            <input type="text" name="isBlocked" value={formData.isBlocked} readOnly className="w-full p-3 border rounded-lg bg-gray-200" />
          </div>
          <div>
            <label className="block text-gray-700">Deleted</label>
            <input type="text" name="isDeleted" value={formData.isDeleted} readOnly className="w-full p-3 border rounded-lg bg-gray-200" />
          </div> */}

          {/* Image Upload */}
          <div className="col-span-2 flex flex-col items-center">
            <label className="block text-gray-700">Profile Picture</label>
            <img src={`http://${imagePreview}`} alt="Profile Preview" className="w-32 h-32 rounded-full shadow-md mb-3" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border rounded-lg" />
          </div>

          <div className="col-span-2 flex justify-center mt-4">
            <button type="submit" className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
