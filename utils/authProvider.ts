import { client } from './apiClient';

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: RegisterProps) => {
  const data = client('/api/register', {
    data: {
      firstName,
      lastName,
      email,
      role,
      password,
    },
    method: 'POST',
  });

  return data;
};

interface SignInProps {
  email: string;
  password: string;
}

export const signIn = async ({ email, password }: SignInProps) => {
  const data = client('/api/signin', {
    data: {
      email,
      password,
    },
    method: 'POST',
  });

  return data;
};

export const logout = async () => {
  const data = client('/api/logout', {
    data: {},
    method: 'POST',
  });

  return data;
};
