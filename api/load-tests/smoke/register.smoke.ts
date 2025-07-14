import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 1,        // 1 virtual user
    iterations: 1, // 1 registration attempt
};

function randomEmail(): string {
    return `user${Math.floor(Math.random() * 1000000)}@example.com`;
}

export default function () {
    const url = 'http://localhost:3000/auth/register'; // Update port if needed

    const payload = JSON.stringify({
        firstName: 'Alex',
        lastName: 'Smith',
        email: randomEmail(),
        password: '@Mannu2022',
        role: 'user'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status is 201': (r) => r.status === 201,
        'message present': (r) => {
            try {
                const body = JSON.parse(r.body as string);
                return body.message !== undefined;
            } catch {
                return false;
            }
        },
    });

    sleep(1);
}