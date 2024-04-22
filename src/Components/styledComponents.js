import styled from 'styled-components';
export const LoginPageContainer = styled.div`
  background-color: #222; /* Dark gray background color */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const LoginForm = styled.form`
  background-color: #333; /* Dark gray background color */
  padding: 60px 40px;
  border-radius: 10px;
  width: 400px;
  margin-bottom :3rem;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 40px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #444; /* Dark gray background color for input */
  color: #fff; /* White text color */
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff; 
  border: none;
  border-radius: 5px;
  cursor: pointer;  
  font-weight : 700;
  font-size : 1rem;
`;