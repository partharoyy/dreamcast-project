import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, editUser } from '../redux/actions/UserActions';
import PropTypes from 'prop-types';

const UserForm = ({ userToEdit }) => {
  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { Group, Label, Control } = Form;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      city: '',
      zipcode: '',
    },
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData((prevData) => ({
        ...prevData,
        name: userToEdit.name || '',
        email: userToEdit.email || '',
        phone: userToEdit.phone || '',
        address: {
          ...prevData.address,
          city: userToEdit.address.city || '',
          zipcode: userToEdit.address.zipcode || '',
        },
      }));
    }
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.phone === '' ||
      formData.address.city === '' ||
      formData.address.zipcode === ''
    )
      return alert('Field/Fields cannot be empty');
    if (userToEdit) {
      dispatch(editUser({ id: userToEdit.id, ...formData }));
    } else {
      dispatch(addUser({ id: Date.now(), ...formData }));
    }
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: {
        city: '',
        zipcode: '',
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'city' || name === 'zipcode') {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit} style={style.form}>
      <Group controlId='formName' style={style.formGroup}>
        <Label>Name</Label>
        <Control type='text' name='name' value={formData.name} onChange={handleChange} />
      </Group>
      <Group controlId='formEmail' style={style.formGroup}>
        <Label>Email</Label>
        <Control type='email' name='email' value={formData.email} onChange={handleChange} />
      </Group>
      <Group controlId='formPhone' style={style.formGroup}>
        <Label>Phone</Label>
        <Control type='text' name='phone' value={formData.phone} onChange={handleChange} />
      </Group>
      <Group controlId='formCity' style={style.formGroup}>
        <Label>City</Label>
        <Control type='text' name='city' value={formData.address.city} onChange={handleChange} />
      </Group>
      <Group controlId='formZipcode' style={style.formGroup}>
        <Label>Zip Code</Label>
        <Control type='text' name='zipcode' value={formData.address.zipcode} onChange={handleChange} />
      </Group>
      <Button variant='primary' type='submit' className='m-4' style={style.button}>
        {userToEdit ? 'Edit User' : 'Add User'}
      </Button>
    </Form>
  );
};

UserForm.propTypes = {
  userToEdit: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.shape({
      city: PropTypes.string,
      zipcode: PropTypes.string,
    }),
  }),
};

const style = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '1rem',
    borderRadius: '10px',
    width: '30%',
  },
  formGroup: {
    display: 'flex',
    padding: '.2rem',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '1rem',
  },
};

export default UserForm;
