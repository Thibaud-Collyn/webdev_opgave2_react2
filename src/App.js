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
import AddCompany from "./components/AddCompany"
import CompanyDetails from "./components/CompanyDetails"

function App() {
  return (
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="applicant/:url" element={<Applicants />} />
          <Route path="application/:url" element={<Applications />} />
          <Route path="company/:url" element={<Companies />} />
          <Route path="employee/:url" element={<Employees />} />
          <Route path="job/:url" element={<Jobs />} />
          <Route path="recruiter/:url" element={<Recruiters />} />
          <Route path="review/:url" element={<Reviews />} />
          <Route path="add-company/:url" element={<AddCompany />} />
          <Route path="add-company/:companyUrl" element={<CompanyDetails/>} /> //Figure out how to
      </Routes>
  );
}

export default App;
