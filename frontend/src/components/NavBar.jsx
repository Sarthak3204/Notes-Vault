// @ts-nocheck
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { removeCredentials } from '../redux/slices/authSlice';
import { useLogoutMutation } from '../redux/slices/userApiSlice';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { CgProfile, CgLogOut } from 'react-icons/cg';
import { SlNotebook } from 'react-icons/sl';
import "bootstrap/dist/css/bootstrap.min.css";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  const [brand, setBrand] = useState("Student Share");

  const [logout] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout().unwrap();

      dispatch(removeCredentials());

      setBrand("Student Share");
      navigate('/');
      toast.success("Logout Successful");
    }
    catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    if (pathname === "/profile") setBrand("Profile")
  }, [pathname])

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand>{brand}</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>

                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <CgProfile /> Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/blog'>
                    <NavDropdown.Item>
                      <SlNotebook /> My Blogs
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={handleLogout}>
                    <CgLogOut /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>Sign Up</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
