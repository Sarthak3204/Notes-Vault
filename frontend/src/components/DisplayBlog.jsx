import React from 'react'
import { format } from "date-fns";
import { LinkContainer } from 'react-router-bootstrap';

export default function DisplayBlog({ _id, title, summary, createdAt }) {
  return (
    <div>
      <div style={{ cursor: 'pointer' }}>
        <LinkContainer to={`/blog/${_id}`}>
          <h2>{title}</h2>
        </LinkContainer>
      </div>
      <p>
        <time>{format(new Date(createdAt), 'dd/MM/yyyy hh:mm a')}</time>
      </p>
      <p>{summary}</p>
    </div >
  )
}
