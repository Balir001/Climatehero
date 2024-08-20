import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import { useState } from "react";
import "./Header.css"

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      color: 'blue',
    },
});

export const Header = () => {
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const toggleAboutDropdown = () => {
        setIsAboutOpen(!isAboutOpen);
    };

    return (
        <header className="header">
            <div className="logo">Logo</div>
            <nav className="headerContent">
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/ecohall">Eco-Hall</StyledLink>
                <StyledLink to="/climate-watch">Climate Watch</StyledLink>
                <StyledLink to="/emailauthentication">Authenticate</StyledLink>
                
                <div className="dropdown">
                    <button className={`dropbtn ${isAboutOpen ? 'open' : ''}`} onClick={toggleAboutDropdown}>
                        About us
                        <span className="arrow"></span>
                    </button>
                    {isAboutOpen && (
                        <div className="dropdown-content">
                            <StyledLink to="/about/team">Our Team</StyledLink>
                            <StyledLink to="/about/mission">Our Mission</StyledLink>
                            <StyledLink to="/about/contact">Contact Us</StyledLink>
                        </div>
                    )}
                </div>
            </nav>
            <div className="sign-in">
                <StyledLink to="/signin">Sign In</StyledLink>
            </div>
        </header>
    );
}