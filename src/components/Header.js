import React from 'react';
import styled from "styled-components";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import isEmpty from "is-empty";
import { handleLogout } from "../helper/GeneralHelpers";
import { _logoutUser, _setCurrentUser } from "../actions/auth/auth-actions";

const Header = (props) => {
  const { currentUser } = useSelector(state => ({
    currentUser: state.auth.currentUser
  }), shallowEqual)

  const history = useHistory();
  const dispatch = useDispatch()

  const logoutUser = () => {
    handleLogout()
    dispatch(_setCurrentUser(null))
    dispatch(_logoutUser(null))
    history.push(`/`)

  }

  let Links = [
    {
      to: '/home',
      icon: '/images/home-icon.svg',
      label: 'HOME',
    },
    {
      to: '/search',
      icon: '/images/search-icon.svg',
      label: 'SEARCH',
    },
    {
      to: '/watchlist',
      icon: '/images/watchlist-icon.svg',
      label: 'WATCHLIST',
    },
    {
      to: '/originals',
      icon: '/images/original-icon.svg',
      label: 'ORIGINALS',
    },
    {
      to: '/movies',
      icon: '/images/movie-icon.svg',
      label: 'MOVIES',
    },
    {
      to: '/series',
      icon: '/images/series-icon.svg',
      label: 'SERIES',
    },
  ]

  const LinkItem = React.memo((props) => {
    const { link, idx } = props;
    return <Link to={link.to} key={idx}>
      <img src={link.icon} alt={link.label} />
      <span>{link.label}</span>
    </Link>
  })

  return (
    <Nav>
      <Logo onClick={() => history.push("/home")}>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>

      {isEmpty(currentUser && currentUser.user) ? (
        <Login onClick={() => history.push(`/login`)}>Login</Login>
      ) : (
        <>
          <NavMenu>
            {Links.map((item, idx) => <LinkItem link={item} idx={idx} key={idx} />)}
            {/* <Link to="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </Link> */}
            {/* <a>
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a> */}
          </NavMenu>
          <SignOut>
            {/* <DropDown>
              <span>Profile</span>
              <span onClick={logoutUser}>Sign out</span>
            </DropDown> */}
            <UserImg src={currentUser ? currentUser.user && currentUser.user.image : <i className="fa fa-circle"></i>} />

            <ul className="navbar-nav ml-auto">
              <DropDown>
                <NavLink to="/me" className="dropdown-item">Profile</ NavLink>
                <span onClick={logoutUser} className="dropdown-item">Logout</span>
              </DropDown>

            </ul>
          </SignOut>
        </>
      )
      }
    </Nav >
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0 auto 0 25px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    text-decoration: none;

    img {
      height: 24px;
      min-width: 24px;
      width: 24px;
      z-index: auto;
      margin-bottom: 4px;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 16px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 4px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

   @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 360px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000 !important;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.li`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 0.5s;
    }
  }
`;

export default Header;
