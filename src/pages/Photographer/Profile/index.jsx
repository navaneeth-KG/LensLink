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
  });

  const [posts, setPosts] = useState([]);

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
  const onPost = async () => {
    const response = await axios.post('http://localhost:4999/pg/post', post);
    console.log(response);
    fetchData2()
    SetIsOpen(false)
  };
  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);
 console.log(posts);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="pg-profile">
          <p>{pg.name}</p>
          <p>{pg.email}</p>
          <p>{pg.place}</p>
          <div className="service-cont">
            {pg.service.map(item => (
              <div className="service-card">{item.service}</div>
            ))}
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
               
                
              />
            </div>
          )}

          <div className="posts-container">
            {posts.map(item => {
              return (
                <div
                key={item._id}
                  className="post-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                ></div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
