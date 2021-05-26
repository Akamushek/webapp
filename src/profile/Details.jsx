import React from 'react';
import { Link } from 'react-router-dom';
import {BsPencilSquare} from 'react-icons/bs'

import { accountService } from '@/_services';

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;

    return (
        <div>
            <h1>Мой профиль</h1>
            <p>
                <strong>Имя: </strong> {user.title} {user.firstName} {user.lastName}<br />
                <strong>Почта: </strong> {user.email}
            </p>
            <p><Link to={`${path}/update`}>Обновить профиль <BsPencilSquare /></Link></p>
        </div>
    );
}

export { Details };