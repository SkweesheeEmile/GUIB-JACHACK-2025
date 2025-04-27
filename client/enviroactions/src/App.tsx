import "./App.css";
import LandingPage from "./components/LandingPage.tsx";
import { Route, Routes } from "react-router-dom";
import  Home  from './components/home.tsx';
import  ReportPage from './components/ReportPage.tsx';
import Forms from "./components/Forms.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/form" element={<Forms/>}></Route>
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<ReportPage />} />
    </Routes>
  );
}

export default App;
