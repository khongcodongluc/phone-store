import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo.svg";
import { ButtonContainer } from "./Button";

const NavWrapper = styled.nav`
  background-color: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize !important;
  }
`;

function Navbar() {
  return (
    <NavWrapper className="navbar navbar-expand-sm px-sm-5">
      <Link to="/">
        <img src={logo} alt="logo" className="navbar-brand" />
      </Link>
      <ul className="navbar-nav align-items-center">
        <li className="nav-item ml-5">
          <Link to="/" className="nav-link">
            products
          </Link>
        </li>
      </ul>

      <Link to="/cart" className="ml-auto">
        <ButtonContainer>
          <span className="mr-2">
            <FontAwesomeIcon icon={faCartPlus} />
          </span>
          My Cart
        </ButtonContainer>
      </Link>
    </NavWrapper>
  );
}

export default Navbar;
