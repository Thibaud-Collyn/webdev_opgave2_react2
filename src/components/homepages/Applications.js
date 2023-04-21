import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteResource, useTest} from "../AxiosFunctions";
import {useMutation} from "react-query";

const Applications = () => {
    const navigate = useNavigate()

    const params = useParams();
    const applicationsURL = decodeURIComponent(params.url);

    const createPostMutation = useMutation({
        mutationFn : deleteResource,
        onSuccess: () => {
            console.log("successfully deleted application");
            refetch().then(r => r.data)
        },
        onError: () => {
            alert('An error has occurred while deleting an application');
        },
    });

    const handleDelete = (applicationUrl) => {
        console.log(`attempting to delete application with url: ${applicationUrl}`);
        createPostMutation.mutate({
            URL: applicationUrl,
        });
    }

    const { data: applicationData, isLoading, isError, refetch } = useTest(applicationsURL, "applications");

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
            <button className='Button' id='return home' onClick={() => navigate('/')}>Home</button>
            <button className='Button' id='addRecruiter' onClick={() => navigate(`/add-applicant/${encodeURIComponent(applicationsURL)}`)}>Add applicant</button>
            <h1>Applications</h1>
            <div className='company-wrapper' style={gridStyle}>
                {applicationData.map(application => (
                    <div className='company'>
                        <h2>Text: {application.text}</h2>
                        <p><Link to={`/detail-job/${encodeURIComponent(application.job)}`}>Job offer</Link></p>
                        <p> <Link to={`/detail-applicant/${encodeURIComponent(application.applicant)}`}>Applicant details</Link> </p>
                        <button className='Button' onClick={() => handleDelete(application.url)}>Delete</button>
                        <button className='Button' onClick={() => navigate(`/edit-application/${encodeURIComponent(application.url)}`)}>Edit</button>
                        <button className='Button' onClick={() => navigate(`/detail-application/${encodeURIComponent(application.url)}`)}>Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Applications