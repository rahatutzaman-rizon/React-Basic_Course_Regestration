
import PropTypes from 'prop-types'
import Bookmark from '../Bookmark/Bookmark'
import './Bookmarks.css'
const Bookmarks = ({bookmarks,remaining ,totalCost,price})=> {
  
  return ( 
    <div className='cart-container'>
    <h4 className='text-blue-500 text-2xl font-medium '> Remaining course hour {remaining}</h4>
    {
    bookmarks.map(bookmark=><Bookmark
    key={bookmarks.id}
    bookmark={bookmark}
    
    ></Bookmark>

    )
}
    <h5 className='my-4 divide-y divide-blue-200'> Total credit Hour  {totalCost}</h5>
    <h4 className='divide-lime-600'>Total Price:   {price} usd</h4>
   

    </div>
   
  )
}

Bookmarks.propTypes = { 
    bookmarks:PropTypes.array
}

export default Bookmarks