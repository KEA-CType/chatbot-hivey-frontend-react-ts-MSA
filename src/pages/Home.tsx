import '../styles/home.css';

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/buttons';

import backgroundImage from '../assets/bg_triangles_top.png';

const Home = () => {
  return (
    <div className="home-container">
      <img className="background" src={backgroundImage} alt="Logo" />
      <div className="home-box">
          A survey space for everyone
          <br/>
          <br/>
          <br/>
          Gather opinion
          <br/>
          from your team!
          <Link to="/Login">
            <Button 
              className="HomeButtons"
              text="Start" 
              shape="rounded"/>
          </Link>
      </div>
    </div>
  );
};

export default Home;
