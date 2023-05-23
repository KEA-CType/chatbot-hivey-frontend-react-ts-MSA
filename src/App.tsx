import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import EnterSpace from "./pages/EnterSpace";
import CreateSpace from "./pages/CreateSpace";
import Chatbot from "./components/chatbot/chatbot";
import MainSpaceForMember from "./pages/space/MainSpaceForMember";
import {RecoilRoot} from "recoil";
import MainSpaceForLeader from "./pages/space/MainSpaceForLeader"
import Userbar from "./components/userbar";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    {/* 유저바가 필요한 컴포넌트 */}
                    <Route
                        path="/*"
                        element={
                            <div style={{display: "flex"}}>
                                <Userbar />
                                <div style={{flexGrow: 1, marginLeft: "200px"}}>
                                    <Routes>
                                        <Route path="/enterspace" element={<EnterSpace/>}/>
                                        <Route path="/createspace" element={<CreateSpace/>}/>
                                        <Route path="/main" element={<MainPage/>}/>
                                        <Route path="/space/member" element={<MainSpaceForMember/>}/>
                                        <Route path="/space/leader" element={<MainSpaceForLeader/>}/>
                                    </Routes>
                                </div>
                                <Chatbot/>
                            </div>
                        }
                    />
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
