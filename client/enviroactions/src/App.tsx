import "./App.css";
import LandingPage from "./components/LandingPage.tsx";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/SignIn.tsx";
import { SignUp } from "./components/SignUp.tsx";
import { AccountInfo } from "./components/AccountInfo.tsx";
import Home from "./components/Home.tsx";
import { ReportPage } from "./components/ReportPage.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/infoForm" element={<AccountInfo />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<ReportPage />} />
    </Routes>
  );
}

export default App;
