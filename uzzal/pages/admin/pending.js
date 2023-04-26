import Template from "../../components/template";
import React from "react";
import Table from "../../components/table";
import { useEffect, useState } from "react";
const Pending = () => {
    const [pending, setPendingUsers] = useState([]);
    useEffect(() => {
      const getPendingUsers = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pending`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await res.json();
        console.log(data)
        setPendingUsers(data);
      };
      getPendingUsers();
    }, []);
    async function handleApprove(_id){
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/pending`, {
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                _id
              })
            })
          }

    
      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'phone', label: 'Phone' },
        { key: 'course', label: 'Course' },
        { key: 'TRX_ID', label: 'TRX_ID' },
      ];
    
      const actionButton = {
        label: 'Approve All',
        onClick: async () => {
          // Implement the onClick logic here, e.g., open a modal to add a new user
          console.log('Add user button clicked');
        },
      };
    return (
        <Template
            content={
                <>
                 <Table data={pending} columns={columns} actionButton={actionButton} H1={'Pending Users'} text={'All of the pending users with their trasaction ID please varify them to continue the course.'} 
                 fn={handleApprove}
                 />
                </>
            }
            current={'Pending'}
            search={false}
        />        
    )
}

export default Pending;