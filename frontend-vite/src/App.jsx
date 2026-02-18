import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';

import ErrorBoundary from './components/ErrorBoundary.jsx';
import ListPage from './pages/ListPage.jsx';
import AddPage from './pages/AddPage.jsx';
import EditPage from './pages/EditPage.jsx';
import ViewPage from './pages/ViewPage.jsx';

console.log('All imports successful');
console.log('ListPage:', ListPage);
console.log('AddPage:', AddPage);
console.log('EditPage:', EditPage);
console.log('ViewPage:', ViewPage);

const App = () => {
  console.log('Rendering App...');
  
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="app">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/view/:id" element={<ViewPage />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
