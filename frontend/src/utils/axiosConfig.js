import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'https://messyaf-backend.onrender.com/api';
//1.creating axios instance
const api = axios.create({
  baseURL: BASE_URL
});

//2. request interceptor... runs before every api request
api.interceptors.request.use(
  (config) => {
    console.log('Making api request to:', config.url)
    //get jwt token from localStorage
    const token = localStorage.getItem('token');

    if(token) {
      //adding authorization header to every request
      config.headers.Authorization = `Bearer ${token}`;
      console.log('token attached to request');
    } else {
      console.log(`no token found in localStorage`);
    }
    return config;
  },
  (error) => {
    console.error('request interceptor error:', error);
    return Promise.reject(error);
  }
);

//3. response interceptor... runs after every api response
api.interceptors.response.use(
  (response) => {
    console.log('api response received', response.status);
    return response;
  },
  async (error) => {
    console.error('api error', error.response?.status, error.response?.data);
    const originalRequest = error.config;

    //handling token expiration
    if((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      console.log('access token expired, trying to refresh');
      originalRequest._retry = true;// preventing infinite loop
      
      const refreshToken = localStorage.getItem('refreshToken');
      if(refreshToken) {
        try {
          console.log('attempting refresh');
          const response = await axios.post(`${BASE_URL}/refresh`, {
            refreshToken: refreshToken
          });

          const newToken = response.data?.accessToken;
          if (!newToken) {
            throw new Error('No access token received from refresh endpoint');
          }
          //set new token
          localStorage.setItem('token', newToken);
          console.log('token refreshed successfully');

          //retry originalRequest with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch(refreshError) {
          console.log('token refresh failed');
          localStorage.clear();
          window.location.href = '/signup';
        }
      } else {
        console.log('no refresh token found');
        localStorage.clear();
        window.location.href = '/signup';
      }
    }
    return Promise.reject(error);
  }
)

export default api;
