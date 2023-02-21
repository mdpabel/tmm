interface configType {
  data?: object;
  token?: string;
  headers?: HeadersInit;
  method?: 'POST' | 'PUT' | 'DELETE';
}

export async function client(url: string, { data, method }: configType = {}) {
  const config = {
    method: method ? method : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await fetch(url, { ...config });
  const resData = await res.json();

  if (res.ok) {
    return resData;
  } else {
    return Promise.reject(resData);
  }
}
