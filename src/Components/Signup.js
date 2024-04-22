import React, { useContext, useState } from 'react';
import { Button, Input, LoginForm, LoginPageContainer } from './styledComponents';
import { LoginContext } from '../LoginContext';
import { url } from './Constants/constants';
import { useNavigate } from 'react-router-dom';



const Signup = () => {

    const [error, setError] = useState(null)
    const [data, setdata] = useState({
        email: '',
        password: '',
        firstName: "",
        lastName: ""
    });

    const navigate = useNavigate();
    const { login } = useContext(LoginContext)

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/auth/signup`, {
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
                setTimeout(() => {
                    setError(null)
                }, 3000)
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
        <LoginPageContainer>
            <LoginForm onSubmit={handleLogin} >
                <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '30px' }}>Register Here !!</h2>
                {error && <p style={{ color: 'red', fontSize: '20px', textAlign: 'center', marginBottom: '30px' }}>{error}</p>}
                <Input type="text" placeholder="FirstName" name="firstName" value={data.firstName} onChange={handleChange} />
                <Input type="text" placeholder="LastName" name="lastName" value={data.lastName} onChange={handleChange} />
                <Input type="text" placeholder="Username" name='email' value={data.email} onChange={handleChange} />
                <Input type="password" placeholder="Password" name="password" value={data.password} onChange={handleChange} />
                <Button type="submit" onClick={handleLogin}>Signup</Button>
            </LoginForm>
        </LoginPageContainer>
    );
};

export default Signup;
