// @ts-nocheck
import React from 'react'
import CreateBlog from '../components/CreateBlog'
import { useGetQuery } from '../redux/slices/userBlogSlice';
import { useSelector } from 'react-redux';

export default function BlogScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;
  const { data, refetch } = useGetQuery();
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
      <CreateBlog refetch={refetch} />
    </>
  )
}
