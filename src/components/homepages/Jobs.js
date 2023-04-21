import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteResource, useTest} from "../AxiosFunctions";
import formatDate from "../../FormatDate";
import {useMutation} from "react-query";

const Jobs = () => {
    const navigate = useNavigate()

    const params = useParams();
    const jobsURL = decodeURIComponent(params.url);

    const createPostMutation = useMutation({
        mutationFn : deleteResource,
        onSuccess: () => {
            console.log("successfully deleted company");
            refetch().then(r => r.data)
        },
        onError: () => {
            alert('An error has occurred while deleting a company');
        },
    });

    const handleDelete = (jobUrl) => {
        //e.preventDefault()
        console.log(`attempting to delete job with url: ${jobUrl}`);
        createPostMutation.mutate({
            URL: jobUrl,
        });
    }

    const { data: jobData, isLoading, isError, refetch } = useTest(jobsURL, "jobs");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>An error has occurred.</div>;
    }

    const gridStyle = {
        display: 'grid',
        //gridTemplateColumns: `repeat(${this.columns}, minmax(300px, 1fr))`,
        gridGap: '1rem',
        minWidth: '200px',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    return (
        <div>
            <button className='Button' id='home' onClick={() => navigate('/')}>Home</button>
            <button className='Button' id='addHome' onClick={() => navigate(`/add-job/${encodeURIComponent(jobsURL)}`)}>Add job</button>

            <h1>Jobs</h1>
            <div className='company-wrapper' style={gridStyle}>
                {jobData.map(job => (
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
                        <p>TODO: display applications</p>
                        <button className='Button' onClick={() => handleDelete(job.url)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const getLinkData = (URL) => {
    //console.log(URL);
    //const { data: company, isLoading, isError } = fetchResourceData(URL);
    //return <Link to={`/detail-company/${encodeURIComponent(company.url)}`}>{company.name}</Link>
}

export default Jobs;