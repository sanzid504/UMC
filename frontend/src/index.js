import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminApp from './admin/App';
import StudentApp from './student/App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<StudentApp />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
