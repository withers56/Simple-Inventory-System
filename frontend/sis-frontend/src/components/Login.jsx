/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getUser } from '../services/UserService';
import { userLogin } from '../services/AuthService';
import { setToken } from '../auth/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigator = useNavigate(); 
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username:'',
    password:''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    console.log(formData);
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('clicked submit');
    console.log(formData);
    

    userLogin(formData).then(response => {

      console.log(response.data.token);

      setToken(response.data.token);

      navigator('/');
      
    }).catch(error => {
      console.error(error);
      
    })
    
  }

  return (
    <div className='container'>
        <Form className='mt-3'>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" name='username' value={formData.username} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" disabled={isLoading} type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
    </div>
  )
}

export default Login