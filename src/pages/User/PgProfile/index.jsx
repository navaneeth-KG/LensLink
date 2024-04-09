import './style.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PgProfile = () => {
  const { id } = useParams();
  const [pg, setpg] = useState({});
  const [posts,setPosts]=useState([])

  const fetchPg = async () => {
    const response = await axios.get(
      `http://localhost:4999/photographer/${id}`
    );
    setpg(response.data);
  };
  const fetchPosts=async()=>{
    const response = await axios.get( `http://localhost:4999/pg/post/photographer/${id}`)
    setPosts(response.data)

  }

  useEffect(() => {
    fetchPg();
    fetchPosts();
  }, []);

  return (

    <div className="user-pg-profile">
      <div className="user-pg-profile-header">
     
        <h1>{pg.name}</h1>
        <p>{pg.place}</p>
        <p>{pg.email}</p>
      </div>
   
      <div className="user-pg-profile-posts">
        {posts.length!=0?posts.map(item=>{
            return <div className="post" style={{backgroundImage:`url(${item.image})`}}>

            </div>
        }):<p>no posts yet</p>}

      </div>
      </div>
  );
};

export default PgProfile;
