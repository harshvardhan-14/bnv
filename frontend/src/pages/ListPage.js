import React from 'react';
import Header from '../components/Header';
import UserTable from '../components/UserTable';
import '../styles/Pages.css';

function ListPage() {
  return (
    <div className="page">
      <Header />
      <main className="page-content">
        <h2 className="page-main-title">User List</h2>
        <UserTable />
      </main>
    </div>
  );
}

export default ListPage;
