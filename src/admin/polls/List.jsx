import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {BsPencilSquare, BsTrash, BsPlusCircle} from 'react-icons/bs'

import { pollService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [polls, setpolls] = useState(null);

    useEffect(() => {
        pollService.getAll().then(x => setpolls(x));
    }, []);

    function deletepoll(id) {
        setpolls(polls.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        pollService.delete(id).then(() => {
            setpolls(polls => polls.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Опросы</h1>
            <Link to={`${path}/addpoll`} className="btn btn-sm btn-success mb-2">Добавить опрос <BsPlusCircle /></Link>
            <table className="table table-striped">
                <tbody>
                    {polls && polls.map(poll =>
                        <tr key={poll.id}>
                            <td>{poll.title} {poll.firstName} {poll.lastName}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${poll.id}`} className="btn btn-sm btn-primary mr-1"><BsPencilSquare /></Link>
                                <button onClick={() => deletepoll(poll.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={poll.isDeleting}>
                                    {poll.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span><BsTrash /></span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!polls &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };