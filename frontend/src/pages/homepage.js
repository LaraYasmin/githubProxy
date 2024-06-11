import React, { useState, useEffect } from 'react';
import { getUsers } from '../server';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';

const Homepage = () => {
  const [page, setPage] = useState({
    data: [],
    limit: 10,
    activePage: 1,
  });

  async function getValuesUsers(token) {
    const users = await getUsers(token);
    setPage((prevPage) => ({
      ...prevPage,
      data: users.slice(0, prevPage.limit),
    }));
  }

  async function handlePageClick(selected) {
    const token = '';
    const users = await getUsers(token);
    setPage((prevPage) => ({
      ...prevPage,
      activePage: selected,
      data: users.slice((selected - 1) * prevPage.limit, selected * prevPage.limit),
    }));
  }

  useEffect(() => {
    const token = '';
    getValuesUsers(token);
  }, []);

  return (
    <div className="App">
      <ul className='list-group p-4'>
        {page.data.map((user) => (
          <li className='list-group-item' key={user.id}>
            <span className='font-weight-bold pr-2'></span>{user.id} - <span className='font-weight-bold pr-2'></span>{user.login}
          </li>
        ))}
      </ul>
      <Pagination className="justify-content-center">
        {Array.from({ length: Math.ceil(page.data.length / page.limit) }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === page.activePage}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default Homepage;