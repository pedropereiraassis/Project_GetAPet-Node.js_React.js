import styles from './AddPet.module.css';
import api from '../../../utils/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* components */
import PetForm from '../../form/PetForm';
/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';

function AddPet() {
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  async function registerPet(pet) {
    let msgType = 'success';
    const formData = new FormData();

    Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    const data = await api.post('/pets/create', formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      return response.data;
    })
    .catch((error) => {
      msgType = 'error';
      return error.response.data;
    });

    setFlashMessage(data.message, msgType);
    
    if (msgType !== 'error') {
      navigate('/pets/myPets');
    }
  }

  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Register a pet</h1>
        <p>After registered it will be available for adoption</p>
      </div>
      <PetForm handleSubmit={registerPet} btnText='Register Pet'/>
    </section>
  )
}

export default AddPet;