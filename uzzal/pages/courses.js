import { useState, useEffect } from 'react'
import withAuth from '@/components/withAuth'
import Spinner from '@/components/spinner'
import Modal from '@/components/modal'
import ReadOnlyDynamicInputs from '@/components/ReadOnlyInputs'
import Button from '@/components/Button'
import { toast } from 'react-toastify';
function Courses() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState('');
    const [course,setCourse] = useState(null)
    const [user, setUser] = useState(null)
    const [TRX_ID, setTRX_ID] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const handleOutputChange = (updatedFormData) => {
        setFormData(updatedFormData);
      };
    useEffect(() => {
      const getCourses = async () => {
          try {
              setLoading(true)
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
              })
              const data = await response.json()
              console.log(response)
              setCourses(data)
              setLoading(false)
          } catch (error) {
              console.log(error)
          }
      }
      getCourses()
  }, [])
  useEffect(() => {
    const getUser = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:4040/user',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            const data = await response.json()
            setUser(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    getUser()
}, [])
  const [featuredCourse, setFeaturedCourse] = useState(null);

useEffect(() => {
  if (courses && courses.length > 0) {
    const featuredCourseIdx = Math.floor(Math.random() * courses.length);
    const selectedFeaturedCourse = courses[featuredCourseIdx];
    setFeaturedCourse(selectedFeaturedCourse);
    courses.splice(featuredCourseIdx, 1);
  }
}, [courses]);
    return (
          <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
   
          <div className=" lg:flex lg:flex-1 lg:justify-end">
            <span className='text-sm font-semibold leading-6 text-gray-900'>{user ? user.name : <Spinner />}</span>
          </div>
        </nav>
      </header>

      <main>
        {/* Testimonials section */}
        <div className="relative isolate pt-20">
          <svg
            className="absolute inset-0 -z-10 hidden h-full w-full stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] sm:block"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="55d3d46d-692e-45f2-becd-d8bdc9344f45"
                width={200}
                height={200}
                x="50%"
                y={0}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={0} className="overflow-visible fill-gray-50">
              <path
                d="M-200.5 0h201v201h-201Z M599.5 0h201v201h-201Z M399.5 400h201v201h-201Z M-400.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#55d3d46d-692e-45f2-becd-d8bdc9344f45)" />
          </svg>
          <div className="relative">
            <div
              className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
              aria-hidden="true"
            >
              <div
                className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div
              className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-8 opacity-25 blur-3xl xl:justify-end"
              aria-hidden="true"
            >
              <div
                className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] xl:ml-0 xl:mr-[calc(50%-12rem)]"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-xl sm:text-center">
                <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Courses</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our cutting edge courses are designed to help you achieve your goals.
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
              {featuredCourse && (
                <button 
                onClick={
                    () => {
                        setCourse(featuredCourse)
                        setIsOpen(true)
                        }
                  }
                className=" col-span-2 hidden sm:block sm:rounded-2xl sm:bg-white sm:shadow-lg sm:ring-1 sm:ring-gray-900/5 xl:col-start-2 xl:row-end-1">
                  <blockquote className="p-12 text-xl font-semibold leading-8 tracking-tight text-gray-900">
                    <p>{`“${featuredCourse.description}”`}</p>
                  </blockquote>
                  <figcaption className="flex items-center justify-between gap-x-4 border-t border-gray-900/10 px-6 py-4">
                    <div>
                      <div className="font-semibold">{featuredCourse.name}</div>
                      <div className="text-gray-600">{`Seats: ${featuredCourse.seats}, Price: ৳${featuredCourse.price}`}</div>
                    </div>
                        {
                    featuredCourse.enrolled != null &&  <div className={`rounded-full inline-flex px-2 py-1 text-xs font-semibold shadow  text-white ${featuredCourse.enrolled == 'approved' ? 'bg-green-800' : 'bg-red-900'}`}>
                                                {featuredCourse.enrolled}
                                                 </div>
                    }
                  </figcaption>
                </button>
              )}

              {courses.map((course, idx) => (
                <button
                  onClick={
                    () => {
                           if(course.enrolled != 'approved'){
                            setCourse(course)
                            setIsOpen(true)
                           }
                        }
                  }
                  key={course._id}
                  className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 "
                >
                  <blockquote className="text-gray-900">
                    <p>{`“${course.description}”`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-between gap-x-4">
                    <div>
                      <div className="font-semibold">{course.name}</div>
                      <div className="text-gray-600">{`Seats: ${course.seats}, Price: ৳${course.price}`}</div>
                    </div>
                {
                  course.enrolled != null &&  <div className={`rounded-full inline-flex px-2 py-1 text-xs font-semibold shadow  text-white ${course.enrolled == 'approved' ? 'bg-green-800' : 'bg-red-900'}`}>
                        {course.enrolled}
                    </div>
                }
                  </figcaption>
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>
        <Modal size={'max-w-screen-sm'} closeModal={() => setIsOpen(false)} isOpen={isOpen}> 
                  {
                    course ? 
                     course.enrolled == 'pending' ?
                    <div className='p-3 text-sm font-semibold text-center'>Are you sure you want to request again?</div> : null
                    : <Spinner />
                  }  
                 <ReadOnlyDynamicInputs data={course ? course.form : null} onOutputChange={handleOutputChange}/>
                 <label className='text-sm font-semibold'>TRX_ID</label>
                 <input  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required  
                  onChange={
                        (e) => {
                           setTRX_ID(e.target.value)
                        }
                 }/> 
                 <div className='flex justify-center items-center'>
                    <button
                    onClick={
                        async () => {
                            try{
                                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/enroll`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    },
                                    body: JSON.stringify({
                                        course_id: course._id,
                                        form: formData,
                                        TRX_ID,
                                    })    
                            })
                            const response = await res.json()
                            if(response){
                                toast.success('Requested successfully')
                                setIsOpen(false)
                            }else{
                                toast.error(response.message)
                            }
                            }catch(e){
                                console.log(e)
                            }
                        }
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  mt-5"> 
                        Enroll
                        </button>
                 </div>
        </Modal>        
      </main>
      </div>
    )
  }
  
export default withAuth(Courses)