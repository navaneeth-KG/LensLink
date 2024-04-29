import './style.css';
import axios from '../../../utils/axios';
import { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import Input from './../../../components/Input/index';
import { getId } from './../../../utils/index';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    contact: '',
    image: '',
    email: '',
  });
  const fetchUser = async () => {
    const response = await axios.get(`/user/${getId()}`);
    setUser(response.data);
  };

  const onChange = async (e, key) => {
    if (key == 'image') {
      const formdata = new FormData();
      formdata.append('file', e.target.files[0]);
      const response = await axios.post(
        '/image',
        formdata
      );
      setUser({ ...user, image: response.data.url });
    } else {
      setUser({ ...user, [key]: e.target.value });
    }
  };
  const onClick = async () => {
    const response = await axios.patch(`/user/${getId()}`,user);
    alert(response.data.message);
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="user-profile">
      <div className="user-details-container">
        <div
          className="profile-pic-container"
          style={{
            backgroundImage: user.image ? `url(${user.image})` : 'url(/user.jpg)',
          }}
        ></div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.contact}</p>
      </div>

      <div className="user-details-editcontainer">
        <Input
          value={user.name}
          onChange={e => {
            onChange(e, 'name');
          }}
        />
        <Input
          value={user.email}
          onChange={e => {
            onChange(e, 'email');
          }}
        />
        <Input
          value={user.contact}
          onChange={e => {
            onChange(e, 'contact');
          }}
        />
        <label htmlFor="dp">change profile picture</label>

        <Input
          id="dp"
          type="file"
          onChange={e => {
            onChange(e, 'image');
          }}
        />
        <Button onClick={onClick}>edit</Button>
      </div>
    </div>
  );
};

export default UserProfile;
