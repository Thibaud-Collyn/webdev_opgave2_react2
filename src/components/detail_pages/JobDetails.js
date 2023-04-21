import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {usePageData} from "../AxiosFunctions";
import formatDate from "../../FormatDate";

const JobDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const jobURL = decodeURIComponent(params.url);

    const { data: job, isLoading, isError } = usePageData(jobURL);

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
                <h2>Description: {job.description}</h2>
                <p> <Link to={`/detail-company/${encodeURIComponent(job.company)}`}>Employing company</Link> </p>
                <p>TODO: link to recruiter</p>
                <p>Requirements:</p>
                <ul>
                    {job.requirements.map(req => (
                        <li>req</li>
                    ))}
                </ul>
                <p>Published on: {formatDate(job.published)}</p>
                <p>React before: {formatDate(job.deadline)}</p>
                <p>Salary range: {job.salaryMin}-{job.salaryMax}</p>
            </div>
        </div>
    );
}

export default JobDetails