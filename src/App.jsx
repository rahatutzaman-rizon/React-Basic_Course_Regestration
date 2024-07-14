
import { useState} from 'react'
import './App.css'
import Courses from './Components/Courses/Courses'
import Header from './Components/Header/Header'
import Bookmarks from './Components/Bookmarks/Bookmarks';
import Swal from "sweetalert2/src/sweetalert2.js";


function App() {

  const [bookmarks,setBookmarks]=useState([]);
  
  const [remaining, setRemaining] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [price,setPrice]=useState(0);

  


  const handlebookmark=(course)=>{
    // const newbookmark=[...bookmarks,id]
    // setBookmarks(newbookmark);
    const isExist = bookmarks.find((item) => item.id == course.id);
    
    let cost=course.course_credit;
    let pr=course.price;
    if (isExist) {
      Swal.fire({
        title: 'NoT ENTER',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } else {

      bookmarks.forEach((item)=>{
        cost=cost+item.course_credit;
        pr=pr+item.price;
      });


      const remaining=20-cost;

      if(cost >20){
        Swal.fire({
          title: 'it is so much high',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }
     else{
      setRemaining(remaining);

      setTotalCost(cost);

      setPrice(pr)
      setBookmarks([...bookmarks,course])
     }


   
    }
  };




    

  


  return (
    <>
     <Header></Header>
     <div className='flex'>
     <Courses handlebookmark={handlebookmark}></Courses>
     <Bookmarks bookmarks={bookmarks}
     
            remaining={remaining}
            totalCost={totalCost}
            price={price}
     ></Bookmarks>
     </div>
      
    </>
  )
}

export default App


