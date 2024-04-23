import './style.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ServicePage = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [pgs, setPgs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [top3Photographers, setTop3Photographers] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchService = async () => {
    const response = await axios.get(`http://localhost:4999/service/${id}`);
    setService(response.data);
  };

  const fetchPhotographers = async () => {
    const response = await axios.get(
      `http://localhost:4999/photographer/service/${id}`
    );
    console.log(response.data);
    setPgs(response.data);
  };
  const fetchreviews = async () => {
    const response = await axios.get(
      `http://localhost:4999/review/service/${id}`
    );
    console.log(response.data);
    setReviews(response.data);
  };

  const fetchtop3pgs = () => {
    const groupedReviews = {};
    reviews.forEach(review => {
      const photographerId = review.photographer._id;
      if (!groupedReviews[photographerId]) {
        groupedReviews[photographerId] = [];
      }
      groupedReviews[photographerId].push(review);
    });

    console.log(groupedReviews);

    const averageRatings = [];
    for (const photographerId in groupedReviews) {
      const reviewsForPhotographer = groupedReviews[photographerId];
      const totalRatings = reviewsForPhotographer.reduce(
        (acc, cur) => acc + cur.rating,
        0
      );
      const averageRating = totalRatings / reviewsForPhotographer.length;
      averageRatings.push({
        pgarray: [...groupedReviews[photographerId]],
        averageRating,
      });
    }

    averageRatings.sort((a, b) => b.averageRating - a.averageRating);

    const top3 = averageRatings.slice(0, 5);
    return top3;
  };

  const fetchPosts = async () => {
    const response = await axios.get(
      `http://localhost:4999/pg/post/service/${id}`
    );
    response.data.sort((a, b) => {
      return b.likes.count - a.likes.count;
    });
    const slicedPosts = response.data.slice(0, 6);
    setPosts(slicedPosts);
    // setPosts(response.data)
  };
  // console.log(top3Photographers);
  console.log(posts);


  useEffect(() => {
    fetchService();
    fetchPhotographers();
    fetchreviews();
    fetchPosts();
  }, []);
  useEffect(() => {
    setTop3Photographers(
      fetchtop3pgs().map(item => {
        return {
          pg: item.pgarray[0].photographer,
          avgRating: item.averageRating,
        };
      })
    );
  }, [reviews]);
  return (
    <div className="service-page">
      <div
        className="header"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <h1 style={{ fontSize: '60px' }}>{service.name}</h1>
      </div>
      <h2
      // onClick={() => {
      //   setTop3Photographers(
      //     fetchtop3pgs().map(item => {
      //       return {
      //         pg: item.pgarray[0].photographer,
      //         avgRating: item.averageRating,
      //       };
      //     })
      //   );
      // }}
      >
        top rated photographers in {service.name}
      </h2>
      <div className="top-3">
        {top3Photographers!=0?top3Photographers.map(item => {
          return (
            <div className="top3-card">
              <h1>{item.pg.name}</h1>
              <p>rating:{item.avgRating}</p>
              <p
                onClick={() => {
                  navigate(`/user/pgprofile/${item.pg._id}`);
                }}
              >
                view profile
              </p>
            </div>
          );
        }):<p style={{color:'white',textAlign:'center'}}>no photographers rated in this category</p>}
      </div>

{      <button   onClick={() => {
          navigate(`/service/details/pglist/${id}`);
        }}>view all</button>}
      <h2>Gallery</h2>
      <div className="gallery">
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
            ><i class="fa-solid fa-heart" style={{color:'red'}}></i><p style={{display:'inline',background:'white'}}>{item.likes.count}</p></div>
          );
        }):<p style={{color:'white'}}>no photos to show</p>}
      </div>
    { posts.length==6?( <button
        onClick={() => {
          navigate(`/service/details/gallery/${id}`);
        }}
      >
        view all
      </button>):''}
    </div>
  );
};

export default ServicePage;
