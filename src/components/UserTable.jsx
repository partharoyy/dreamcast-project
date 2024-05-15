import { Table, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function UserTable({ users, handleDeleteUser, handleEditUser }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City with Zip Code</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td style={style.id}>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              {user.address?.city}, {user.address?.zipcode}
            </td>
            <td>
              <Button variant='secondary' onClick={() => handleEditUser(user)}>
                Edit
              </Button>
              <Button variant='danger' onClick={() => handleDeleteUser(user.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.shape({
        city: PropTypes.string,
        zipcode: PropTypes.string,
      }),
    })
  ),
  handleDeleteUser: PropTypes.func.isRequired,
  handleEditUser: PropTypes.func.isRequired,
};

const style = {
  id: {
    fontWeight: 'bold',
    paddingRight: '0.5rem',
  },
};

export default UserTable;
