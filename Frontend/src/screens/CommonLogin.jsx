import React, { useState } from 'react';
import '../css/Login.css';
import { adminLogin } from '../service/admin';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await adminLogin(username, password);
            console.log(result)
            if (result.status === 200) {
                const token = result.data.message;
                sessionStorage.setItem('token', token);
                const { roles } = jwtDecode(token);
                toast.success('Login successful');

                const roleRoutes = {
                    ROLE_ADMIN: '/admin/home',
                    ROLE_OWNER: '/owner/home',
                    ROLE_CUSTOMER: '/customer/home'
                };

                navigate(roleRoutes[roles] || '/');
            } else {
                toast.error('Invalid username or password');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-container d-flex justify-content-center align-items-center vh-100'>
            <div className='col-md-4'>
                <div className='card shadow p-4'>
                    <h3 className='text-center mb-4'>Welcome to Wheels on Demand</h3>
                    <form onSubmit={onLogin}>
                        <div className='mb-3'>
                            <label className='form-label'>Username</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to='/register' className='btn btn-link p-0'>Register</Link>
                            <button type='submit' className='btn btn-primary' disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                        <div className='text-center mt-3'>
                            <Link to='/forgot-password' className='btn btn-link'>Forgot password?</Link>
                        </div>
                        <div className='text-center mt-3'>
                            Want to register your vehicle? <Link to='/owner/register' className='btn btn-link'>Register as owner</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
