import axios from 'axios';

export const uploadImage = async (imageFile) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append('file', imageFile);
    imageFormData.append('upload_preset', 'Preset_react');

    const response = await axios.post('https://api.cloudinary.com/v1_1/dwnhr8bue/image/upload', imageFormData);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};