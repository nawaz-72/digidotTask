export const getImageURL = async (file: File) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", file);
  
    const response = await fetch(`https://api.imgbb.com/1/upload?key=80d33b8c894e6cdf10b9d4d3f3fe9191`, {
      method: "POST",
      body: formData,
    });
  
    const result = await response.json();
    if (result.success) {
      return result.data.url; // The URL of the uploaded image
    } else {
      throw new Error(result.error.message);
    }
  };