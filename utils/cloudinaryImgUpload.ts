export const cloudinaryImgUpload = async (fileInput: FileList) => {
  const formData = new FormData();

  const files = Array.from(fileInput);

  for (const file of files) {
    formData.append('file', file);
  }

  formData.append('upload_preset', 'mdp-upload');

  const data = await fetch(
    'https://api.cloudinary.com/v1_1/divg4kqqk/image/upload',
    {
      method: 'POST',
      body: formData,
    }
  ).then((res) => res.json());

  return data.secure_url;
};
