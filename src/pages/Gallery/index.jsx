import React, { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const {id}=useParams()
  const fetchPosts = async () => {
    const response = await axios.get(
      `http://localhost:4999/pg/post/service/${id}`
    );
    response.data.sort((a, b) => {
      return b.likes.count - a.likes.count;
    });
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="gallery-container">
      {posts.map(item => {
        return (
          <div
            className="gallery-image"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              width: '200px',
              height: '200px',
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Gallery;
