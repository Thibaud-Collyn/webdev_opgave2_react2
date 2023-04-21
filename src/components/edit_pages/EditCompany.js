import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "react-query";
import {postCompany, usePageData} from "../AxiosFunctions";

const EditCompany = () => {
    const navigate = useNavigate();
    const params = useParams();
    const companyURL = decodeURIComponent(params.url);

    const { data: companyData, isLoading, isError } = usePageData(companyURL);

    const [name, setName] = useState("")
    const [industry, setIndustry] = useState("")
    const [description, setDescription] = useState("")
    const [size, setSize] = useState(0)

    const createPostMutation = useMutation({
        mutationFn : postCompany,
        onSuccess: () => {
            navigate(`/company/${encodeURIComponent(companyData.index)}`);
        },
        onError: () => {
            alert("Error while editing company")
        },
    });

    const HandleSubmit = (e) => {
        e.preventDefault()
        console.log(`attempted to edit: ${name}`);
        createPostMutation.mutate({
            method: "patch",
            URL: companyData.url,
            name: name,
            industry: industry,
            description: description,
            size: size,
        });
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data.</div>;
    }

    return(
        <div>
            <button className='Button' onClick={() => navigate(`/company/${encodeURIComponent(companyData.index)}`)}>Cancel</button>
            <form onSubmit={HandleSubmit}>
                <h1>Edit Company</h1>
                <p>Name: <input
                    type={"text"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={true}/>
                </p>
                <br/>
                <p>Industry type: <input
                    type={"text"}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    required={true}/>
                </p>
                <br/>
                <p>Company description: <input
                    type={"text"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required={true}/>
                </p>
                <br/>
                <p>Amount of active employees: <input
                    type={"number"}
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    required={true}
                    min={"0"}/>
                </p>
                <br/>
                <button className='Button' disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? "Loading..." : "Edit"}
                </button>
            </form>
        </div>
    )
}

export default EditCompany