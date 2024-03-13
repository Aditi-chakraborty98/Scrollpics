import axios from 'axios';

const Key = 'qafpn-wxhf7qNZ99OmbSwW4rIsryNd3YejrNKyxx72o';


const fetchImages = async (page) => {
  try {
    // Add a delay of 500 milliseconds before making the request
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await axios.get(`https://api.unsplash.com/photos/?page=${page}&client_id=${Key}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export { fetchImages };
