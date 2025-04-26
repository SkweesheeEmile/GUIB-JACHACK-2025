import "./App.css";
import LandingPage from "./components/LandingPage.tsx";
import { Route, Routes } from "react-router-dom";
import { AccountInfo } from "./components/AccountInfo.tsx";
import Home from "./components/Home.tsx";
import { ReportPage } from "./components/ReportPage.tsx";
import  { Account } from './components/SignIn.tsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/infoForm" element={<AccountInfo />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<ReportPage />} />

    <Route path="/signIn" element={<AccountInfo/>} />

    </Routes>
  );
}

export default App;
