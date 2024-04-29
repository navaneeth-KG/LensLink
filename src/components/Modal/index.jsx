import './style.css';
import Button from '../Button';
import axios from '../../utils/axios';
import Select from '../Select';
const Modal = ({ className, onClick, post, setPost, onPost, category }) => {
  const onChange = async (e, key) => {
    if (key == 'image') {
      const formdata = new FormData();
      formdata.append('file', e.target.files[0]);
      const response = await axios.post(
        '/image',
        formdata
      );
      setPost({ ...post, image: response.data.url });
    } else if (key == 'caption') {
      setPost({ ...post, caption: e.target.value });
    } else if (key == 'category') {
      setPost({ ...post, category: e.target.value });
    }
  };

  return (
    <div className="modal-container-box">
      {' '}
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
        <Select
          onChange={e => {
            onChange(e, 'category');
          }}
          array={category}
          placeholder="select category"
        />

        <Button className="modal-post-btn" onClick={onPost}>
          post
        </Button>
        <button className="modal-cancel-btn" onClick={onClick}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
