import Template from "../components/template";
import React from "react";
import Button from "../components/Button";
import Modal from "../components/modal";
import { useState,useReducer,useEffect  } from "react";
import { useNavigate } from 'react-router-dom';


const Course = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleCourseClick = (_id) => {
        navigate(`/admin/courses/${_id}`);
      };
    useEffect(() => {
        const getCourses = async () => {
            try {
                setLoading(true)
                const response = await fetch('http://localhost:4040/admin/courses')
                const data = await response.json()
                setCourses(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getCourses()
    }, [])

    const closeModal = () => {
        setIsOpen(false)
    }
    const initialState = {
        name: '',
        description: '',
        seatCap: '',
        price: ''
      };
      
      const formReducer = (state, action) => {
        switch (action.type) {
          case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
          default:
            return state;
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {

            console.log(state)
          const response = await fetch('http://localhost:4040/admin/course', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
          });
      
          const result = await response.json();
          console.log(result);
          closeModal();
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      };
      
      const [state, dispatch] = useReducer(formReducer, initialState);

    return (
        <Template
            content={
                <>
                 <div className="flex justify-between items-center">
                     <div className="text-lg font-semibold mb-10">All courses</div>
                     <Button init="Add Course" 
                        fn={
                            () => {
                                setIsOpen(true)
                            }
                        }
                     />
                 </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {
                            loading ? <div className="text-center">Loading...</div> : courses.map((course) => (
                                <button 
                                onClick={() => handleCourseClick(course._id)}
                                key={course._id} className="p-3 shadow-sm rounded-xl bg-gray-50 border border-gray-300 space-y-3">
                                    <div className="font-semibold text-sm text-blue-800">{course.name}</div>
                                    <div className="font-semibold text-3xl">15/{course.seats}</div>
                                </button>
                            ))
                        }
                </div>
                <Modal isOpen={isOpen} closeModal={closeModal} size="max-w-screen-md">
                    <form>
                        <label>Name</label>
                        <input type="text" 
                        value={state.name} 
                        required
                        onChange={(e) =>
                            dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md p-2" />
                        <label>Description</label>
                        <textarea
                        required 
                        value={state.description} 
                        onChange={(e) =>
                            dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md p-2" />
                        <label>Seat Cap.</label>
                        <input 
                        required
                        value={state.seatCap} 
                        onChange={(e) =>
                            dispatch({ type: 'SET_FIELD', field: 'seatCap', value: e.target.value })
                        }
                        type="number" className="w-full border border-gray-300 rounded-md p-2" />
                        <label>Price</label>
                        <input type="number" 
                        value={state.price} 
                        required
                        onChange={(e) =>
                            dispatch({ type: 'SET_FIELD', field: 'price', value: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md p-2" />
                    <div className="flex justify-center items-center mt-5 ">
                    <Button 
                        init="Submit" 
                        fn={handleSubmit}
                        />
                    </div>
                    </form>
                </Modal> 
                </> 
        }
            current={'Courses'}
            search={false}
        />        
    )
}

export default Course;