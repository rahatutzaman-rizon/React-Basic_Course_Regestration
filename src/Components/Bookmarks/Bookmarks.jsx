import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Bookmark from '../Bookmark/Bookmark';
import { useTheme } from '../ThemeContext/ThemeContext';

const Bookmarks = ({ bookmarks, remaining, totalCost, price, removeBookmark }) => {
  const { theme } = useTheme();

  return (
    <Card bg={theme} text={theme === 'dark' ? 'light' : 'dark'}>
      <Card.Body>
        <Card.Title>Course Summary</Card.Title>
        <Card.Text>Remaining credit hours: {remaining}</Card.Text>
        <ListGroup variant="flush">
          {bookmarks.map(bookmark => (
            <Bookmark 
              key={bookmark.id} 
              bookmark={bookmark} 
              removeBookmark={removeBookmark}
            />
          ))}
        </ListGroup>
        <Card.Text className="mt-3">Total credit hours: {totalCost}</Card.Text>
        <Card.Text>Total Price: ${price}</Card.Text>
        <Button variant="success" className="mt-3">Checkout</Button>
      </Card.Body>
    </Card>
  );
};

Bookmarks.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  remaining: PropTypes.number.isRequired,
  totalCost: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  removeBookmark: PropTypes.func.isRequired
};

export default Bookmarks;