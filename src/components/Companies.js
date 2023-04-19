import React from 'react';
import {usePageData, fetchResourceData, useTest} from './AxiosFunctions';
import {useQuery} from "react-query";

const companiesURL = "https://groep35.webdev.ilabt.imec.be/company"

const Companies = () => {
    const { data: companyData, isLoading, isError } = useTest(companiesURL);
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
            <ul>
                {companyData.map(company => (
                    <li>Name: {company.name}</li>
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