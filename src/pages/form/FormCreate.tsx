import "../../styles/formcreate.css"

import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {userState, spaceState} from "../../commons/Atom";
import {useRecoilState, useRecoilValue} from "recoil";

import logo from "../../assets/ic_logo_hivey.png";
const FormCreate = () => {
    return(
        <div className="form-container">
            <img className="form-logo" src={logo} alt="logo"/>
            <div className="title">
            <span className="title-name">설문지 제목</span>
            </div>

        </div>
    )
}

export default FormCreate;
