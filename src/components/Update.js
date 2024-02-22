import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';

function Update() {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const { id } = useParams();
const navigate=useNavigate();


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };
  useEffect(() => {
    axios.get(`http://localhost:8000/getuserbyid/${id}`)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setPlace(result.data.place);
      })
      .catch(err => console.log(err));
  }, [id]);


  const handleUpdate = () => {
    axios.put(`http://localhost:8000/updateuser/${id}`, { name, place })
      .then((res) => {
        console.log(res);
        navigate('/view');
      })
      .catch((err) => console.log(err));
  };


  return (
    <div>
      <input type="text" placeholder="name" value={name} onChange={handleNameChange} /><br></br>
      <input type="text" placeholder="place" value={place} onChange={handlePlaceChange} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Update;