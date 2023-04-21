import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteResource, useTest} from "../AxiosFunctions";
import {useMutation} from "react-query";

const Recruiters = () => {
    const navigate = useNavigate()

    const params = useParams();
    const recruitersURL = decodeURIComponent(params.url);

    const createPostMutation = useMutation({
        mutationFn : deleteResource,
        onSuccess: () => {
            console.log("successfully deleted recruiter");
            refetch().then(r => r.data)
        },
        onError: () => {
            alert('An error has occurred while deleting a recruiter');
        },
    });

    const handleDelete = (recruiterUrl) => {
        console.log(`attempting to delete recruiter with url: ${recruiterUrl}`);
        createPostMutation.mutate({
            URL: recruiterUrl,
        });
    }

    const { data: reqruiterData, isLoading, isError, refetch } = useTest(recruitersURL, "recruiters");

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
            <button className='Button' id='addRecruiter' onClick={() => navigate(`/add-recruiter/${encodeURIComponent(recruitersURL)}`)}>Add recruiter</button>
            <h1>Recruiters</h1>
            <div className='company-wrapper' style={gridStyle}>
                {reqruiterData.map(recruiter => (
                    <div className='company'>
                        <h2>Name: {recruiter.name}</h2>
                        <p>E-mail: {recruiter.email}</p>
                        <p> <Link to={`/detail-company/${encodeURIComponent(recruiter.company)}`}>Employing company</Link> </p>
                        <button className='Button' onClick={() => handleDelete(recruiter.url)}>Delete</button>
                        <button className='Button' onClick={() => navigate(`/edit-recruiter/${encodeURIComponent(recruiter.url)}`)}>Edit</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recruiters