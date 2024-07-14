
import PropTypes from 'prop-types'

const Bookmark = ({bookmark}) => {
    const{course_name,course_credit,price}=bookmark
  return (
    <div className='text-black-500 text-sm font-bold divide'>

        <h4 className='my-2'>{course_name}</h4>
    </div>
  )
}

Bookmark.propTypes = {
     bookmark:PropTypes.object
}

export default Bookmark