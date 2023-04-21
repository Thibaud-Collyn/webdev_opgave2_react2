import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {usePageData} from "../AxiosFunctions";

const ApplicationDetails = () => {
    const navigate = useNavigate()
    const params = useParams();
    const applicationsURL = decodeURIComponent(params.url);

    const { data: applicationData, isLoading, isError, refetch } = usePageData(applicationsURL);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data.</div>;
    }

    return (
        <div>
            <button className='Button' id='back' onClick={() => navigate(-1)}>Back</button>
            <h1>Applications</h1>
                    <div className='company'>
                        <h2>Text: {applicationData.text}</h2>
                        <p><Link to={`/detail-job/${encodeURIComponent(applicationData.job)}`}>Job offer</Link></p>
                        <p> <Link to={`/detail-applicant/${encodeURIComponent(applicationData.applicant)}`}>Applicant details</Link> </p>
                    </div>
        </div>
    )
}

export default ApplicationDetails