import React, { useContext, useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import { url } from './Constants/constants';
import { LoginContext } from '../LoginContext';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
    const [tasks, settasks] = useState([]);
    const [refresh, setrefresh] = useState()
    const { token, firstName } = useContext(LoginContext)
    const [sortBy, setSortBy] = useState('');
    const [filterBy, setFilterBy] = useState('');

    const navigate = useNavigate()

    const handleSortByChange = async (event) => {
        setSortBy(event.target.value);
        try {

            const response = await fetch(`${url}/sort/${event.target.value}`,
                {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
            const resdata = await response.json();
            if (response.status !== 200) {
                throw new Error(resdata.message)
            }
            settasks(resdata.tasks)
            setrefresh(true)
            setFilterBy("")

        } catch (error) {

        }

    };

    const handleFilterByChange = async (event) => {
        setFilterBy(event.target.value);
        try {

            const response = await fetch(`${url}/${event.target.value}`,
                {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
            const resdata = await response.json();
            if (response.status !== 200) {
                throw new Error(resdata.message)
            }
            settasks(resdata.tasks)
            setrefresh(true)
            setSortBy("")

        } catch (error) {

        }

    };

    useEffect(() => {
        const gettasks = async () => {
            try {
                console.log(token, firstName);
                const response = await fetch(`${url}`, {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
                const resData = await response.json()
                settasks(resData.tasks)
            } catch (error) {
            }
        }
        gettasks()
    }, [refresh])



    return (
        <div>
            <div style={{ gap: '4rem' }}>
                <div className="select-description">Sort By:</div>
                <select className="custom-select" value={sortBy} onChange={handleSortByChange}>
                    <option value="" disabled selected>Select an option</option>
                    <option value="due_date">Due Date</option>
                    <option value="priority">Priority</option>
                </select>

                <div className="select-description">Filter By:</div>
                <select className="custom-select" value={filterBy} onChange={handleFilterByChange}>
                    <option value="" disabled selected>Select an option</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            {
                tasks?.map((value, index) => <TaskCard task={value} key={index} settasks={setrefresh} />)
            }

            {
                tasks.length === 0 && sortBy === "" && filterBy === "" ? (
                    <h1 style={{ color: "#fff", textAlign: 'center', marginTop: '20px' }}>No tasks available</h1>
                ) : tasks.length === 0 && sortBy === "" && filterBy !== "" ? (
                    <h1 style={{ color: "#fff", textAlign: 'center', marginTop: '20px' }}>No tasks available</h1>
                ) : tasks.length === 0 && filterBy !== "" && sortBy === "" ? (
                    <h1 style={{ color: "#fff", textAlign: 'center', marginTop: '20px' }}>No tasks available that are {filterBy}</h1>
                ) : null
            }

            <Fab color="primary" aria-label="add" style={{ position: 'fixed', bottom: "30px", right: '30px' }} onClick={() => {
                navigate('/create')
            }}>
                <AddIcon />
            </Fab>
        </div>
    )
}

export default Home
