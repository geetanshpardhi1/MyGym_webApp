import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../api/axiosInstance';
import { fetchProfileData, setProfileData, updateProfileData } from '../../../store/features/profileSlice';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profileData);
  const [formData, setFormData] = useState({
    date_of_birth: '',
    gender: '',
    phone_number: '',
    address: '',
    height: '',
    weight: '',
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        date_of_birth: profile.date_of_birth || '',
        gender: profile.gender || '',
        phone_number: profile.phone_number || '',
        address: profile.address || '',
        height: profile.height || '',
        weight: profile.weight || '',
      });
      setProfilePicture(profile.profile_picture || null); 
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file)); 
    } else {
      setProfilePicture(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        updatedData.append(key, formData[key]);
      }
    }
    
    if (e.target.profile_picture.files[0]) {
      updatedData.append('profile_picture', e.target.profile_picture.files[0]); 
    }

    try {
      const response = await api.patch('/users/profile/', updatedData);
      dispatch(updateProfileData(response.data)); 
      dispatch(setProfileData(response.data))
      setMessage('Profile updated successfully!');
      if (response.data.profile_picture) {
        setProfilePicture(response.data.profile_picture);
      }
    } catch (error) {
      console.error('Error updating profile:', error.response ? error.response.data : error.message);
      setMessage('Failed to update profile.');
    }
  };

  const handleRemovePicture = async () => {
    try {
      await api.delete('/users/remove-profile-picture/');
      setProfilePicture(null);
      setMessage('Profile picture removed successfully!');
    } catch (error) {
      console.error('Error removing profile picture:', error);
      setMessage('Failed to remove profile picture.');
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl dark:bg-gray-600 dark:text-gray-300 flex-1 flex flex-col gap-5">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      
      <div className="flex justify-center mb-4">
        {profilePicture ? (
          <div className="relative">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              onClick={handleRemovePicture}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ✖
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            <p className='dark:text-gray-600'>No Image</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Profile Picture</label>
          <input
            type="file"
            name="profile_picture"
            accept="image/*"
            onChange={handlePictureChange}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter address"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter height"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-600 dark:text-gray-300"
            placeholder="Enter weight"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
          {message}
        </p>
      )}
    </div>
  );
};

export default UpdateProfile;
