import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MapComponent from "./MapComponent";
import "../styles/reportPage.css"; // Adjust the path as necessary
// hi
function ReportPage() {
  const location = useLocation();
  const passedState = location.state;

  const navigate = useNavigate();
  const returnhome = () => {
    navigate("/");
  };

  return (
    <div>
       <div id="navForm">
            <img
            src="src/assets/EnviroActions.png"
            alt="EnviroAction Logo"
            id="logo"
            onClick={returnhome}
            ></img>
        </div>
        <h1 id="mapHeader">Reported Green!</h1>
        <div id="mainContainer">

                <div className="scrollable-div">
                    {passedState.userData.Tips.map((tip: any, index: number) => (
                            <div key={index} className="recommendationContainer">
                            <h2>{tip.Title}</h2>
                            <p>{tip.Body}</p>

                            {tip.Link && <a href={tip.Link}>Ressource</a>}
                            </div>
                        ))}
                </div>
                <div id="mapContainer">
                    <h2 id="mapHeader" >Helper Map</h2>
                    <MapComponent data={passedState.userData} />
                </div>        
        </div>
      


    </div>
  );
}
export default ReportPage;
