import React, { useEffect, useState } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import PostModal from '../../components/PostModal';
import axios from 'axios';
import { getId } from './../../utils/index';
import Footer from './../../components/Footer/index';
import Loading from '../../components/Loading';

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const [state, setState] = useState(false);
  const [post, setPost] = useState({});
  const fetchPosts = async () => {
    const response = await axios.get(
      `http://localhost:4999/pg/post/service/${id}`
    );
    // response.data.sort((a, b) => {
    //   return b.likes.count - a.likes.count;
    // });
    setPosts(response.data);
  };
  const handleDivClick = (e, item) => {
    if (e.target.classList.contains('fa-heart')) {
      return;
    }
    setState(true);
    setPost(item);
  };
  const postLike = async postId => {
    const response = await axios.patch(
      `http://localhost:4999/pg/post/${postId}/like/${getId()}`
    );
    fetchPosts();
  };
  const postDislike = async postId => {
    const response = await axios.patch(
      `http://localhost:4999/pg/post/${postId}/unlike/${getId()}`
    );
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      {posts.length != 0 ? (
        <>
        <div className="gallery-container">
          {state ? <PostModal post={post} setState={setState} /> : ''}
          {posts.length!=0?posts.map(item => {
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
                onClick={e => {
                  handleDivClick(e, item);
                }}
              >
                <div className="like-container">
                {item.likes.likedPeople.includes(getId()) ? (
                  <i
                    class="fa-solid fa-heart"
                    onClick={() => {
                      postDislike(item._id);
                    }}
                    style={{ color: 'red'}}
                  ></i>
                ) : (
                  <i
                    class="fa-regular fa-heart"
                    onClick={() => {
                      postLike(item._id);
                    }}
                  ></i>
                )}
                <p style={{ display: 'inline'}}>
                  {item.likes.count}
                </p></div>
              </div>
            );
          }):<p>no posts yet</p>}
          
        </div>
        <Footer />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Gallery;
