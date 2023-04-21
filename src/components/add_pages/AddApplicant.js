import React, {useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "react-query";
import {postApplicant} from "../AxiosFunctions";

const AddApplicant = () => {
    const navigate = useNavigate();
    const params = useParams();
    const postURL = decodeURIComponent(params.url);

    const newName = useRef();
    const newEmail = useRef();
    const newResume = useRef();
    const [currentSkill, setCurrentSkill] = useState('');
    var skills = [];

    const createPostMutation = useMutation({
        mutationFn : postApplicant,
        onSuccess: () => {
            navigate(`/applicant/${encodeURIComponent(params.url)}`);
        },
        onError: () => {
            alert("Error while adding applicant");
        },
    });

    const HandleSubmit = (e) => {
        e.preventDefault()
        console.log(`handle submit: ${newName}`);
        createPostMutation.mutate({
            method: "post",
            URL: decodeURIComponent(params.url),
            name: newName,
            email: newEmail,
            resume: newResume,
            skills: skills,
        });
    }

    function addSkill() {
        if (currentSkill !== '') {
            if(!skills){
                skills = []
            }
            skills.push(currentSkill);
            setCurrentSkill('');
        }
    }

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <button className='Button' onClick={() => navigate(`/applicant/${encodeURIComponent(postURL)}`)}>Cancel</button>
                <h1>Add new applicant:</h1>
                <p>Applicant name: <input type={"text"} required={true} ref={newName}/></p>
                <p>Applicant email: <input type={"email"} required={true} ref={newEmail}/></p>
                <p>Applicant resume: <input type={"url"} required={true} ref={newResume}/></p>
                <label>Enter your skills</label>
                <div>
                    <input id="skill-input" type="text" onChange={(e) => setCurrentSkill(e.target.value)} />
                    <button type="button" onClick={addSkill()}>Add Skill</button>
                </div>
                <button className='Button' disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? "Loading..." : "Add"}
                </button>
            </form>
        </div>
    );
}

export default AddApplicant