import React, { useEffect, useState } from 'react';
import Template from '../components/template';
import { useParams } from 'react-router-dom';
import Spinner from '../components/spinner';
import Button from '../components/Button';

import DynamicInputs from '../components/DynamicInputs';
const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [seatCap,setSeatCap] = useState('')
  const [price,setPrice] = useState('')
  const [output, setOutput] = useState(''); 
  const [form, setForm] = useState([]);

  const handleOutputChange = (jsonString) => {
    console.log(jsonString);
    setOutput(jsonString);
  };

  

  useEffect(() => {
    const getCourse = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4040/admin/course/${id}`);
        const data = await response.json();
        setCourse(data);
        setName(data.name)
        setDescription(data.description)
        setPrice(data.price)
        setForm(data.form)
        setSeatCap(data.seats)    
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, [id]);



  return (
    <Template
      content={
        <>
          {loading ? (
            <div className='flex justify-center items-center'>
              <Spinner />
            </div>
          ) : (
            <form className='flex flex-col'>
            {
                course.status === 'deleted' ? (
                    <div className='p-3 bg-red-800 text-white rounded-md shadow text-md font-semibold'>
                    This course is inactive please active this course to make it available for students.
                </div>
                ) : null
            }
            <div className='flex justify-between items-center my-5'>
                <div className='text-red-800'>Please don't change anything if you don't want to change</div>
                <Button init='Delete' load='deleting' fn={
                    async (e) => {
                        e.preventDefault()
                        try {
                            const response = await fetch(`http://localhost:4040/admin/course/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            const data = await response.json()
                            console.log(data)
                        } catch (error) {
                            console.log(error)
                        }
                    }
                } color='bg-red-800' />
            </div>
            <div>
                <div className="flex justify-between">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                    </label>
                    <span className="text-sm leading-6 text-gray-500" >
                    Required
                    </span>
                </div>
                <div className="mt-2">
                    <input
                    type="text"
                    onChange={
                        (e) => {
                            e.preventDefault()
                            setName(e.target.value)
                        }
                    }
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={name}
                    disabled={loading}
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                    </label>
                    <span className="text-sm leading-6 text-gray-500" >
                    Required
                    </span>
                </div>
                <div className="mt-2">
                    <textarea
                    onChange={
                        (e) => {
                            setDescription(e.target.value)
                     }}
                    type="text"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={description}
                    />
                </div>
            </div>

             <div>
                <div className="flex justify-between">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Price
                    </label>
                    <span className="text-sm leading-6 text-gray-500" >
                    Required
                    </span>
                </div>
                <div className="mt-2">
                    <input
                    type="number"
                    onChange={
                        (e) =>{
                            setPrice(e.target.value)
                        }
                    }
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={price}
                    />
                </div>
            </div>

             <div>
                <div className="flex justify-between">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Seats
                    </label>
                    <span className="text-sm leading-6 text-gray-500" >
                    Required
                    </span>
                </div>
                <div className="mt-2">
                    <input
                    type="text"
                    onChange={
                        (e) => {
                            setSeatCap(e.target.value)
                        }
                    }
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={seatCap}
                    />
                </div>
            </div>
            <DynamicInputs data={form} onOutputChange={handleOutputChange} />
         
            <div className='flex justify-center items-center my-5'>
                <Button 
                fn={async (e) => {
                    e.preventDefault();
                        if(name && description && price && seatCap){
                            const response = await fetch(`http://localhost:4040/admin/course/${id}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    name: name,
                                    description: description,
                                    price: price,
                                    seat: seatCap,
                                    form: output,
                                }
                                )
                            })
                        }else{
                            alert(`Please fill all the fields`)
                        }
                }}      
                init='Update' load='Updating'  type='submit' />
            </div>
      
            </form>
          )}
        </>
      }
      current={'CourseDetails'}
      search={false}
    />
  );
};

export default CourseDetails;
