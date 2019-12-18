import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

const NavContainer = styled.div`
  width: 60%;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavLink = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3fbfb5;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
`;

const NavBar = () => {
  return (
    <NavContainer>
      <Link to="/table" className="link">
        <NavLink>
          Table
        </NavLink>
      </Link>
      <Link to="/other-display" className="link">
        <NavLink>
          OtherDisplay
        </NavLink>
      </Link>
    </NavContainer>
  );
};

export default NavBar;
