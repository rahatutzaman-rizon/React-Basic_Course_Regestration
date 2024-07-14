import  { useRef, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control
          ref={inputRef}
          placeholder="Search for courses"
          aria-label="Search for courses"
          onChange={(e) => onSearch(e.target.value)}
        />
      </InputGroup>
    </Form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;