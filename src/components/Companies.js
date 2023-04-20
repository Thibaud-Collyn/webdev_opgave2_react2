import React from 'react';
import {deleteResource, postCompany, useTest} from './AxiosFunctions';
import { useNavigate, useParams } from "react-router-dom";
import {useMutation} from "react-query";

const Companies = () => {
    const navigate = useNavigate()

    const params = useParams();
    const companiesURL = decodeURIComponent(params.url);

    const createPostMutation = useMutation({
        mutationFn : deleteResource,
        onSuccess: () => {
            console.log("successfully deleted company");
            refetch().then(r => r.data)
            //navigate(`/company/${encodeURIComponent(companiesURL)}`);
        },
        onError: () => {
            alert('An error has occurred while deleting a company');
        },
    });

    const handleDelete = (companyUrl) => {
        //e.preventDefault()
        console.log(`attempting to delete company with url: ${companyUrl}`);
        createPostMutation.mutate({
            URL: companyUrl,
        });
    }

    const { data: companyData, isLoading, isError, refetch } = useTest(companiesURL, "companies");

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
            <button className='Button' id='addCompany' onClick={() => navigate('/add-company')}>Add company</button>
            <h1>Companies</h1>
            <div className='company-wrapper' style={gridStyle}>
                {companyData.map(company => (
                    <div className='company'>
                        <h2>Name: {company.name}</h2>
                        <p>Industry: {company.industry}</p>
                        <p>Description: {company.description}</p>
                        <pre>Size: {company.size}   Score: {company.score}</pre>
                        <p>TODO: display jobs, employees and applications</p>
                        <button className='Button' onClick={() => handleDelete(company.url)}>Delete</button>
                        <br/>
                    </div>
                ))}
            </div>
        </div>
    );
}

//<button className='Button' onClick={() => handleDelete(company.index)}>Delete</button>

export default Companies