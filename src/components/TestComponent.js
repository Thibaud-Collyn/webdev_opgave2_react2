// src/test/TestComponent.js
import React from 'react';
import { useQuery } from 'react-query';

const TestComponent = () => {
    const { data, isLoading, isError } = useQuery('test', async () => {
        return 'Hello, world!';
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data.</div>;
    }

    return (
        <div>
            <h1>Test Component</h1>
            <p>{data}</p>
        </div>
    );
};

export default TestComponent;