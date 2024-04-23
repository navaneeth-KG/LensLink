import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';


const PostModal = ({ post, setState }) => {
  const navigate = useNavigate();


  return (
    <div className="post-modal">
      <i
        class="fa-solid fa-xmark"
        style={{
          position: 'absolute',
          left: '10px',
          top: '50px',
          color: 'white',
          fontSize: '30px',
          cursor: 'pointer',
        }}
        onClick={() => {
          setState(false);
        }}
      ></i>

      <div
        className="image-container"
        style={{
          backgroundImage: post.image ? `url(${post.image})` : '',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <p>posted by:{post.photographer.name}</p>
        <p
          onClick={() => {
            navigate(`/user/pgprofile/${post.photographer._id}`);
          }}
        >
          view profile
        </p>
            <i
              class="fa-solid fa-heart"
              style={{ color: 'red', background: 'white' }}
            ></i>
            <p style={{ display: 'inline', background: 'white' }}>
              {post.likes.count}
            </p>
       
      </div>
    </div>
  );
};

export default PostModal;
