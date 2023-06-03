import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const Refresh = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

        const destination = new URLSearchParams(location.search).get("destination");

        console.log(`destination: ${destination}`);

        if (destination) {

            navigate(destination, {replace: true});

        } else {

            navigate("/", {replace: true});

        }

    }, [location, navigate]);

    return <></>;
};

export default Refresh;
