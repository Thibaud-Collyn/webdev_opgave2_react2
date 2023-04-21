import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteResource, useTest} from "../AxiosFunctions";
import {useMutation} from "react-query";

const Employees = () => {
    const navigate = useNavigate()
    const params = useParams();
    const employeesURL = decodeURIComponent(params.url);

    const createPostMutation = useMutation({
        mutationFn : deleteResource,
        onSuccess: () => {
            console.log("successfully deleted employee");
            refetch().then(r => r.data)
        },
        onError: () => {
            alert('An error has occurred while deleting an employee');
        },
    });

    const handleDelete = (employeesURL) => {
        console.log(`attempting to delete employee with url: ${employeesURL}`);
        createPostMutation.mutate({
            URL: employeesURL,
        });
    }

    const { data: employeeData, isLoading, isError, refetch } = useTest(employeesURL, "employees");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>An error has occurred.</div>;
    }

    const gridStyle = {
        display: 'grid',
        //gridTemplateColumns: `repeat(${this.columns}, minmax(300px, 1fr))`,
        gridGap: '1rem',
        minWidth: '200px',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    return (
        <div>
            <button className='Button' id='return home' onClick={() => navigate('/')}>Home</button>
            <h1>Employees</h1>
            <div className='company-wrapper' style={gridStyle}>
                {employeeData.map(employee => (
                    <div className='company'>
                        <h2>Name: {employee.name}</h2>
                        <p>Role: {employee.role}</p>
                        <p>Email: {employee.email}</p>
                        <p> <Link to={`/detail-company/${encodeURIComponent(employee.company)}`}>Employing company</Link> </p>
                        <button className='Button' onClick={() => handleDelete(employee.url)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Employees