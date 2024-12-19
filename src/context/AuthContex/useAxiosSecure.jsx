import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const axiosInstance = axios.create({
    baseURL: 'https://job-portal-application-eta.vercel.app',
    withCredentials: true
})
const useAxiosSecure = () => {
    const {logOutUser} = useAuth();
    const navigate = useNavigate();
    useEffect(()=> {
        axiosInstance.interceptors.response.use(response => {
            return response;
        }, error => {
            // console.log('Error caught in interceptor', error);
            if(error.status === 401 || error.status === 403){
                alert('Need to logout user');
                logOutUser()
                .then(() => {
                   alert('Logged out User');
                    navigate('/login');
                })
                .catch(error => {
                    console.log(error);
                })
            }
            return Promise.reject(error);
        })
    }, [])
    return axiosInstance;
};

export default useAxiosSecure;