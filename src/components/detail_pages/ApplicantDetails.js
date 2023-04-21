import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {usePageData} from "../AxiosFunctions";

const ApplicantDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const ApplicantUrl = decodeURIComponent(params.url);

    const { data: applicant, isLoading, isError } = usePageData(ApplicantUrl);

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
                            <h2>Name: {applicant.name}</h2>
                            <p>Email: {applicant.email}</p>
                            <p>Resume: <a href={applicant.resume}>applicant.resume</a></p>
                            <div>Skills:
                                <ul>{
                                    applicant.skills.map(skill => (
                                        <li>{skill}</li>
                                    ))}</ul>
                            </div>
                            <p>TODO: display applications</p>
                            <br/>
                        </div>
                </div>
    );
}

export default ApplicantDetails;