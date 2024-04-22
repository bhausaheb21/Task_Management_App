import React, { useState } from 'react';
import { Button, Input, LoginForm, LoginPageContainer } from './styledComponents';
import { url } from './Constants/constants';
import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import { toast, ToastContainer } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';



const CreateTask = ({ settasks, setform }) => {
    const [data, setdata] = useState({
        title: '',
        description: '',
        priority: 1,
        due_date: ''
    });

    const navigate = useNavigate();

    const createTask = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${url}/`, {
                headers: {
                    "Content-Type": 'application/json',
                    authorization: localStorage.getItem('token')
                },
                method: "POST",
                body: JSON.stringify(data)

            })
            if (response.status == 201) {
                navigate('/')
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (<>
        <LoginPageContainer>
            <LoginForm onSubmit={createTask} >
                <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '30px' }}>Add Task !!</h2>
                <Input type="text" name="title" placeholder="Enter Title" value={data.title} onChange={handleChange} required />
                <Input type="text" name="description" placeholder="Enter Description" value={data.description} onChange={handleChange} required />
                <Input type="date" name="due_date" placeholder="Enter Due Date" value={data.due_date} onChange={handleChange} required />
                <Input type="number" name="priority" placeholder="Enter Priority Value" value={data.priority} onChange={handleChange} />
                <Button type="submit" >Create Task</Button>
                {/* <Button type="submit" onClick={createTask}>Create Task</Button> */}
            </LoginForm>
            <ToastContainer position="top-center" />
        </LoginPageContainer>
    </>
    );
};

export default CreateTask;
