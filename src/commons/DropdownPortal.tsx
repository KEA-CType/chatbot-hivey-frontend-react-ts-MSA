import ReactDOM from 'react-dom';

const DropdownPortal = ({children}: any) => {
    const element = document.getElementById('dropdown') as Element;
    return ReactDOM.createPortal(children, element);
};

export default DropdownPortal;
