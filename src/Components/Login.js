import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, LoginForm, LoginPageContainer } from './styledComponents';
import { url } from './Constants/constants';
import { LoginContext } from '../LoginContext';
import { useNavigate } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';

const LoginPage = () => {
    const [data, setdata] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null)
    const { logout } = useContext(LoginContext)
    useEffect(() => {
        logout();
    })
    const navigate = useNavigate();
    const { login } = useContext(LoginContext)

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/auth`, {
                headers: {
                    "Content-Type": 'application/json',
                },
                method: "POST",
                body: JSON.stringify(data)

            })
            const resData = await response.json()
            console.log(resData);
            if (response.status == 200 || response.status == 201) {
                login(resData)
                localStorage.setItem('token', resData.token);
                localStorage.setItem('firstName', resData.firstName)
                navigate('/')
            }
            else {
                setError(resData.error)
                setTimeout(()=>{
                    setError(null)
                },3000)
            }
        }
        catch (err) {

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>

            <LoginPageContainer>
                <LoginForm onSubmit={handleLogin} >
                    <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '30px' }}>Login</h2>
                    {error && <p style={{color:'red', fontSize : '20px', textAlign:'center', marginBottom : '30px'}}>{error}</p>}
                    <Input type="text" name="email" placeholder="Username" value={data.email} onChange={handleChange} />
                    <Input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />
                    <Button type="submit">Login</Button>
                </LoginForm>
            </LoginPageContainer>
            {/* <ToastContainer position="top-center" /> */}
        </div>

    );
};

export default LoginPage;
