import React from 'react';
import { usePageData, fetchResourceData } from './AxiosFunctions';

const companiesURL = "https://groep35.webdev.ilabt.imec.be/company"

const Companies = () => {
    const { data : companiesData, isLoading, isError } = usePageData(companiesURL);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>An error has occurred.</div>;
    }

    return(
        <div>
            <button id='return home'></button>
            <h1>Companies</h1>
            {companiesData.companies.map(company => (
                <li>
                    {CompanyDisplay(company)}
                </li>
            ))}
        </div>
    );
}

const CompanyDisplay = (companyURL) => {
    const { data: companyData, isLoading, isError } = usePageData(companyURL);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>An error has occurred.</div>;
    }

    return(
        <div>
            <h2>Name: {companyData.name}</h2>
        </div>
    )
}

export default Companies