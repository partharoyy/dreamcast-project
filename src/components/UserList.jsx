import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, editUser } from '../redux/actions/UserActions';
import UserTable from './UserTable';
import PropTypes from 'prop-types';

const UserList = ({ setUserToEdit }) => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    dispatch(editUser(user));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <UserTable users={users} handleDeleteUser={handleDeleteUser} handleEditUser={handleEditUser} />
    </div>
  );
};

UserList.propTypes = {
  setUserToEdit: PropTypes.func.isRequired,
};

export default UserList;
