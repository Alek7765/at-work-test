import { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  const data = await response.json();
  return data.slice(0, 6).map((user: any) => ({
    ...user,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&size=150`
  }));
};
