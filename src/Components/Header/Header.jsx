import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useTheme } from '../ThemeContext/ThemeContext';

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Navbar bg={theme} variant={theme} expand="lg">
      <Container>
        <Navbar.Brand href="#home">Course Registration</Navbar.Brand>
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;