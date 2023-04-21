import { useRoutes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Pending from './pages/Pending';
import Students from './pages/Students';
import NotFound from './pages/NotFound';
import CourseDetails from './pages/CourseDetails';
const AdminRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Dashboard /> },
    { path: 'courses', element: <Course /> },
    { path: 'courses/:id', element: <CourseDetails /> },
    { path: 'pending', element: <Pending /> },   
    { path: 'students', element: <Students />},
    { path: '*', element: <NotFound /> },
  ]);

  return routes;
};

export default AdminRoutes;
