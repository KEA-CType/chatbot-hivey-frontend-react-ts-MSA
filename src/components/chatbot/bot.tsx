import React from 'react';
import {ThemeProvider} from "styled-components";

// @ts-ignore
import ChatBot from "react-simple-chatbot";

// 테마 설정 객체
const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#1c2433',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#a3bff0',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

// Bot 컴포넌트를 정의
const Bot = ({steps, isVisible}: any) => (
    <div style={{display: isVisible ? 'block' : 'none'}}>
        <ChatBot steps={steps}/>
    </div>
);

// 컴포넌트를 export 
const chatbot = ({steps, isVisible}: any) => (
    // ThemeProvider로 theme를 전달하여 스타일을 적용
    <ThemeProvider theme={theme}>
        <div style={{
            position: 'fixed',
            bottom: '-7rem',
            right: '16rem',
            width: '5rem',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999
        }}>
            {/* Bot 컴포넌트를 렌더링하고 steps와 isVisible 속성을 전달. */}
            <Bot steps={steps} isVisible={isVisible}/>
        </div>
    </ThemeProvider>
);

export default chatbot;
