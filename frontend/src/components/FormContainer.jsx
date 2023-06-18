/* eslint-disable react/prop-types */
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container style={{ backgroundColor: 'transparent' }}>
      <Row className='justify-content-center'>
        <Col xs={8} md={4}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;