import React from 'react'
import { formatISO9075 } from "date-fns";
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

export default function DisplayBlog({ _id, title, summary, createdAt }) {
  // @ts-ignore
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <div style={{ cursor: 'pointer' }}>
        <LinkContainer to={`/blog/${_id}`}>
          <h2>{title}</h2>
        </LinkContainer>
      </div>
      <p>
        <a>{userInfo.name}</a>
        <br />
        <time>{formatISO9075(new Date(createdAt))}</time>
      </p>
      <p>{summary}</p>
    </div >
  )
}
