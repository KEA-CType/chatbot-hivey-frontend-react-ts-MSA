import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Main from "./pages/Main";
import SpaceEnter from "./pages/space/SpaceEnter";
import SpaceCreate from "./pages/space/SpaceCreate";
import SpaceForMember from "./pages/space/SpaceForMember";
import {RecoilRoot} from "recoil";
import SpaceForLeader from "./pages/space/SpaceForLeader"
import Userbar from "./components/Userbar";
import React from "react";
import Refresh from "./components/Refresh";
import Home from "./pages/Home";

function App() {

    return (
        <RecoilRoot>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
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
                                        <Route path="/refresh" element={<Refresh />}/>
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
