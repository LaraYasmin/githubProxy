import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails, getUserRepos } from '../server';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

const Details = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const token = '';
    if (username) {
      getUserDetails(token, username).then(data => {
        setUser(data);
      }).catch(error => {
        console.error('Error fetching user details', error);
      });
    }
  }, [username]);

  useEffect(() => {
    const token = '';
    if (username) {
      getUserRepos(token, username).then(data => {
        setRepos(data);
      }).catch(error => {
        console.error('Error fetching user repos', error);
      });
    }
  }, [username]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <ul className='list-group p-5'>
        <li className='list-group-item'>
          <span className='font-weight-bold pr-5'>ID:</span> {user.id} <br/>
          <span className='font-weight-bold pr-5'>Login:</span> {user.login} <br/>
          <span className='font-weight-bold pr-5'>URL:</span> {user.url} <br/>
          <span className='font-weight-bold pr-5'>Created At:</span> {new Date(user.created_at).toLocaleDateString()} <br/>
        </li>
      </ul>
      {repos.length > 0 ? (
        <Table striped bordered hover>
          <thead> 
            <tr>
              <th>Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {repos.map(repo => (
              <tr key={repo.id}>
                <td>{repo.name}</td>
                <td>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No repositories available</div>
      )}
    </div>
  );
};

export default Details;