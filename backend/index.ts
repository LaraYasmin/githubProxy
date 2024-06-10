import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'GitHub token is required' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Invalid authorization format' });
    }

    req.token = token;
    next();
};

declare global {
    namespace Express {
        interface Request {
            token?: string;
        }
    }
}

const githubApiUrl = 'https://api.github.com';

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

app.get('/', (req: Request, res: Response) => {
    res.send('GitHub Proxy API is running');
});

app.get('/api/users', authenticate, async (req: Request, res: Response) => {
    const { since } = req.query;
    try {
        const response = await axios.get(`${githubApiUrl}/users`, {
            params: { since },
            headers: {
                Authorization: `Bearer ${req.token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.json({ users: response.data, next_page: response.headers.link });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

app.get('/api/users/:username/details', authenticate, async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const response = await axios.get(`${githubApiUrl}/users/${username}`, {
            headers: {
                Authorization: `Bearer ${req.token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

app.get('/api/users/:username/repos', authenticate, async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const response = await axios.get(`${githubApiUrl}/users/${username}/repos`, {
            headers: {
                Authorization: `Bearer ${req.token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});