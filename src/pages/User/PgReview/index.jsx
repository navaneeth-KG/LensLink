import './style.css';
import axios from '../../../utils/axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';

const PgReview = () => {
  const [reviews, setreviews] = useState([]);
  const { id } = useParams();

  const fetchReviews = async () => {
    const response = await axios.get(`/review/${id}`);
    setreviews(response.data);
  };
  console.log(reviews);
  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <>
      {reviews.length != 0 ? (
        <div className="pg-review">
          {reviews.map(item => {
            return (
              <div className="review-cont">
                <StarView rating={item.rating} />
                <p>{item.message}</p>
                <p>service: {item.service&&item.service.name}</p>
                <p style={{fontSize:'12px'}}>posted by:{item.client.name}</p>
                <p></p>
              </div>
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

const StarView = ({ rating }) => {
  let arr = [];
  for (var i = 0; i < rating; i++) {
    arr.push(<i class="fa-solid fa-star"></i>);
  }
  return arr;
};

export default PgReview;
