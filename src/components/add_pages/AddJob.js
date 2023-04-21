import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {usePageData, useTest} from "../AxiosFunctions";

const ApiURL = 'https://groep35.webdev.ilabt.imec.be/'

const AddJobs = () => {
    const navigate = useNavigate();
    const params = useParams();
    const postURL = decodeURIComponent(params.url);

    const homepgData = usePageData(ApiURL);
    const companiesData = useTest(homepgData.data['companies'], "companies");
    const recruiterData = useTest(homepgData.data['recruiters'], 'recruiters');

    if (companiesData.isLoading || recruiterData.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form>
                <h1>Add new job</h1>
                <label>Company:</label>
                <select id={'companies'}>
                    {companiesData.data.map(company => (
                        <option id={company.url}>{company.name}</option>
                    ))}
                </select>
            </form>
        </div>
    )

}

export default AddJobs;