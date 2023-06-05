import "../styles/home.css";

import "../assets/template/bootstrap.min.css";
import "../assets/template/style.css";

import React from "react";

import icLogo from "../assets/ic_logo.png";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

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
        <div className="culmn">
            <section id="home" className="home">
                <div className="home_skew_border">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="main_home_slider text-center">
                                    <div className="single_home_slider">
                                        <div className="main_home wow fadeInUp" data-wow-duration="700ms">

                                            <img style={{width: "3rem", height: "auto", marginBottom: "2rem"}} src={icLogo} alt="Hivey"/>

                                            <h3>Hi-touch collaboration with survey through our service!</h3>

                                            <h1>HiVEY</h1>

                                            <div className="separator"></div>

                                            <p>HiVEY는 여러분에게 조직과 설문의 새로운 기회를 제공합니다.
                                                HiVEY는 스페이스 안에서 손쉽게 설문을 관리할 수 있도록 지원합니다.
                                                스페이스에 속한 조직 구성원들은 실시간으로 결과를 확인하고, 체계적으로 정리된 설문 데이터를 확인할 수 있습니다.
                                                HiVEY와 함께라면 설문 관리의 복잡함을 간소화하여 효율적인 의사 결정과 향상된 조직 문화를 이끌 수 있습니다.</p>

                                            <div className="home_btn">
                                                <button className="btn btn-lg m_t_10" onClick={handleStartButton}>GET STARTED NOW</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="feature" className="feature sections">
                <div className="container">
                    <div className="row">
                        <div className="main_feature text-center">
                            <div className="col-sm-3">
                                <div className="single_feature">

                                    <h4>Space</h4>
                                    <div className="separator3"></div>
                                    <p>스페이스를 하나의 조직으로 관리할 수 있습니다.
                                        스페이스 안에서 그룹을 만들고, 설문을 생성함으로써 보다 향상된 조직 내 설문 관리를 경험할 수 있습니다.</p>

                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="single_feature">

                                    <h4>Systematic</h4>
                                    <div className="separator3"></div>
                                    <p>스페이스 내에서 보다 체계적으로 설문을 관리할 수 있습니다.
                                        스페이스 관리자는 물론 구성원 모두 진행 중, 예정, 완료된 설문 목록을 확인할 수 있고, 관리 및 접근할 수 있습니다.</p>

                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="single_feature">

                                    <h4>Simplified</h4>
                                    <div className="separator3"></div>
                                    <p>복잡한 기능은 존재하지 않습니다.
                                        우리는 "스페이스"와 "설문"에 집중하였습니다.
                                        스페이스 내 설문을 관리하는 기능에 집중해 복잡성을 줄이고, 접근성과 서비스 및 기능의 간소화를 추구하였습니다.</p>

                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="single_feature">

                                    <h4>Swiftly</h4>
                                    <div className="separator3"></div>
                                    <p>설문이 등록되었을 때도, 설문에 응답을 할 때도, 설문 결과를 볼 때도 당신은 즉시 이 모든 것을 할 수 있습니다.
                                        스페이스 관리자는 물론 구성원 모두 스페이스 내 설문에 빠르게 접근할 수 있습니다.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="service" className="service">
                <div className="container-fluid">
                    <div className="row">
                        <div className="main_service">
                            <div className="col-md-6 col-sm-12 no-padding">
                                <div className="single_service single_service_text text-right">

                                    <div className="head_title">

                                        <h2>HiVEY's Service</h2>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-12 col-sm-10 col-xs-10 margin-bottom-60">

                                            <div className="row">

                                                <div className="col-sm-10 col-sm-offset-1 col-xs-9 col-xs-offset-1">

                                                    <article className="single_service_right_text">

                                                        <h4>WEB DESIGN</h4>

                                                        <p>Lorem Ipsum is simply dummy text of the printing and
                                                            typesetting
                                                            industry.
                                                            Lorem Ip sum has been the industry's standard dummy text
                                                            ever.</p>

                                                    </article>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-12 col-sm-10 col-xs-10 margin-bottom-60">

                                            <div className="row">

                                                <div className="col-sm-10 col-sm-offset-1 col-xs-9 col-xs-offset-1">

                                                    <article className="single_service_right_text">

                                                        <h4>PRINT DESIGN</h4>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and
                                                            typesetting
                                                            industry.
                                                            Lorem Ip sum has been the industry's standard dummy text
                                                            ever.</p>

                                                    </article>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-12 col-sm-10 col-xs-10 margin-bottom-60">

                                            <div className="row">

                                                <div
                                                    className="col-sm-10 col-sm-offset-1 col-xs-9 col-xs-offset-1 margin-bottom-20">

                                                    <article className="single_service_right_text">

                                                        <h4>PHOTOGRAPHY</h4>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and
                                                            typesetting
                                                            industry.
                                                            Lorem Ip sum has been the industry's standard dummy text
                                                            ever.</p>

                                                    </article>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-sm-12 no-padding">

                                <figure className="single_service single_service_img">

                                    <div className="overlay-img"></div>

                                    <img src="assets/images/servicerightimg.jpg" alt=""/>

                                </figure>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="team" className="team">
                <div className="main_team_area">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">

                                <div className="head_title textwhite text-center margin-top-80">

                                    <h2>Development Team</h2>

                                    <div className="subtitle">
                                        Gachon University's 2nd KEA C Type
                                    </div>

                                    <div className="separator"></div>

                                </div>

                                <div className="main_team">
                                    <ul>
                                        <li>

                                            <div className="single_team_img">
                                                <img src="assets/images/team1.jpg" alt=""/>
                                            </div>

                                            <div className="single_team_text">
                                                <h4>채안나</h4>
                                                <p>PM, Front-end, Back-end</p>
                                            </div>

                                        </li>
                                        <li>

                                            <div className="single_team_img">
                                                <img src="assets/images/team2.jpg" alt=""/>
                                            </div>
                                            <div className="single_team_text">
                                                <h4>남선우</h4>
                                                <p>Front-end, Back-end</p>
                                            </div>

                                        </li>
                                        <li>

                                            <div className="single_team_img">
                                                <img src="assets/images/team3.jpg" alt=""/>
                                            </div>
                                            <div className="single_team_text">
                                                <h4>마승희</h4>
                                                <p>Front-end, Back-end</p>
                                            </div>

                                        </li>
                                        <li>

                                            <div className="single_team_img">
                                                <img src="assets/images/team4.jpg" alt=""/>
                                            </div>
                                            <div className="single_team_text">
                                                <h4>이지연</h4>
                                                <p>Architecture Engineer</p>
                                            </div>

                                        </li>
                                        <li>

                                            <div className="single_team_img">
                                                <img src="assets/images/test2.jpg" alt=""/>
                                            </div>
                                            <div className="single_team_text">
                                                <h4>조민지</h4>
                                                <p>Front-end</p>
                                            </div>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="trial" className="trial text-center wow fadeIn" data-wow-duration="2s" data-wow-dealy="1.5s">
                <div className="main_trial_area">
                    <div className="video_overlay sections">
                        <div className="container">
                            <div className="row">
                                <div className="main_trial">
                                    <div className="col-sm-12">

                                        <h2>Let's Get Started Now. <span>It's FREE!</span></h2>
                                        <h4>30 day free trial. Free plan allows up to 2 projects. Pay if you need more.
                                            Cancel anytime. No catches.</h4>

                                        <button className="btn btn-lg" onClick={handleStartButton}>GET STARTED NOW</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="main_footer">
                                <div className="row">
                                    <div className="col-sm-6 col-xs-12">
                                        <div className="copyright_text">

                                            <p className=" wow fadeInRight" data-wow-duration="1s">Made with <i
                                                className="fa fa-heart"></i> by <a href="http://bootstrapthemes.co">Bootstrap
                                                Themes</a>2016. All Rights Reserved</p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
