import Template from "../components/template";
import React from "react";
import Table from "../components/table";
const Pending = () => {
    const data = [
        {
          id: 1,
          name: 'John',
          title: 'Developer',
          email: 'john@example.com',
          role: 'Admin',
        },
        // ...more data
      ];
    
      const columns = [
        { key: 'name', label: 'Name' },
        { key: 'title', label: 'Title' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
      ];
    
      const actionButton = {
        label: 'Add user',
        onClick: async () => {
          // Implement the onClick logic here, e.g., open a modal to add a new user
          console.log('Add user button clicked');
        },
      };
    return (
        <Template
            content={
                <>
                 <Table data={data} columns={columns} actionButton={actionButton} />
                </>
            }
            current={'Pending'}
            search={false}
        />        
    )
}

export default Pending;