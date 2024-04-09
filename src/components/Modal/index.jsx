import './style.css';
import Button from '../Button';
import axios from 'axios';
const Modal = ({ className, onClick, post, setPost, onPost }) => {
  const onChange = async (e, key) => {
    if (key == 'image') {
      const formdata = new FormData();
      formdata.append('file', e.target.files[0]);
      const response = await axios.post(
        'http://localhost:4999/image',
        formdata
      );
      setPost({ ...post, image: response.data.url });
    }
    if (key == 'caption') {
      setPost({ ...post, caption: e.target.value });
    }
  };
 
  return (
    <div className={`modal ${className}`}>
      <input
        type="file"
        onChange={e => {
          onChange(e, 'image');
        }}
      />
      <input
        type="text"
        placeholder="write a caption"
        onChange={e => {
          onChange(e, 'caption');
        }}
      />

      <button onClick={onClick}>cancel</button>
      <Button className="modal-post-btn" onClick={onPost}>
        post
      </Button>
    </div>
  );
};

export default Modal;
