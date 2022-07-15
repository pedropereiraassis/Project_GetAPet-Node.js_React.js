import Input from '../../form/Input';
import styles from '../../form/Form.module.css';
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'

/* context */
import { Context } from '../../../context/UserContext';

function Register() {
  const [user, setUser] = useState({})
  const { register } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    register(user);
  }

  return (
    <section className={styles.form_container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          text="Name"
          type="text"
          name="name"
          placeholder="Type your full name"
          handleOnChange={handleChange}
        />
        <Input 
          text="Phone number"
          type="text"
          name="phone"
          placeholder="Type your phone"
          handleOnChange={handleChange}
        />
                <Input 
          text="E-mail"
          type="email"
          name="email"
          placeholder="Type your e-mail"
          handleOnChange={handleChange}
        />
        <Input 
          text="Password"
          type="password"
          name="password"
          placeholder="Type your password"
          handleOnChange={handleChange}
        />
        <Input 
          text="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Register" />
      </form>
      <p>
        Already registered? <Link to='/login'>Login</Link>
      </p>
    </section>
  )
}

export default Register;