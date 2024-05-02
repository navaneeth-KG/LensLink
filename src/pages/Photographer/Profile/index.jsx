import { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { getId } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Profile = () => {
  const [pg, setPg] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, SetIsOpen] = useState(false);
  const navigate = useNavigate();
  const [post, setPost] = useState({
    image: '',
    caption: '',
    photographer: getId(),
    likes: {
      count: 0,
    },
    category: '',
  });

  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      `/photographer/${getId()}`
    );
    setPg(response.data);
    setLoading(false);
  };

  const fetchData2 = async () => {
    setLoading(true);
    const response = await axios.get(
      `/pg/post/photographer/${getId()}`
    );
    setPosts(response.data);
    setLoading(false);
  };
  const fetchService = async () => {
    const response = await axios.get(`/service/`);
    setCategory(
      response.data.map(item => {
        return { name: item.name, value: item._id };
      })
    );
  };
  const onPost = async () => {
    const response = await axios.post('/pg/post', post);
    console.log(response);
    fetchData2();
    SetIsOpen(false);
  };

  const postLike = async postId => {
    const response = await axios.patch(
      `/pg/post/${postId}/like/${getId()}`
    );
    fetchData2();
  };
  const postDislike = async postId => {
    const response = await axios.patch(
      `/pg/post/${postId}/unlike/${getId()}`
    );
    fetchData2();
  };
  useEffect(() => {
    fetchData();
    fetchData2();
    fetchService();
  }, []);
  // console.log(posts);
  // console.log(post);
  console.log(pg);
  return (
    <>
      {!pg ? (
        <Loading />
      ) : (
        <div className="pg-profile">
          <h2>{pg.name}</h2>
          <p>{pg.email}</p>
          {pg.place && <p>{pg.place.name}</p>}
          <div className="service-cont">
            {pg.service &&
              pg.service.map(item => {
                return <div className="service-card">{item.service.name}</div>;
              })}
          </div>
          <button
            onClick={() => {
              navigate(`/photographer/profile/edit/${getId()}`);
            }}
          >
            edit profile
          </button>
          <div className="modal-container">
            {' '}
            {isOpen && (
              <Modal
                onClick={() => {
                  SetIsOpen(false);
                }}
                post={post}
                setPost={setPost}
                onPost={onPost}
                category={category}
              />
            )}
          </div>

          <Button
            className="post-btn"
            onClick={() => {
              SetIsOpen(true);
            }}
          >
            post a photo
          </Button>

          <div className="posts-box">
            {posts.length != 0 ? (
              posts.map(item => {
                return (
                  <div
                    key={item._id}
                    className="post-image"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      position: 'relative',
                    }}
                  >
                    <div className="like-container">
                      {item.likes.likedPeople.includes(getId()) ? (
                        <i
                          class="fa-solid fa-heart"
                          onClick={() => {
                            postDislike(item._id);
                          }}
                          style={{ color: 'red' }}
                        ></i>
                      ) : (
                        <i
                          class="fa-regular fa-heart"
                          onClick={() => {
                            postLike(item._id);
                          }}
                        ></i>
                      )}
                      <p style={{ display: 'inline' }}>{item.likes.count}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>no posts yet</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
