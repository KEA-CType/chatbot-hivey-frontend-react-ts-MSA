import "../styles/home.css";

import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import icLogo from "../assets/ic_logo.png";
import bgSample from "../assets/bg_sample.jpg";
import profile1 from "../assets/profile_chaeanna.png";
import profile2 from "../assets/profile_namseonwoo.png";
import profile3 from "../assets/profile_maseunghee.png";
import profile4 from "../assets/profile_leejiyeon.png";
import profile5 from "../assets/profile_choiminji.png";

import screenshot1 from "../assets/screenshot_createspace.png";
import screenshot2 from "../assets/screenshot_sidebar.png";
import screenshot3 from "../assets/screenshot_createsurvey.png";
import screenshot4 from "../assets/screenshot_kanbanboard.png";
import screenshot5 from "../assets/screenshot_formresult.png";

const Home = () => {
    const navigate = useNavigate();

    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    /**
     * 스크롤 이벤트를 다루는 함수
     */
    const handleScroll = () => {

        if (window.scrollY >= 4400) {

            setScroll(8);

        } else if (window.scrollY >= 3100) {

            setScroll(7);

        } else if (window.scrollY > 2600) {

            setScroll(6);

        } else if (window.scrollY >= 2100) {

            setScroll(5);

        } else if (window.scrollY >= 1600) {

            setScroll(4);

        } else if (window.scrollY >= 1100) {

            setScroll(3);

        } else if (window.scrollY >= 800) {

            setScroll(2);

        } else if (window.scrollY >= 500) {

            setScroll(1);

        } else {

            setScroll(0);

        }
    }

    /**
     * 로그인 혹은 메인 페이지로 이동하는 버튼
     */
    const handleStartButton = () => {
        // FIXME: JWT 토큰 저장 방법이 변경되면 이후 변경해야 하는 부분
        const jwtToken = localStorage.getItem('jwt-token') || '';

        if (jwtToken !== "" || jwtToken !== null) {
            // 아직 로그인이 안 되어 있다면 로그인 페이지로 이동한다.
            navigate("/login");
        } else {
            // 만약 로그인이 되어 있다면 메인 페이지로 이동한다.
            navigate("/main");
        }
    }

    return (
        <div className="home-overall-container">

            <div className="home-container">

                {/* 타이틀 */}
                <section id="home" className="home-section">
                    <div className="home-skew-border">
                        <div className="home-content-container">
                            <div className="home-title-content" data-wow-duration="700ms">

                                <img className="home-logo-img" src={icLogo} alt="Hivey"/>

                                <h3 className="home-title-content-h3">Hi-touch collaboration with survey through our service!</h3>

                                <h1 className="home-title-content-h1">HiVEY</h1>

                                <div className="home-separator"></div>

                                <p className="home-title-content-p">HiVEY는 여러분에게 조직과 설문의 새로운 기회를 제공합니다.<br/>
                                    HiVEY는 스페이스 안에서 손쉽게 설문을 관리할 수 있도록 지원합니다.<br/>
                                    스페이스에 속한 조직 구성원들은 실시간으로 결과를 확인하고, 체계적으로 정리된 설문 데이터를 확인할 수 있습니다.<br/>
                                    HiVEY와 함께라면 설문 관리의 복잡함을 간소화하여 효율적인 의사 결정과 향상된 조직 문화를 이끌 수 있습니다.</p>

                                <button className="home-start-btn" onClick={handleStartButton}>GET STARTED NOW</button>

                            </div>
                        </div>
                    </div>
                </section>

                {/* 특징 4가지 */}
                <section id="feature" className="home-section">
                    <div className="home-feature-skew-border">
                        <div className="home-content-container">
                            <div className="home-feature-container">
                                <div className={`home-feature ${scroll >= 1 ? "visible" : "invisible"}`}>

                                    <h4 className="home-feature-h4">Space</h4>
                                    <div className="home-feature-separator"></div>

                                    스페이스를 하나의 조직으로 관리할 수 있습니다.
                                    스페이스 안에서 그룹을 만들고, 설문을 생성함으로써 보다 향상된 조직 내 설문 관리를 경험할 수 있습니다.

                                </div>

                                <div className={`home-feature ${scroll >= 1 ? "visible" : "invisible"}`}>

                                    <h4 className="home-feature-h4">Systematic</h4>
                                    <div className="home-feature-separator"></div>

                                    스페이스 내에서 보다 체계적으로 설문을 관리할 수 있습니다.
                                    스페이스 관리자는 물론 구성원 모두 진행 중, 예정, 완료된 설문 목록을 확인할 수 있고, 관리 및 접근할 수 있습니다.

                                </div>

                                <div className={`home-feature ${scroll >= 1 ? "visible" : "invisible"}`}>

                                    <h4 className="home-feature-h4">Simplified</h4>
                                    <div className="home-feature-separator"></div>

                                    복잡한 기능은 존재하지 않습니다.
                                    우리는 "스페이스"와 "설문"에 집중하였습니다.
                                    스페이스 내 설문을 관리하는 기능에 집중해 복잡성을 줄이고, 접근성과 서비스 및 기능의 간소화를 추구하였습니다.

                                </div>

                                <div className={`home-feature ${scroll >= 1 ? "visible" : "invisible"}`}>

                                    <h4 className="home-feature-h4">Swiftly</h4>
                                    <div className="home-feature-separator"></div>

                                    설문이 등록되었을 때도, 설문에 응답을 할 때도, 설문 결과를 볼 때도 당신은 즉시 이 모든 것을 할 수 있습니다.
                                    스페이스 관리자는 물론 구성원 모두 스페이스 내 설문에 빠르게 접근할 수 있습니다.

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 제공하는 서비스 */}
                <section id="service" className="home-section">
                    <div className="home-service-skew-border">
                        <div className="home-content-container">
                            <div className="home-service-container">

                                <div className={`home-service-container-title ${scroll >= 2 ? "visible" : "invisible"}`}>

                                    {/*<h2>HiVEY's Service</h2>*/}

                                </div>

                                {/* #1 */}
                                <div className={`home-service-row ${scroll >= 3 ? "visible" : "invisible"}`}>

                                    <div className="home-service-column">

                                        <h4 className="home-service-column-h4">Make a your special space</h4>

                                        <div className="home-service-separator"></div>

                                        <p className="home-service-column-p">
                                            조직을 위한 스페이스를 만들어 보세요!
                                            스페이스만의 특별한 프로필 이미지와 이름을 지정할 수 있습니다.
                                            당신만의 특별한 스페이스를 만들어 조직원들과 스페이스를 공유해 보세요.
                                            보다 높은 경험을 선사하기 위해 우리는 계속해서 노력할 것입니다.
                                        </p>

                                    </div>

                                    <img className="home-service-img" style={{marginLeft: "3rem"}} src={screenshot1}
                                         alt="service"/>

                                </div>

                                {/* #2 */}
                                <div className={`home-service-row-reverse ${scroll >= 4 ? "visible" : "invisible"}`}>

                                    <img className="home-service-img" style={{marginRight: "5rem"}} src={screenshot2}
                                         alt="service"/>

                                    <div className="home-service-column">

                                        <h4 className="home-service-column-h4">Sidebar for managing spaces</h4>

                                        <div className="home-service-separator"></div>

                                        <p className="home-service-column-p">
                                            당신이 만든 스페이스와 당신이 참여하고 있는 스페이스를 사이드바를 통해 한눈에 확인할 수 있습니다.
                                            사이드바에서 당신은 당신의 프로필과 참여한 스페이스 목록을 역할별로 확인할 수 있습니다.
                                            사이드바에 있는 스페이스 목록 중 특정 스페이스를 클릭하면 해당 스페이스의 메인 페이지로 이동합니다.
                                            자, 이제 당신이 확인하고 싶은 스페이스를 클릭해 보세요!
                                        </p>

                                    </div>

                                </div>

                                {/* #3 */}
                                <div className={`home-service-row ${scroll >= 5 ? "visible" : "invisible"}`}>

                                    <div className="home-service-column">

                                        <h4 className="home-service-column-h4">Make a form for organization.</h4>

                                        <div className="home-service-separator"></div>

                                        <p className="home-service-column-p">
                                            여러분이 속한 조직을 위해 다양하게 이용될 수 있는 설문을 만들어 보세요!
                                            원하는 유형의 질문을 원하는 수만큼 생성할 수 있습니다.
                                            또한 원하는 조직원이 속한 그룹을 선택하여 설문을 효율적으로 이용하는 경험을 얻을 수 있습니다.
                                        </p>

                                    </div>

                                    <img className="home-service-img" style={{marginLeft: "3rem"}} src={screenshot3}
                                         alt="service"/>

                                </div>

                                {/* #4 */}
                                <div className={`home-service-row-reverse ${scroll >= 6 ? "visible" : "invisible"}`}>

                                    <img className="home-service-img" style={{marginRight: "5rem"}} src={screenshot4}
                                         alt="service"/>

                                    <div className="home-service-column">

                                        <h4 className="home-service-column-h4">Manage survey<br/>using kanban board.</h4>

                                        <div className="home-service-separator"></div>

                                        <p className="home-service-column-p">
                                            설문을 관리하는 유능한 매니저로 일할 수 있도록 설문들을 한 눈에 볼 수 있게 제공합니다.
                                            여러 설문들을 볼 수 있는 보드를 이용하여 쾌적하게 설문을 관리하는 경험을 얻어 보세요.
                                            설문 진행 현황, 설문 결과, 참여한 멤버 목록을 확인하여 매니저로서 필요한 행동을 취할 수 있게 돕습니다.
                                        </p>

                                    </div>

                                </div>

                                {/* #5 */}
                                <div className={`home-service-row ${scroll >= 7 ? "visible" : "invisible"}`}>

                                    <div className="home-service-column">

                                        <h4 className="home-service-column-h4">Survey result can be<br/>shared with space member.</h4>

                                        <div className="home-service-separator"></div>

                                        <p className="home-service-column-p">
                                            설문에 참여한 멤버들과 설문 결과를 공유할 수 있습니다.
                                            이는 빠른 의사결정으로 시간을 절약하고 업무의 효율을 향상시키며 멤버들 간의 신뢰성을 높일 것입니다.
                                            멤버와의 빠른 공유는 더욱 높은 만족을 선사할 것이라고 약속합니다.
                                        </p>

                                    </div>

                                    <img className="home-service-img" style={{marginLeft: "3rem"}} src={screenshot5}
                                         alt="service"/>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 팀 소개 */}
                <section id="team" className="home-team">
                    <div className="home-team-skew-border">
                        <div className="home-content-container">
                            <div className="home-team-container">

                                <h2 className="home-team-container-h2">Development Team</h2>

                                <div className="home-team-subtitle">
                                    Gachon University's 2nd KEA C Type
                                </div>

                                <div className="home-team-content">
                                    <ul className="home-team-content-ul">
                                        <li className="home-team-content-li">

                                            <div className="home-team-img-wrapper">
                                                <img className="home-team-img" src={profile1} alt=""/>
                                            </div>

                                            <div className="home-team-information-container">
                                                <h4 className="home-team-information-h4">채안나</h4>
                                                <p className="home-team-information-p">PM, Front-end, Back-end</p>
                                            </div>

                                        </li>
                                        <li className="home-team-content-li">

                                            <div className="home-team-img-wrapper">
                                                <img className="home-team-img" src={profile2} alt=""/>
                                            </div>

                                            <div className="home-team-information-container">
                                                <h4 className="home-team-information-h4">남선우</h4>
                                                <p className="home-team-information-p">Front-end, Back-end</p>
                                            </div>

                                        </li>
                                        <li className="home-team-content-li">

                                            <div className="home-team-img-wrapper">
                                                <img className="home-team-img" src={profile3} alt=""/>
                                            </div>

                                            <div className="home-team-information-container">
                                                <h4 className="home-team-information-h4">마승희</h4>
                                                <p className="home-team-information-p">Front-end, Back-end</p>
                                            </div>

                                        </li>
                                        <li className="home-team-content-li">

                                            <div className="home-team-img-wrapper">
                                                <img className="home-team-img" src={profile4} alt=""/>
                                            </div>

                                            <div className="home-team-information-container">
                                                <h4 className="home-team-information-h4">이지연</h4>
                                                <p className="home-team-information-p">Architecture Engineer</p>
                                            </div>

                                        </li>
                                        <li className="home-team-content-li">

                                            <div className="home-team-img-wrapper">
                                                <img className="home-team-img" src={profile5} alt=""/>
                                            </div>

                                            <div className="home-team-information-container">
                                                <h4 className="home-team-information-h4">조민지</h4>
                                                <p className="home-team-information-p">Front-end</p>
                                            </div>

                                        </li>
                                    </ul>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>

                {/* 시작 버튼 */}
                <section id="trial" className="home-trial" data-wow-duration="2s" data-wow-dealy="1.5s">
                    <div className="home-content-container">
                        <div className="home-trial-container">

                            <h2 className={`home-trial-title ${scroll >= 8 ? "visible" : "invisible"}`}>Let's Get
                                Started Now!</h2>

                            <button className="home-start-btn" onClick={handleStartButton}>GET STARTED NOW</button>

                        </div>
                    </div>
                </section>

                {/* 마지막 부분 */}
                <section className="home-footer">
                    <div className="home-content-container">
                        <div className="home-footer-container">
                            <div className="home-copyright">

                                <p className="home-copyright-p" data-wow-duration="1s">Made by C Type 2023. All Rights Reserved.</p>

                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default Home;
