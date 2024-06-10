import request from 'supertest';
import axios from 'axios';
import { app } from '../index';

jest.mock('axios');
const fakeToken = 'ghp_pf6QvLwPoILsnCCoIBOjOsnLo7mkUi24lpkz';

describe('API Endpoints', () => {
  it('GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('GitHub Proxy API is running');
  });

//   it('GET /api/users should return status 200 and users data', async () => {
//     const mockUsersData = [
//         { id: 1, login: 'testuser1' },
//         { id: 2, login: 'testuser2' },
//         { id: 3, login: 'testuser3' }
//     ];
//     (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUsersData });
    
//     const response = await request(app)
//         .get('/api/users')
//         .query({ since: 0 })
//         .set('Authorization', `Bearer ${fakeToken}`);
    
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('users');
//     expect(response.body.users).toHaveLength(mockUsersData.length);
//     expect(response.body.users.every((user: any) => 'id' in user && 'login' in user)).toBe(true);
//   });

  it('GET /api/users/:username/details', async () => {
    const mockUserData = { id: 1, login: 'testuser' };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUserData });
    
    const response = await request(app)
      .get('/api/users/testuser/details')
      .set('Authorization', `Bearer ${fakeToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUserData);
  });

  it('GET /api/users/:username/repos', async () => {
    const mockReposData = [{ id: 1, name: 'testrepo' }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockReposData });
    
    const response = await request(app)
      .get('/api/users/testuser/repos')
      .set('Authorization', `Bearer ${fakeToken}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockReposData);
  });
});