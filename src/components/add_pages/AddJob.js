import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useResourceQuery,postJob} from "../AxiosFunctions";
import {useMutation} from "react-query";

const AddJobs = () => {
    const navigate = useNavigate();
    const params = useParams();
    const postURL = decodeURIComponent(params.url);

    const  { data: companiesData, isLoading: companiesLoading, isError: companiesError } = useResourceQuery('/company', "companies");
    const  { data: recruitersData, isLoading: recruitersLoading, isError: recruitersError } = useResourceQuery('/recruiter', "recruiters");

    const [company, setCompany] = useState('');
    const [recruiter, setRecruiter] = useState('');
    const [deadline, setDeadline] = useState('');
    const [published, setPublished] = useState('');
    const [salaryMin, setSalaryMin] = useState(0);
    const [salaryMax, setSalaryMax] = useState(0);
    const [description, setDescription] = useState('');

    const createPostMutation = useMutation({
        mutationFn : postJob,
        onSuccess: () => {
            navigate(`/job/${encodeURIComponent(params.url)}`);
        },
        onError: () => {
            alert("Error while editing company");
        },
    });

    const HandleSubmit = (e) => {
        e.preventDefault()
        console.log(`handle submit: ${company}`);
        createPostMutation.mutate({
            method: "post",
            URL: decodeURIComponent(params.url),
            company: company,
            recruiter: recruiter,
            deadline: deadline,
            published: published,
            salaryMin: salaryMin,
            salaryMax: salaryMax,
            description: description,
        });
    }

    if (companiesLoading || recruitersLoading) {
        return <div>Loading...</div>;
    }

    if (companiesError || recruitersError) {
        return <div>An error has occured while retrieving some data...</div>;
    }

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <h1>Add new job</h1>
                <p>Description: <input required={true} type={"text"} onChange={(e)=>setDescription(e.target.value)}/></p>
                <label>Company: </label>
                <select required={true} id={'companies'} onChange={(e)=>setCompany(e.target.value)}>
                    {companiesData.map(companyD => (
                        <option key={companyD.url} value={companyD.url}>{companyD.name}</option>
                    ))}
                </select>
                <br/>
                <label>Recruiter: </label>
                <select required={true} id={'recruiters'} onChange={(e)=>setRecruiter(e.target.value)}>
                    {recruitersData.map(recruiterD => (
                        <option key={recruiterD.url} value={recruiterD.url}>{recruiterD.name}</option>
                    ))}
                </select>
                <br/>
                <p>Published on: <input required={true} type={"date"} onChange={(e)=>setPublished(e.target.value)} /></p>
                <p>Deadline: <input required={true} type={"date"} onChange={(e)=>setDeadline(e.target.value)} /></p>
                <pre>Salary min: <input required={true} type={"number"} onChange={(e)=>setSalaryMin(parseInt(e.target.value))}/>   Salary max: <input type={"number"} onChange={(e)=>setSalaryMax(parseInt(e.target.value))}/></pre>
                <br/>
                <button className='Button' disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? "Loading..." : "Add"}
                </button>
            </form>
        </div>
    )

}

export default AddJobs;