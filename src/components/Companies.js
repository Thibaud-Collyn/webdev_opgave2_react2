import React from 'react';
import { useTest } from './AxiosFunctions';
import { useNavigate } from "react-router-dom";

const companiesURL = "https://groep35.webdev.ilabt.imec.be/company"

const Companies = () => {
    const navigate = useNavigate()

    const { data: companyData, isLoading, isError } = useTest(companiesURL, "companies");
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>An error has occurred.</div>;
    }

    return(
        <div>
            <button id='return home' onClick={() => navigate('/')}>Home</button>
            <button id='addCompany' onClick={() => navigate('/add-company')}>Add company</button>
            <h1>Companies</h1>
            <ul>
                {companyData.map(company => (
                    <li>
                        <h2>Name: {company.name}</h2>
                        <p>Industry: {company.industry}</p>
                        <p>Description: {company.description}</p>
                        <pre>Size: {company.size}   Score: {company.score}</pre>
                        <p>TODO: display jobs, employees and applications</p>
                        <br/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// const CompanyDisplay = (companyURLs) => {
//     //console.log("CompanyDisplay called")
//     console.log({companyURLs})
//     if (!companyURLs.length) {
//         return <div>Currently no companies available</div>
//     }
//     //const { data: companyData, isLoading, isError } = fetchResourceData(companyURLs);
//     const companyData = fetchResourceData(companyURLs);
//     const useCompanyDataQuery = () => {
//         return useQuery(['companyData', companyURLs], () => companyData);
//     };
//     // console.log("Called in CompanyDisplay:");
//     // console.log(companyData);
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }
//
//     if (isError) {
//         return <div>An error has occurred.</div>;
//     }
//
//     console.log("companyDataQuery:");
//     console.log({companyDataQuery});
//
//     return(
//         <div>
//             <ul>
//                 {companyDataQuery.map(company => (
//                     <li>Name: {company.name}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

export default Companies