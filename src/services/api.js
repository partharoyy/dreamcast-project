const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsersFromApi = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
