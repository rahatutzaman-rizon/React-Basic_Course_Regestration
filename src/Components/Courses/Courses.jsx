import { useEffect } from "react";
import { useState } from "react";
import Course from "../Course/Course";
import PropTypes from 'prop-types'

const Courses = ({handlebookmark}) => {
    const [courses,setCourses]=useState([]);

    useEffect( ()=>{
        fetch('course.json')
        .then(res=>res.json())
        .then(data=> setCourses(data));
        },[])
    return (
        <div className=" grid grid-cols-3 gap-4">
        
        {
          courses.map(course=><Course  
          key={course.id} 
          course={course}
          handlebookmark={handlebookmark}
          ></Course>)
        }
            
        </div>
    );
};

Courses.propTypes={
    handlebookmark:PropTypes.func
}
export default Courses;