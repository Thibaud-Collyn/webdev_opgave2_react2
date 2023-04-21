import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {usePageData} from "../AxiosFunctions";

const CompanyDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const companyURL = decodeURIComponent(params.url);

    const { data: company, isLoading, isError } = usePageData(companyURL);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data.</div>;
    }

    return (
        <div>
            <button className='Button' id='back' onClick={() => navigate(-1)}>Back</button>
            <div className='company'>
                <h3>Name: {company.name}</h3>
                <p>Industry: {company.industry}</p>
                <p>Description: {company.description}</p>
                <pre>Size: {company.size}   Score: {company.score}</pre>
                <p>TODO: display jobs, employees and applications</p>
            </div>
        </div>
    );
}

export default CompanyDetails;