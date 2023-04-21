import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {postRecruiter, useResourceQuery} from "../AxiosFunctions";
import {useMutation} from "react-query";

const AddRecruiter = () => {
    const navigate = useNavigate();
    const params = useParams();
    const postURL = decodeURIComponent(params.url);

    const {
        data: companiesData,
        isLoading: companiesLoading,
        isError: companiesError
    } = useResourceQuery('/company', "companies");

    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const createPostMutation = useMutation({
        mutationFn: postRecruiter,
        onSuccess: () => {
            navigate(`/recruiter/${encodeURIComponent(params.url)}`);
        },
        onError: () => {
            alert("Error while adding recruiter");
        },
    });

    const HandleSubmit = (e) => {
        e.preventDefault()
        console.log(`handle submit: ${company}`);
        createPostMutation.mutate({
            method: "post",
            URL: postURL,
            company: company,
            email: email,
            name: name,
        });
    }

    if (companiesLoading) {
        return <div>Loading...</div>;
    }

    if (companiesError) {
        return <div>An error has occurred while retrieving some data...</div>;
    }

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <h1>Add new recruiter</h1>
                <p>Name: <input required={true} type={"text"} onChange={(e)=>setName(e.target.value)}/></p>
                <p>Email: <input required={true} type={"email"} onChange={(e)=>setEmail(e.target.value)}/></p>
                <label>Company: </label>
                <select required={true} id={'companies'} onChange={(e)=>setCompany(e.target.value)}>
                    {companiesData.map(companyD => (
                        <option key={companyD.url} value={companyD.url}>{companyD.name}</option>
                    ))}
                </select>
                <br/>
                <button className='Button' disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? "Loading..." : "Add"}
                </button>
            </form>
        </div>
    )
}

export default AddRecruiter;