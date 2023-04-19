import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import Applicants from "./components/Applicants";
import Applications from "./components/Applications";
import Companies from "./components/Companies";
import Employees from "./components/Employees";
import Jobs from "./components/Jobs";
import Recruiters from "./components/Recruiters";
import Reviews from "./components/Reviews";

function App() {
  return (
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="applicant" element={<Applicants />} />
          <Route path="application" element={<Applications />} />
          <Route path="company" element={<Companies />} />
          <Route path="employee" element={<Employees />} />
          <Route path="job" element={<Jobs />} />
          <Route path="recruiter" element={<Recruiters />} />
          <Route path="review" element={<Reviews />} />
      </Routes>
  );
}

export default App;
