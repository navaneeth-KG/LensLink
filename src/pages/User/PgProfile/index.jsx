import './style.css';
import axios from '../../../utils/axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './../../../components/Input/index';
import Select from './../../../components/Select/index';
import Button from './../../../components/Button/index';
import { getId } from './../../../utils/index';
import Loading from '../../../components/Loading';

const PgProfile = () => {
  const { id } = useParams();
  const [pg, setpg] = useState({});
  const [posts, setPosts] = useState([]);
  const [review, setreview] = useState({
    photographer: id,
    client: getId(),
    rating: 0,
    message: '',
    service: '',
  });
  const [service, setService] = useState([]);
  const [view, setView] = useState(false);
  const [array, setArray] = useState([
    { name: '5', value: 5 },
    { name: '4', value: 4 },
    { name: '3', value: 3 },
    { name: '2', value: 2 },
    { name: '1', value: 1 },
  ]);

  const [rating, setRating] = useState();
  const navigate = useNavigate();
  const fetchPg = async () => {
    const response = await axios.get(
      `/photographer/${id}`
    );
    setpg(response.data);
    setService(
      response.data.service.map(item => {
        return { name: item.service.name, value: item.service._id };
      })
    );
  };
  console.log(pg);
  console.log(service);

  const fetchPosts = async () => {
    const response = await axios.get(
      `/pg/post/photographer/${id}`
    );
    setPosts(response.data);
  };
  const postReview = async () => {
    if (getId()) {
      setView(true);
    } else {
      alert('login to post review');
      navigate('/user/login');
    }
  };
  const ReviewPost = async () => {
    await axios.post('/review', review);
    setView(false);
  };
  const ratingSelect = e => {
    setreview({ ...review, rating: Number(e.target.value) });
  };

  const onComment = e => {
    setreview({ ...review, message: e.target.value });
  };
  console.log(review);

  const fetchReviews = async () => {
    const response = await axios.get(`/review/${id}`);
    console.log(response.data);
    const avgReview = response.data.map(item => item.rating);
    console.log(avgReview);
    let sum = 0;
    avgReview.forEach(item => (sum = sum + item));
    setRating(sum / avgReview.length);
  };

  // const onLike = async id => {
  //   const response = await axios.patch(
  //     `http://localhost:4999/pg/post/${id}/like/${getId()}`
  //   );
  //   fetchPosts();
  //   alert(response.data.message);
  // };

  // const onDisLike = async id => {
  //   const response = await axios.patch(
  //     `http://localhost:4999/pg/post/${id}/unlike/${getId()}`
  //   );
  //   fetchPosts();
  //   alert(response.data.message);
  // };
  const postLike = async postId => {
    const response = await axios.patch(
      `/pg/post/${postId}/like/${getId()}`
    );
    fetchPosts();
    if (!getId()) {
      alert('please login to like');
    }
  };
  const postDislike = async postId => {
    const response = await axios.patch(
      `/pg/post/${postId}/unlike/${getId()}`
    );
    fetchPosts();
  };
  const serviceSelect = e => {
    setreview({ ...review, service: e.target.value });
  };
  useEffect(() => {
    fetchPg();
    fetchPosts();
    fetchReviews();
  }, []);

  return (
    <>
      {pg.place ? (
        <div className="user-pg-profile">
          <div className="user-pg-profile-header">
            <div className="left-side">
              {' '}
              <h1>{pg.name}</h1>
              <p>{pg.place.name}</p>
              <p>
                <i class="fa-solid fa-star"></i>
                {rating && rating.toFixed(2)}/5
              </p>
            </div>
            <div className="right-side">
             
              <Button
                onClick={() => {
                  navigate(`/user/pgprofile/book/${id}`);
                }}
              >
                Book
              </Button>{' '}
              <button onClick={postReview} style={{cursor:'pointer'}}>post a review</button>
              <small
              style={{cursor:'pointer'}}
                onClick={() => {
                  navigate(`/user/pg-review/${id}`);
                }}
              >
                view all reviews
              </small>
            </div>
          </div>

          {view && (
            <ReviewModel
              onComment={onComment}
              array={array}
              ratingSelect={ratingSelect}
              ReviewPost={ReviewPost}
              setView={setView}
              service={service}
              serviceSelect={serviceSelect}
            />
          )}
          <div className="user-pg-profile-posts">
            {posts.length != 0 ? (
              posts.map(item => {
                return (
                  <div
                    className="post"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      position: 'relative',
                    }}
                  >
                    <div className="like-container">
                      {' '}
                      {item.likes.likedPeople.includes(getId()) ? (
                        <i
                          class="fa-solid fa-heart"
                          style={{ color: 'red' }}
                          onClick={() => {
                            postDislike(item._id);
                          }}
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PgProfile;

const ReviewModel = ({
  onComment,
  array,
  ReviewPost,
  ratingSelect,
  setView,
  service,
  serviceSelect,
}) => {
  return (
    <div className="review-modal">
      <Input onChange={onComment}  placeholder='type comment'/>
      <Select
        array={array}
        onChange={ratingSelect}
        placeholder="Select a rating"
      />
      <Select
        array={service}
        onChange={serviceSelect}
        placeholder="Select service "
      />
      <Button onClick={ReviewPost} >post</Button>
      <button
      style={{width:'100px'}}
        onClick={() => {
          setView(false);
        }}
      >
        close
      </button>
    </div>
  );
};
