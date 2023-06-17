// @ts-nocheck
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetQuery, useUpdateMutation } from '../redux/slices/userBlogSlice';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
  const { id: _id } = useParams();
  const { data } = useGetQuery(_id);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;

  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const [update] = useUpdateMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await update({ _id, userId, title, summary, content }).unwrap();
      toast.success("Blog updated successfully");
      handleClose();
      navigate('/blog');
    }
    catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  useEffect(() => {
    handleShow();
    if (data) {
      setTitle(data.title);
      setSummary(data.summary);
      setContent(data.content);
    }
  }, [data])

  return (
    <>
      <Modal
        size="xl"
        centered
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Blog
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row>
              <Col>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className='my-2' controlId='title'>
                    <Form.Control
                      type="text"
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className='my-2' controlId='summary'>
                    <Form.Control
                      type="text"
                      placeholder="Enter summary"
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                    />
                  </Form.Group>

                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={content}
                    onChange={newValue => setContent(newValue)}
                  />

                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update Blog
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}

export default EditBlog;