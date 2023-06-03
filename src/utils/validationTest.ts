/**
 * 사용자 회원가입, 로그인 시 입력받는 이메일에 대한 유효성 검사
 */
export const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

/**
 * 스페이스 생성 시 입력하는 스페이스 이름에 대한 유효성 검사
 */
export const validateSpaceName = (name: string) => {
    const regex = /^[가-힣a-zA-z0-9\s]{4,20}$/;
    return regex.test(name);
}

/**
 * 스페이스 참여 시 입력하는 스페이스 참여 코드에 대한 유효성 검사
 */
export const validateAccessCode = (accessCode: string) => {
    const regex = /^[a-zA-z0-9\s]{10,50}$/;
    return regex.test(accessCode);
}
