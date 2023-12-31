// @ts-nocheck
import React from 'react';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { VscNewFile } from 'react-icons/vsc';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreateMutation } from '../redux/slices/userBlogSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function CreateBlog({ refetch }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo._id;

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

  const [create] = useCreateMutation();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('content', content);
      formData.append('file', file);

      const res = await create(formData).unwrap();

      refetch();
      setTitle("");
      setSummary("");
      setContent("");
      toast.success("Blog created successfully");
      handleClose();
    }
    catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <>
      <VscNewFile size={36} style={{ cursor: "pointer" }} onClick={handleShow} />
      <Modal
        size="xl"
        centered
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            New Blog
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row>
              <Col>

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="fileUpload">
                    <Form.Control
                      type="file"
                      label="Choose File"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>

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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Blog
          </Button>
        </Modal.Footer>
      </Modal >
    </>
  );
}

export default CreateBlog;