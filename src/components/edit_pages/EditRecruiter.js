import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {postRecruiter, usePageData, useResourceQuery} from "../AxiosFunctions";
import {useMutation} from "react-query";

const EditRecruiter = () => {
    const navigate = useNavigate();
    const params = useParams();
    const recruiterURL = decodeURIComponent(params.url);

    const {
        data: companiesData,
        isLoading: companiesLoading,
        isError: companiesError
    } = useResourceQuery('/company', "companies");

    const { data: recruiterD, isLoading, isError } = usePageData(recruiterURL);

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
        console.log(`handle submit: ${name}`);
        createPostMutation.mutate({
            method: "patch",
            URL: recruiterD.url,
            company: company,
            email: email,
            name: name,
        });
    }

    useEffect(() => {
        if (recruiterD) {
            setName(recruiterD.name);
            setEmail(recruiterD.email);
            setCompany(recruiterD.company)
        }
    }, [recruiterD]);

    if (isLoading || companiesLoading) {
        return <div>Loading...</div>;
    }

    if (isError || companiesError) {
        return <div>Error fetching data.</div>;
    }

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <h1>Edit recruiter</h1>
                <p>Name: <input value={name} required={true} type={"text"} onChange={(e)=>setName(e.target.value)}/></p>
                <p>Email: <input value={email} required={true} type={"email"} onChange={(e)=>setEmail(e.target.value)}/></p>
                <label>Company: </label>
                <select required={true} id={'companies'} onChange={(e)=>setCompany(e.target.value)}>
                    {companiesData.map(companyD => (
                        <option key={companyD.url} value={companyD.url}>{companyD.name}</option>
                    ))}
                </select>
                <br/>
                <button className='Button' disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? "Loading..." : "Edit"}
                </button>
            </form>
        </div>
    )
}

export default EditRecruiter