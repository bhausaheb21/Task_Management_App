import React from 'react';
import { url } from './Constants/constants';
// import { useHistory } from 'react-router-dom';

const TaskCard = ({ task, settasks }) => {
    // const history = useHistory()
    const handleComplete = async () => {
        try {

            const response = await fetch(`${url}/${task?._id}`,
                {
                    method: "PUT",
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                }
            )
            if (response.status === 201) {
                const resData = await response.json();
                settasks([])
            }
        } catch (error) {

        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${url}/${task._id}`, {
                method: "Delete",
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })

            if (response.status === 200) {
                settasks([])
            }
            else {
                const resData = await response.json();
                throw new Error(resData.message)
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = () => {

    }

    const printdate = () => {
        const date = new Date(task?.completed_time)
        console.log(date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className="task-card">
            <div className="task-details">
                <h3>{task?.title}</h3>
                <p>{task?.description}</p>
                <p>Priority : {task?.priority}</p>
                <p>Due Date : {task?.due_date}</p>
                {task?.status === 'Completed' && <p>Completed Date : {printdate()}</p>}
            </div>
            <div className="task-actions">
                <p>Status: {task?.status === 'Completed' ? 'Completed' : 'Pending'}</p>
                {task?.status === 'Pending' &&
                    <button onClick={handleComplete}>
                        Mark as Complete
                    </button>}
                <div style={{ flexDirection: 'row', gap: '40px' }}>
                    <button onClick={handleDelete} style={{ background: '#cc2b26', marginRight: '15px' }}>Delete</button>
                </div>
            </div>
            <style jsx>{`
        .task-card {
          display: flex;
          margin :10px 20px;
          justify-content: space-between;
          align-items: flex-start;
          background-color: #333;
          color: #fff;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .task-details {
          flex-grow: 1;
          margin-right: 20px;
        }
        .task-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        h3 {
          margin-top: 0;
        }
        p {
          margin: 8px 0;
        }
        button {
          margin-top: 8px;
          padding: 8px 12px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #5f73bc;
        }
        button:disabled {
          background-color: #888;
          cursor: not-allowed;
        }
      `}</style>
        </div>
    );
};

export default TaskCard;
