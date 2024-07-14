import './Course.css';
import { FaBookmark} from 'react-icons/fa';
import PropTypes from 'prop-types'

const Course = ({course,handlebookmark})=> {
  const {course_name,image,details,price,course_credit}=course
  return (
 
<div className="course-card ">
    <img src={image} alt="Course Image"/>
    <h2 className="course-name">{course_name}</h2>
    <h2 className='text-sm'>{details}</h2>
   <div className='flex justify-between'>

   <div className='flex my-4'>
   <span className='font-xl'>$</span>
   <p className="price">Price: {price}</p>
   </div>
   <div>
   <div className='flex my-4'>
   <FaBookmark />
   <p className="credit">Credits: {course_credit}</p>
   </div>
   </div>
  
    

   </div>
   <div>
   <button onClick={()=>handlebookmark(course)} className="enroll-button my-6">Enroll Now </button>
   </div>
    
</div>

    

  )
}

Course.propTypes = {
  course:PropTypes.object.isRequired,
  handlebookmark:PropTypes.func
}

export default Course