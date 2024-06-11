import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../server';
import 'bootstrap/dist/css/bootstrap.min.css';

const Details = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = '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';
    if (username) {
      getUserDetails(token, username).then(data => {
        setUser(data);
      }).catch(error => {
        console.error('Error fetching user details', error);
      });
    }
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <ul className='list-group p-4'>
        <li className='list-group-item'>
          <span className='font-weight-bold pr-2'>ID:</span> {user.id} <br/>
          <span className='font-weight-bold pr-2'>Login:</span> {user.login} <br/>
          <span className='font-weight-bold pr-2'>URL:</span> {user.url} <br/>
          <span className='font-weight-bold pr-2'>Created At:</span> {new Date(user.created_at).toLocaleDateString()} <br/>
        </li>
      </ul>
    </div>
  );
};

export default Details;