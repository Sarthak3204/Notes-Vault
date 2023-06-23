// @ts-nocheck
import React, { useEffect, useState } from 'react'
import CreateBlog from '../components/CreateBlog'
import { useAllQuery } from '../redux/slices/userBlogSlice';
import { useSelector } from 'react-redux';
import DisplayBlog from '../components/DisplayBlog';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import background3 from '../assets/background3.jpg';

export default function BlogScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;

  const { data, refetch } = useAllQuery();

  const [blogs, setBlogs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const arr = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].userId === userId) {
        arr.push(data[i]);
      }
    }
  }

  useEffect(() => {
    setBlogs(arr);
    setFiltered(arr);
  }, [userInfo, data])

  function handleSearch() {
    const filteredData = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredData);
  }

  return (
    <div style={{
      position: 'fixed',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      backgroundImage: `url(${background3})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflowY: 'scroll',
        padding: '10px',
      }}>
        <Container className='mt-3 mb-5'>
          <Row className='mx-1'>
            <Col xs="auto"><CreateBlog refetch={refetch} /></Col>
            <Col xs="auto">
              <div className="d-flex gap-2">
                <Form>
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    className="mr-sm-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form>
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </Col>
          </Row>

          <Row className="mx-2 mt-3 justify-content-between">
            {
              filtered.length > 0 &&
              filtered.map(blog =>
                <Col
                  key={blog._id}
                  sm={12} md={5} lg={4}
                  className='card p-4 pointer-col'
                ><DisplayBlog {...blog} />
                </Col>)
            }
          </Row>

        </Container>
        <Outlet />
      </div>
    </div >
  )
}
