import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {RecoilRoot} from "recoil";

import Userbar from "./components/Userbar";
import Refresh from "./components/Refresh";

import Home from "./pages/Home";
import Main from "./pages/Main";

import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import UserSetting from "./pages/user/UserSetting";

import SpaceEnter from "./pages/space/SpaceEnter";
import SpaceCreate from "./pages/space/SpaceCreate";
import SpaceForMember from "./pages/space/SpaceForMember";
import SpaceForLeader from "./pages/space/SpaceForLeader"

import FormCreate from "./pages/form/FormCreate";
import FormAnswer from "./pages/form/FormAnswer";
import FormResult from "./pages/form/FormResult";

function App() {

    return (
        <RecoilRoot>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/form/create" element={<FormCreate/>}/>
                    <Route path="/form/answer" element={<FormAnswer/>}/>
                    <Route path="/space/:spaceId/form/:formId/result" element={<FormResult/>}/>
                    <Route
                        path="/*"
                        element={
                            <div style={{display: "flex"}}>
                                <Userbar/>
                                <div style={{flexGrow: 1, marginLeft: "200px"}}>
                                    <Routes>
                                        <Route path="/space/enter" element={<SpaceEnter/>}/>
                                        <Route path="/space/create" element={<SpaceCreate/>}/>
                                        <Route path="/main" element={<Main/>}/>
                                        <Route path="/space/member/:spaceId" element={<SpaceForMember/>}/>
                                        <Route path="/space/leader/:spaceId" element={<SpaceForLeader/>}/>
                                        <Route path="/refresh" element={<Refresh/>}/>
                                        <Route path="/user/setting" element={<UserSetting/>}/>
                                    </Routes>
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
