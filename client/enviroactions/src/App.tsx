import "./App.css";
import LandingPage from "./components/LandingPage.tsx";
import { Route, Routes } from "react-router-dom";
import  GetInfo  from './components/AccountInfo.tsx';
import  Home  from './components/Home.tsx';
import  ReportPage from './components/ReportPage.tsx';
import Forms from "./components/Forms.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/infoForm" element={<GetInfo />} />
      <Route path="/form" element={<Forms/>}></Route>
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<ReportPage />} />
    </Routes>
  );
}

export default App;
