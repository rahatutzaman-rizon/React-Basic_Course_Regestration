import React, { useState, useEffect, useCallback, useReducer, useMemo, useTransition } from 'react';
import { Container, Row, Col, Card, Badge, Alert, ProgressBar, Navbar, Nav, ListGroup, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import Courses from './Components/Courses/Courses';
import Bookmarks from './Components/Bookmarks/Bookmarks';
import SearchBar from './Components/SearchBar/SearchBar';
import { ThemeProvider } from './Components/ThemeContext/ThemeContext';
import OnlineStatus from './Components/OnlineStatus/OnlineStatus';

const initialState = {
  bookmarks: [],
  remaining: 20,
  totalCost: 0,
  price: 0
};

function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
        remaining: state.remaining - action.payload.course_credit,
        totalCost: state.totalCost + action.payload.course_credit,
        price: state.price + action.payload.price
      };
    case 'REMOVE_BOOKMARK':
      const removedCourse = state.bookmarks.find(b => b.id === action.payload);
      return {
        ...state,
        bookmarks: state.bookmarks.filter(b => b.id !== action.payload),
        remaining: state.remaining + removedCourse.course_credit,
        totalCost: state.totalCost - removedCourse.course_credit,
        price: state.price - removedCourse.price
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(bookmarkReducer, initialState);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    fetch('course.json')
      .then(res => res.json())
      .then(data => setCourses(data));

    const timer = setInterval(() => {
      setSessionTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBookmark = useCallback((course) => {
    const isExist = state.bookmarks.find((item) => item.id === course.id);

    if (isExist) {
      Swal.fire({
        title: 'Course already added',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (state.totalCost + course.course_credit > 20) {
      Swal.fire({
        title: 'Credit limit exceeded',
        text: 'You cannot add more than 20 credit hours',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    dispatch({ type: 'ADD_BOOKMARK', payload: course });
  }, [state.bookmarks, state.totalCost]);

  const removeBookmark = useCallback((courseId) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: courseId });
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    startTransition(() => {
      // Filter courses based on search term
    });
  }, []);

  const mostExpensiveCourse = useMemo(() => {
    return courses.reduce((max, course) => 
      course.price > max.price ? course : max, courses[0]);
  }, [courses]);

  const filteredCourses = useMemo(() => 
    courses.filter(course =>
      course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [courses, searchTerm]
  );

  return (
    <ThemeProvider>
      <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand href="#home" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
              Course Planner by Rahatutzaman Rizon
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
              <OnlineStatus />
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid className="mt-4">
          <Row className="mb-4">
            <Col md={8}>
              <Card className="shadow-sm" style={{ backgroundColor: '#e6f7ff', borderColor: '#1890ff' }}>
                <Card.Body>
                  <Card.Title className="text-primary">Course Search</Card.Title>
                  <SearchBar onSearch={handleSearch} />
                  {isPending && <Alert variant="info" className="mt-2">Updating list...</Alert>}
                  <Alert variant="secondary" className="mt-2">
                    <strong>Hooks used:</strong> useCallback, useTransition
                    <br />
                    useCallback optimizes the search function, while useTransition improves UI responsiveness during search.
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm" style={{ backgroundColor: '#fffbe6', borderColor: '#faad14' }}>
                <Card.Body>
                  <Card.Title className="text-warning">Session Info</Card.Title>
                  <p>Duration: {sessionTime} seconds</p>
                  <ProgressBar now={(state.totalCost / 20) * 100} label={`${state.totalCost}/20 credits`} variant="warning" />
                  <Alert variant="secondary" className="mt-2">
                    <strong>Hooks used:</strong> useState, useEffect
                    <br />
                    useState manages session time, while useEffect sets up the timer.
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={8}>
              <Card className="shadow-sm" style={{ backgroundColor: '#f6ffed', borderColor: '#52c41a' }}>
                <Card.Body>
                  <Card.Title className="text-success">Available Courses</Card.Title>
                  <Courses 
                    courses={filteredCourses} 
                    handleBookmark={handleBookmark} 
                  />
                  {mostExpensiveCourse && (
                    <Alert variant="info" className="mt-3">
                      Most expensive course: <strong>{mostExpensiveCourse.course_name}</strong>
                    </Alert>
                  )}
                  <Alert variant="secondary" className="mt-2">
                    <strong>Hooks used:</strong> useMemo
                    <br />
                    useMemo optimizes the filtering of courses and calculation of the most expensive course.
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm" style={{ backgroundColor: '#fff1f0', borderColor: '#ff4d4f' }}>
                <Card.Body>
                  <Card.Title className="text-danger">Your Bookmarks</Card.Title>
                  <Bookmarks
                    bookmarks={state.bookmarks}
                    remaining={state.remaining}
                    totalCost={state.totalCost}
                    price={state.price}
                    removeBookmark={removeBookmark}
                  />
                  <Alert variant="warning" className="mt-3">
                    Remaining Credits: <Badge bg="secondary">{state.remaining}</Badge>
                  </Alert>
                  <Alert variant="success">
                    Total Cost: <Badge bg="secondary">${state.price.toFixed(2)}</Badge>
                  </Alert>
                  <Alert variant="secondary" className="mt-2">
                    <strong>Hooks used:</strong> useReducer, useCallback
                    <br />
                    useReducer manages the complex state for bookmarks, while useCallback optimizes the bookmark removal function.
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;