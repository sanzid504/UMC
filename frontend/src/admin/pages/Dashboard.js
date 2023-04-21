import React from 'react';
import Template from '../components/template';
const stats = [
    { name: 'Courses', value:'5' },
    { name: 'Students', value: '12500',  },
    { name: 'Pending', value: '500',  },
    { name: 'Seats', value: '1500', },
  ]
const Dashboard = () => {
  return (
    <Template
      content={
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
        {
         stats.map((stat) => (
             <div className='p-3 rounded-lg shadow-md '>
                 <div className='font-semibold text-xs text-blue-800'>{stat.name}</div>
                 <div className='font-bold text-3xl'>{stat.value}</div>
             </div>
             ))
        }
  </div>
      }
      current={'Dashboard'}
      search={true}
    />
  );
};

export default Dashboard;
