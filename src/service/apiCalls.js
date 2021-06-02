import axios from 'axios';

const generateAxiosAPICall = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use((configArg) => {
    const config = configArg;
    return config;
  });

  return instance;
};

export default generateAxiosAPICall;
