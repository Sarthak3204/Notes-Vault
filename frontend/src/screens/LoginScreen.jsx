// @ts-nocheck
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../redux/slices/authSlice';
import { useLoginMutation } from '../redux/slices/userApiSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import background2 from '../assets/background2.jpg'

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials(res));
      navigate('/profile');
      toast.success("Login Successful");
    }
    catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundImage: `url(${background2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div style={{ paddingTop: '70px' }}>
        <FormContainer>
          <h1>Sign In</h1>

          <Form onSubmit={handleSumbit}>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
          </Form>

          <Row className='py-3'>
            <Col>
              New User? <Link to='/register'>Register</Link>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </div>
  )
}
