import React from 'react';
import useSingleResourceQuery from "./AxiosFunctions";
import {Link} from "react-router-dom";


const ApiURL = 'https://groep35.webdev.ilabt.imec.be/'

const HomePage = () => {
    const { data: homepgData, isLoading, isError } = useSingleResourceQuery(ApiURL)

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
                <li> <Link to='/applicant'>Applicants</Link> </li>
                <li> <Link to="/application">Applications</Link> </li>
                <li> <Link to="/company">Companies</Link> </li>
                <li> <Link to="/employee">Employees</Link> </li>
                <li> <Link to="/job">Jobs</Link> </li>
                <li> <Link to="/recruiter">Recruiters</Link> </li>
                <li> <Link to="/recruiter">Recruiters</Link> </li>
            </ul>
        </div>
    )
}

export default HomePage