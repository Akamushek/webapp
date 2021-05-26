import React from 'react';

function Overview({ match }) {
    const { path } = match;

    return (
        <div>
            <h1>Админ</h1>
            <p>Доступ к этому разделу могут получить только администраторы.</p>
        </div>
    );
}

export { Overview };