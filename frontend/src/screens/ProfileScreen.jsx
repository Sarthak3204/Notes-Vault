// @ts-nocheck
import { useState } from 'react'
import { toast } from 'react-toastify';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  useUpdateUserMutation,
  useRemoveUserMutation,
} from '../redux/slices/userApiSlice'
import {
  setCredentials,
  removeCredentials
} from '../redux/slices/authSlice';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import background2 from '../assets/background2.jpg'
import { useNavigate } from 'react-router-dom';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const [updateUser] = useUpdateUserMutation();
  const [removeUser] = useRemoveUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  function isStrongPassword() {
    // Perform password strength validation here
    const conditions = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      digit: /[0-9]/.test(password),
      specialChar: /[^\w\s]/.test(password)
    };

    return Object.values(conditions).every((condition) => condition);
  }

  function validateEmail() {
    // Email validation regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (email.length > 0 && !validateEmail())
      return toast.error("Invalid email address");
    if (password.length > 0 && !isStrongPassword(password))
      return toast.error("Password is not strong");
    if (password !== confPass)
      return toast.error("Passwords do not match");

    try {
      const res = await updateUser({ _id: userInfo._id, name, email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Update Successful");
    }
    catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const res = await removeUser().unwrap();
      toast.success("User deleted successfully");
      dispatch(removeCredentials());
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

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
          <h2>Update User</h2>
          <Form onSubmit={handleSumbit}>

            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder={userInfo.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder={userInfo.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isValid={validateEmail()}
                isInvalid={email.length > 0 && !validateEmail()}
              ></Form.Control>

              <Form.Control.Feedback type="invalid">
                Enter valid email address
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
              </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isValid={isStrongPassword()}
                isInvalid={password.length > 0 && !isStrongPassword()}
              ></Form.Control>

              <Form.Control.Feedback type="invalid">
                <div>
                  <strong>Your Password must contain:</strong>
                  <ul>
                    <li>Atleast 8 characters</li>
                    <li>Atleast one uppercase and one lowercase</li>
                    <li>Atleast one digit and one special character</li>
                  </ul>
                </div>
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
              </Form.Control.Feedback>

            </Form.Group>

            <Form.Group className='my-2' controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confPass}
                onChange={(e) => setConfPass(e.target.value)}
                isValid={confPass.length > 0 && password === confPass}
                isInvalid={confPass.length > 0 && password !== confPass}
              ></Form.Control>

              <Form.Control.Feedback type="invalid">
                Passwords do not match
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
              </Form.Control.Feedback>

            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button type="submit" variant="primary" className="mt-2">
                Update
              </Button>
              <Button variant="danger" className="mx-2 mt-2" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Form>
        </FormContainer>
      </div>
    </div>
  )
}
