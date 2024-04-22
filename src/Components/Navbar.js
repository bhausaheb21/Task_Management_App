import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../LoginContext';

const Navbar = styled.nav`
  background-color: #333; 
  overflow: hidden;
  margin : 0;
  width : 100%
`;

const NavItem = styled(Link)`
  float: right;
  display: block;
  align-items :center;
  color: #007bff; /* Violet text color */
  text-align: center;
  padding: 14px 20px;
  font-family: "Lato", sans-serif;
  text-decoration: none;
  font-weight: bold;
  font-size : 1.2rem;
`;

const Logo = styled.div`
  float: left;
  display: block;
  color: #007bff;
  text-align: center;
  padding: 14px 20px;
  text-decoration: none;
  display :flex;
  flexDirection : row;
  gap :20px;
  font-family: "Lato", sans-serif;
`;

const DarkNavbar = () => {
    const { logout, token } = useContext(LoginContext);
    const navigate = useNavigate();
    const logoutHandle = () => {
        logout();
        navigate('/login')
    }

    const [firstName, setFirstname] = useState(localStorage.getItem('firstName'))
    return (
        <Navbar>
            <Logo>
                <img src={require('../logo2.png')} alt="Logo" style={{ width: '25px', height: 'auto' }} />
                <h2>Task Manager App</h2>
            </Logo>
            {
                token && <>
                    <NavItem>Welcome, {firstName}</NavItem>
                    <NavItem to="/">Home</NavItem>
                    <NavItem onClick={logoutHandle}>Logout</NavItem>
                </>
            }
            {
                !token &&
                <>
                    <NavItem to="/login">Login</NavItem>
                    <NavItem to="/signup">Signup</NavItem>
                </>
            }
        </Navbar>
    );
};

export default DarkNavbar;
