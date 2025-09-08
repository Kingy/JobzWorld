import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import Landing from "@/react-app/pages/Landing";
import CandidateOnboarding from "@/react-app/pages/CandidateOnboarding";
import EmployerOnboarding from "@/react-app/pages/EmployerOnboarding";
import Candidates from "@/react-app/pages/Candidates";
import Pricing from "@/react-app/pages/Pricing";
import About from "@/react-app/pages/About";
import SignIn from "@/react-app/pages/SignIn";
import GetStarted from "@/react-app/pages/GetStarted";
import Privacy from "@/react-app/pages/Privacy";
import Terms from "@/react-app/pages/Terms";
import Help from "@/react-app/pages/Help";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/candidate-onboarding" element={<CandidateOnboarding />} />
            <Route path="/employer-onboarding" element={<EmployerOnboarding />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/employers" element={<EmployerOnboarding />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
