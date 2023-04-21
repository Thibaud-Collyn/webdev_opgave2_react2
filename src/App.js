import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import Applicants from "./components/homepages/Applicants";
import Applications from "./components/homepages/Applications";
import Companies from "./components/homepages/Companies";
import Employees from "./components/homepages/Employees";
import Jobs from "./components/homepages/Jobs";
import Recruiters from "./components/homepages/Recruiters";
import Reviews from "./components/homepages/Reviews";
import AddCompany from "./components/add_pages/AddCompany";
import CompanyDetails from "./components/detail_pages/CompanyDetails";
import EditCompany from "./components/edit_pages/EditCompany";
import AddJob from "./components/add_pages/AddJob";
import ApplicantDetails from "./components/detail_pages/ApplicantDetails";

function App() {
  return (
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="applicant/:url" element={<Applicants />} />
          <Route path="detail-applicant/:url" element={<ApplicantDetails />} />

          <Route path="application/:url" element={<Applications />} />

          <Route path="company/:url" element={<Companies />} />
          <Route path="add-company/:url" element={<AddCompany />} />
          <Route path="detail-company/:url" element={<CompanyDetails />} />
          <Route path="edit-company/:url" element={<EditCompany />} />

          <Route path="employee/:url" element={<Employees />} />

          <Route path="job/:url" element={<Jobs />} />
          <Route path="add-job/:url" element={<AddJob />} />

          <Route path="recruiter/:url" element={<Recruiters />} />

          <Route path="review/:url" element={<Reviews />} />

      </Routes>
  );
}

export default App;
