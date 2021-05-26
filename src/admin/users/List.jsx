import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {BsPencilSquare, BsTrash, BsPersonPlus} from 'react-icons/bs'

import { accountService } from "@/_services";

function List({ match }) {
  const { path } = match;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    accountService.getAll().then((x) => setUsers(x));
  }, []);

  function deleteUser(id) {
    setUsers(
      users.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    accountService.delete(id).then(() => {
      setUsers((users) => users.filter((x) => x.id !== id));
    });
  }

  return (
    <div>
      <h1>Пользователи</h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Добавить пользователя <BsPersonPlus />
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Имя</th>
            <th style={{ width: "30%" }}>Почта</th>
            <th style={{ width: "30%" }}>Роль</th>
            <th style={{ width: "10%" }}></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.title} {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${user.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    <BsPencilSquare />
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-sm btn-danger"
                    style={{ width: "60px" }}
                    disabled={user.isDeleting}
                  >
                    {user.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span><BsTrash /></span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {!users && (
            <tr>
              <td colSpan="4" className="text-center">
                <span className="spinner-border spinner-border-lg align-center"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export { List };
