import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from "@/components/Hero";
import SignUp from "@/pages/SignUp";
import SignIn from "@/pages/SignIn";
import Dashboard from "@/pages/Dashboard";
import Library from "@/components/Library";  
import SharedPage from "@/components/SharedPage"; 
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" element={<Library />} /> 
        <Route path="/shared" element={<SharedPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
