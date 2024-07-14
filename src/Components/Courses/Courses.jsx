import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Course from '../Course/Course';
import PropTypes from 'prop-types';

const Courses = ({ courses, handleBookmark }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {courses.map(course => (
        <Col key={course.id}>
          <Course course={course} handleBookmark={handleBookmark} />
        </Col>
      ))}
    </Row>
  );
};

Courses.propTypes = {
  courses: PropTypes.array.isRequired,
  handleBookmark: PropTypes.func.isRequired
};

export default Courses;