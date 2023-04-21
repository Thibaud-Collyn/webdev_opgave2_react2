import React from 'react';
import {deleteResource, useTest} from '../AxiosFunctions';
import { useNavigate, useParams } from "react-router-dom";
import {useMutation} from "react-query";

const Applicants = () => {
    const navigate = useNavigate()

    const params = useParams();
    const applicantUrl = decodeURIComponent(params.url);

    const createPostMutation = useMutation({
        mutationFn : deleteResource,
        onSuccess: () => {
            console.log("successfully deleted applicant");
            refetch().then(r => r.data)
        },
        onError: () => {
            alert('An error has occurred while deleting a applicant');
        },
    });

    const handleDelete = (applicantUrl) => {
        //e.preventDefault()
        console.log(`attempting to delete applicant with url: ${applicantUrl}`);
        createPostMutation.mutate({
            URL: applicantUrl,
        });
    }

    const { data: applicantData, isLoading, isError, refetch } = useTest(applicantUrl, "applicants");

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

    return(
        <div>
            <button className='Button' id='return home' onClick={() => navigate('/')}>Home</button>
            <button className='Button' id='addApplicant' onClick={() => navigate(`/add-applicant/${encodeURIComponent(params.url)}`)}>Add applicant</button>
            <h1>Applicants</h1>
            <div className='company-wrapper' style={gridStyle}>
                {applicantData.map(applicant => (
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
                        <button className='Button' onClick={() => handleDelete(applicant.url)}>Delete</button>
                        <button className='Button' onClick={() => navigate(`/edit-applicant/${encodeURIComponent(applicant.url)}`)}>Edit</button>
                        <button className='Button' onClick={() => navigate(`/detail-applicant/${encodeURIComponent(applicant.url)}`)}>Details</button>
                        <br/>
                    </div>
                ))}
            </div>
        </div>
    );
}

//<button className='Button' onClick={() => handleDelete(applicant.index)}>Delete</button>

export default Applicants;