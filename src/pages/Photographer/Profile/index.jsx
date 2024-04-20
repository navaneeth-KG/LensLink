import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../../components/Loading';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import { getId } from '../../../utils';
import './style.css';

const Profile = () => {
  const [pg, setPg] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, SetIsOpen] = useState(false);
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
      ` http://localhost:4999/photographer/${getId()}`
    );
    setPg(response.data);
    setLoading(false);
  };

  const fetchData2 = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:4999/pg/post/photographer/${getId()}`
    );
    setPosts(response.data);
    setLoading(false);
  };
  const fetchService = async () => {
    const response = await axios.get(`http://localhost:4999/service/`);
    setCategory(
      response.data.map(item => {
        return { name: item.name, value: item._id };
      })
    );
  };
  const onPost = async () => {
    const response = await axios.post('http://localhost:4999/pg/post', post);
    console.log(response);
    fetchData2();
    SetIsOpen(false);
  };

  const onLike = async id => {
    const response = await axios.patch(
      `http://localhost:4999/pg/post/${id}/like/${getId()}`
    );

    fetchData2();
    alert(response.data.message);
  };

  const onDisLike = async id => {
    const response = await axios.patch(
      `http://localhost:4999/pg/post/${id}/unlike/${getId()}`
    );

    fetchData2();
    alert(response.data.message);
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
          <p>{pg.name}</p>
          <p>{pg.email}</p>
          <p>{pg.place}</p>
          <div className="service-cont">
            {pg.service&&pg.service.map(item => {
              return <div className="service-card" >{item.service.name}</div>;
            })}
          </div>

          <Button
            className="post-btn"
            onClick={() => {
              SetIsOpen(true);
            }}
          >
            post a photo
          </Button>
          {isOpen && (
            <div className="modal-container">
              <Modal
                className="post-modal"
                onClick={() => {
                  SetIsOpen(false);
                }}
                post={post}
                setPost={setPost}
                onPost={onPost}
                category={category}
              />
            </div>
          )}

          <div className="posts-container">
            {posts.map(item => {
              return (
                <div
                  key={item._id}
                  className="post-image"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    position: 'relative',
                  }}
                >
                  <p
                    style={{
                      color: 'red',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  >
                    {item.likes.count ? item.likes.count : '0'}
                  </p>
                  <i
                    class="fa-solid fa-thumbs-up"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      onLike(item._id);
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-thumbs-down"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      onDisLike(item._id);
                    }}
                  ></i>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
