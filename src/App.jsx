import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [userToEdit, setUserToEdit] = useState(null);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h1>User List</h1>
          <UserList setUserToEdit={setUserToEdit} />
        </Col>
        <Col md={4}>
          <h1>{userToEdit ? 'Edit User' : 'Add User'}</h1>
          <UserForm userToEdit={userToEdit} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
