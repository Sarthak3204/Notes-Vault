// @ts-nocheck
import React from 'react'
import CreateBlog from '../components/CreateBlog'
import { useAllQuery } from '../redux/slices/userBlogSlice';
import { useSelector } from 'react-redux';
import DisplayBlog from '../components/DisplayBlog';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export default function BlogScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;

  const { data, refetch } = useAllQuery();
  const blogs = [];

  if (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].userId === userId) {
        blogs.push(data[i]);
      }
    }
  }
  return (
    <>
      <Container className='mt-3'>
        <Row>
          <Col><CreateBlog refetch={refetch} /></Col>
        </Row>
        <Row className="mt-3">
          {
            blogs.length > 0 &&
            blogs.map(blog => <Col key={blog._id} sm={12} md={4} className='card p-5 pointer-col'><DisplayBlog {...blog} /></Col>)
          }
        </Row>
      </Container>
      <Outlet />
    </>
  )
}
