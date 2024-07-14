import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Bookmark = ({ bookmark, removeBookmark }) => {
  const { id, course_name, course_credit } = bookmark;

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
        <span>{course_name}</span>
        <span className="badge bg-primary rounded-pill ms-2">{course_credit} credits</span>
      </div>
      <Button variant="danger" size="sm" onClick={() => removeBookmark(id)}>Remove</Button>
    </ListGroup.Item>
  );
};

Bookmark.propTypes = {
  bookmark: PropTypes.object.isRequired,
  removeBookmark: PropTypes.func.isRequired
};

export default Bookmark;