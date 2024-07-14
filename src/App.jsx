import  { useState, useEffect, useCallback, useReducer, useMemo, useTransition } from 'react';
import { Container, Row, Col, Card, Badge, Alert, ProgressBar, Navbar, Nav } from 'react-bootstrap';
import Swal from 'sweetalert2';

import Courses from './Components/Courses/Courses';
import Header from './Components/Header/Header';
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
      // This is wrapped in startTransition to avoid blocking the UI
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
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Course Planner With Rahatutzaman Rizon</Navbar.Brand>
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
            <Card>
              <Card.Body>
                <Card.Title>Course Search</Card.Title>
                <SearchBar onSearch={handleSearch} />
                {isPending && <Alert variant="info" className="mt-2">Updating list...</Alert>}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Session Info</Card.Title>
                <p>Duration: {sessionTime} seconds</p>
                <ProgressBar now={(state.totalCost / 20) * 100} label={`${state.totalCost}/20 credits`} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>Available Courses</Card.Title>
                <Courses 
                  courses={filteredCourses} 
                  handleBookmark={handleBookmark} 
                />
                {mostExpensiveCourse && (
                  <Alert variant="info" className="mt-3">
                    Most expensive course: <strong>{mostExpensiveCourse.course_name}</strong>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Your Bookmarks</Card.Title>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default App;