import React from 'react';

const AddCompany = () => {
    //TODO: implement post using axios + back button to companies(with link)
    return(
        <div>
            <h1>Add new Company</h1>
            <p>Name of new company: <input type={"text"} placeholder={"company name"} required={true}/></p>
            <br/>
            <p>Industry type: <input type={"text"} placeholder={"e.g. pharmaceutical"} required={true}/></p>
            <br/>
            <p>Company description: <input type={"text"} placeholder={"Short description of company"} required={true}/></p>
            <br/>
            <p>Amount of active employees: <input type={"number"} required={true} min={"0"}/></p>
        </div>
    )
}

export default AddCompany