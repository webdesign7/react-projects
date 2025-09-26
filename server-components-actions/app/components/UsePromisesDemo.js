'use client';

import {use} from "react";

export default function UsePromiseDemo({ usersPromice }) {
    const users = use(usersPromice);
    return (
        <div className='rsc'>
            <h2>RSC with Data Fetching</h2>
            <p>
                Uses <strong>async / await</strong> for data fetching.
            </p>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.title})
                    </li>
                ))}
            </ul>
        </div>
    );
}