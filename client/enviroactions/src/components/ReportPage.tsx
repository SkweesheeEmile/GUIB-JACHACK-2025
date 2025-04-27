import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function ReportPage() {
    const location = useLocation();
    const passedState = location.state;
  
    const navigate = useNavigate();
    const returnhome = () => {
        navigate("/")
    };

    return (

        <div>
            <button onClick={returnhome}>
                <img></img>
            </button>
            <h1>{passedState.Tips[0].Title}</h1>
            <p>Account information</p>
            

        </div>

    );

}
export default ReportPage;
