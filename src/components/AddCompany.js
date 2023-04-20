import React, {useRef, useState} from 'react';
import {postCompany, postResource, usePostCompany} from "./AxiosFunctions";
import {useMutation} from "react-query";
import {useNavigate} from "react-router-dom";

const postURL = "https://groep35.webdev.ilabt.imec.be/company"

const AddCompany = () => {
    //TODO: implement post using axios + back button to companies(with link)
    const navigate = useNavigate()

    const newName = useRef();
    const newIndustry = useRef();
    const newDescription = useRef();
    const newSize = useRef();

    const createPostMutation = useMutation({
        mutationFn : postCompany,
        onSuccess: () => {
            navigate('/company')
        }
    })

    const HandleSubmit = (e) => {
        e.preventDefault()
        console.log(`attempted to add: ${newName.current.value}`);
        createPostMutation.mutate({
            URL: postURL,
            name: newName.current.value,
            industry: newIndustry.current.value,
            description: newDescription.current.value,
            size: newSize.current.value,
        });
    }

    return(
        <div>
            <button className='Button' onClick={() => navigate('/company')}>Cancel</button>
            <form onSubmit={HandleSubmit}>
                <h1>Add new Company</h1>
                <p>Name of new company: <input
                    type={"text"}
                    placeholder={"company name"}
                    required={true}
                    ref={newName}/>
                </p>
                <br/>
                <p>Industry type: <input
                    type={"text"}
                    placeholder={"e.g. pharmaceutical"}
                    required={true}
                    ref={newIndustry}/>
                </p>
                <br/>
                <p>Company description: <input
                    type={"text"}
                    placeholder={"Short description of company"}
                    required={true}
                    ref={newDescription}/>
                </p>
                <br/>
                <p>Amount of active employees: <input
                    type={"number"}
                    required={true}
                    min={"0"}
                    ref={newSize}/></p>
                <br/>
                <button className='Button' disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? "Loading..." : "Add"}
                </button>
            </form>
        </div>
    )
}

export default AddCompany