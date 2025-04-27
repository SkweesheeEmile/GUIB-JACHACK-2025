import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MapComponent from "./MapComponent";
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
      <button onClick={returnhome}>
        <img></img>
      </button>
      <h1>{passedState.userData.Tips[0].Title}</h1>
      <p>Account information</p>

      {passedState.userData.Tips.map((tip: any, index: number) => (
        <div key={index}>
          <h2>{tip.Title}</h2>
          <p>{tip.Body}</p>

          {tip.Link && <a href={tip.Link}>Ressource</a>}
        </div>
      ))}

      <h2>Helper Map</h2>
      <MapComponent data={passedState.userData} />
    </div>
  );
}
export default ReportPage;
