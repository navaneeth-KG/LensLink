import './style.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './../../../components/Input/index';
import Select from './../../../components/Select/index';
import Button from './../../../components/Button/index';
import { getId } from './../../../utils/index';

const PgProfile = () => {
  const { id } = useParams();
  const [pg, setpg] = useState({});
  const [posts, setPosts] = useState([]);
  const [review, setreview] = useState({
    photographer: id,
    client: getId(),
    rating: 0,
    message: '',
  });
  const [view, setView] = useState(false);
  const [array, setArray] = useState([
    { name: '5', value: 5 },
    { name: '4', value: 4 },
    { name: '3', value: 3 },
    { name: '2', value: 2 },
    { name: '1', value: 1 },
  ]);

  const [rating,setRating]= useState()
  const navigate = useNavigate();
  const fetchPg = async () => {
    const response = await axios.get(
      `http://localhost:4999/photographer/${id}`
    );
    setpg(response.data);
  };
  const fetchPosts = async () => {
    const response = await axios.get(
      `http://localhost:4999/pg/post/photographer/${id}`
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
    await axios.post('http://localhost:4999/review', review);
    setView(false);
  };
  const ratingSelect = e => {
    setreview({ ...review, rating: Number(e.target.value) });
  };

  const onComment = e => {
    setreview({ ...review, message: e.target.value });
  };
  console.log(review);

  const fetchReviews =async()=>{
    const response = await axios.get(`http://localhost:4999/review/${id}`)
    console.log(response.data);
    const avgReview = response.data.map(item=>item.rating)
    console.log(avgReview);
    let sum = 0
    avgReview.forEach(item=>sum=sum+item)
    setRating(sum/avgReview.length)




  }

 

  const onLike = async id => {
    const response = await axios.patch(
      `http://localhost:4999/pg/post/${id}/like/${getId()}`
    );    
    fetchPosts();
    alert(response.data.message);
  };

  const onDisLike = async id => {
    const response = await axios.patch(
      `http://localhost:4999/pg/post/${id}/unlike/${getId()}`
    );    
    fetchPosts();
    alert(response.data.message);
  };
  useEffect(() => {
    fetchPg();
    fetchPosts();
    fetchReviews();
  }, []);

  return (
    <div className="user-pg-profile">
      <div className="user-pg-profile-header">
        <h1>{pg.name}</h1>
        <p>{pg.place}</p>
        <p>{pg.email}</p>
        <p><i class="fa-solid fa-star"></i>{rating}/5</p>
      </div>

      <button onClick={postReview}>post a review</button>
      <small onClick={()=>{navigate(`/user/pg-review/${id}`)}}>view all reviews</small>
      {view && (
        <ReviewModel
          onComment={onComment}
          array={array}
          ratingSelect={ratingSelect}
          ReviewPost={ReviewPost}
          setView={setView}
        />
      )}
      <div className="user-pg-profile-posts">
        {posts.length != 0 ? (
          posts.map(item => {
            return (
              <div
                className="post"
                style={{ backgroundImage: `url(${item.image})` ,position:'relative'}}
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
          })
        ) : (
          <p>no posts yet</p>
        )}
      </div>
    </div>
  );
};

export default PgProfile;

const ReviewModel = ({
  onComment,
  array,
  ReviewPost,
  ratingSelect,
  setView,
}) => {
  return (
    <div className="review-modal">
      <Input onChange={onComment} />
      <Select
        array={array}
        onChange={ratingSelect}
        placeholder="Select a rating"
      />
      <Button onClick={ReviewPost}>post</Button>
      <button
        onClick={() => {
          setView(false);
        }}
      >
        close
      </button>
    </div>
  );
};
