import React from 'react';
import {usePageData} from "./AxiosFunctions";
import {Link} from "react-router-dom";


const ApiURL = 'https://groep35.webdev.ilabt.imec.be/'

const HomePage = () => {
    const { data: homepgData, isLoading, isError } = usePageData(ApiURL)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data.</div>;
    }

    return(
        <div>
            <h1>Homepage</h1>
            <ul>
                <li> <Link to={`/applicant/${encodeURIComponent(homepgData['applicants'])}`}>Applicants</Link> </li>
                <li> <Link to={`/application/${encodeURIComponent(homepgData['applications'])}`}>Applications</Link> </li>
                <li> <Link to={`/company/${encodeURIComponent(homepgData['companies'])}`}>Companies</Link> </li>
                <li> <Link to={`/employee/${encodeURIComponent(homepgData['employees'])}`}>Employees</Link> </li>
                <li> <Link to={`/job/${encodeURIComponent(homepgData['jobs'])}`}>Jobs</Link> </li>
                <li> <Link to={`/recruiter/${encodeURIComponent(homepgData['recruiters'])}`}>Recruiters</Link> </li>
                <li> <Link to={`/review/${encodeURIComponent(homepgData['reviews'])}`}>Reviews</Link> </li>
            </ul>
        </div>
    )
}

export default HomePage