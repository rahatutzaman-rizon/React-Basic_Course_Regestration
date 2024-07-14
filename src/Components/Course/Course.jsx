
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaBookmark } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Course = ({ course, handleBookmark }) => {
  const { course_name, image, details, price, course_credit } = course;

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{course_name}</Card.Title>
        <Card.Text>{details}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>${price}</strong>
          </div>
          <div>
            <FaBookmark className="me-2" />
            <span>Credits: {course_credit}</span>
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" onClick={() => handleBookmark(course)}>
          Enroll Now
        </Button>
      </Card.Footer>
    </Card>
  );
};

Course.propTypes = {
  course: PropTypes.shape({
    course_name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    course_credit: PropTypes.number.isRequired,
  }).isRequired,
  handleBookmark: PropTypes.func.isRequired
};

export default Course;