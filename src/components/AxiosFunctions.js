import React, {useCallback} from 'react';
import axios from "axios";
import {useQuery} from "react-query";

export const usePageData = (resourceUrl) => {
    const fetchResource = useCallback(async () => {
        if (!resourceUrl) {
            return null;
        }
        try {
            const response = await axios.get(resourceUrl);
            console.log(`Retrieving link: ${resourceUrl}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching resource data:", error);
        }
    }, [resourceUrl]);

    return useQuery(resourceUrl, fetchResource);
};

export const fetchResourceData = async (resources) => {
    try {
        const data = await Promise.all(
            resources.map(async (resourceUrl) => {
                try {
                    const response = await axios.get(resourceUrl);
                    return response.data;
                } catch (error) {
                    console.error('Error fetching resource data:', error);
                }
            })
        );
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching resource data:', error);
    }
};

export const useTest = (URL, resourceType) => {
    return useQuery(URL, async () => {
        const response = await axios.get(URL);
        console.log(response.data)
        return fetchResourceData(response.data[resourceType]) // Extract company URLs from raw data
    });
}

export const postCompany = async ({method, URL, name, industry, description, size}) => {
    if (method === "post") {
        return axios.post(
            URL,
            {size, description, industry, name},
            {headers: { 'Content-Type': 'application/vnd.jobs+json' }}
        ).then(res => res.data);
    } else if (method === "patch") {
        return axios.patch(
            URL,
            {size, description, industry, name},
            {headers: { 'Content-Type': 'application/vnd.jobs+json' }}
        ).then(res => res.data);
    }
}

export const postApplicant = async ({method, URL, name, email, resume, skills}) => {
    if (method === "post") {
        return axios.post(
            URL,
            {name:name, email:email,resume:resume,skills:skills },
            {headers: { 'Content-Type': 'application/vnd.jobs+json' }}
        ).then(res => res.data);
    } else if (method === "patch") {
        return axios.patch(
            URL,
            {name:name, email:email,resume:resume,skills:skills },
            {headers: { 'Content-Type': 'application/vnd.jobs+json' }}
        ).then(res => res.data);
    }
}

export const postJob = async ({method, URL, deadline, published, salaryMax, salaryMin, description, company, reqruiter}) => {
    if (method === "post") {
        return axios.post(
            URL,
            {deadline, published, salaryMax, salaryMin, description, company, reqruiter},
            {headers: { 'Content-Type': 'application/vnd.jobs+json' }}
        ).then(res => res.data);
    } else if (method === "patch") {
        return axios.patch(
            URL,
            {deadline, published, salaryMax, salaryMin, description, company, reqruiter},
            {headers: { 'Content-Type': 'application/vnd.jobs+json' }}
        ).then(res => res.data);
    }
}

export const deleteResource = async ({URL}) => {
    return axios.delete(URL).then(res => res.data);
}

export default {usePageData, fetchResourceData, useTest, postCompany, deleteResource,postApplicant}
