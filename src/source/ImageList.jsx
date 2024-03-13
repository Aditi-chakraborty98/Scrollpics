import React, { useState, useEffect, useCallback } from 'react';
import { fetchImages } from '../FetchImg';

const ImageList = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const newImages = await fetchImages(page);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching images:', error.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const handleScroll = useCallback(() => {
     
      if (!loading) {
        fetchData();
      }
    
  }, [loading, fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  useEffect(() => {
    const handleScrollCallback = () => {
      handleScroll();
    };
  
    window.addEventListener('scroll', handleScrollCallback);
  
    
  }, [handleScroll]);
  

  useEffect(() => {
    const container = document.getElementById('imageContainer');
    images.forEach((image, index) => {
      const img = document.createElement('img');
      img.src = image.urls.small;
      img.alt = image.alt_description;
      img.style.margin = '10px';
      img.style.width = '297px';
      img.style.height = '200px';
      container.appendChild(img);
    });
  }, [images]);

  return (
    <div>
      <h1>Unsplash Infinite Scroll</h1>

      
      <div id="imageContainer" style={{ display: 'flex', flexWrap: 'wrap' }}></div>
    <div>

        <img scr=""></img>
    </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ImageList;
