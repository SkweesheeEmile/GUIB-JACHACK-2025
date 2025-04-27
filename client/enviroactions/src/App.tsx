import "./App.css";
import LandingPage from "./components/LandingPage.tsx";
import { Route, Routes } from "react-router-dom";
import Forms from "./components/Forms.tsx";
import Home from "./components/home.tsx";
import ReportPage from "./components/ReportPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/infoForm" element={<Forms />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<ReportPage />} />
    </Routes>
  );
}

export default App;
