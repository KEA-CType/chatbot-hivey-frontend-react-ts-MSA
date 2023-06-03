export const validateEmail = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};

export const validateSpaceName = (name: string) => {
    const regex = /^[가-힣a-zA-z0-9\s]{4,20}$/;
    return regex.test(name);
}
