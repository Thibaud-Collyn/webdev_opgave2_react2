import React, {useCallback} from 'react';
import axios from "axios";
import {useQuery} from "react-query";

const ApiURL = 'https://groep35.webdev.ilabt.imec.be'

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

export const fetchSingleResource = async (resourceUrl) => {
    const response = await axios.get(resourceUrl);
    return response.data;
}

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

export const fetchSingleLink = async (resource) => {
    const response = await axios.get(ApiURL).then((response) => response.data[resource]);
    return response;
}

export const fetchResources = async (resourceType) => {
    return fetchSingleLink(resourceType).then(async (value) => {
        const response = await axios.get(value);
        return fetchResourceData(response.data[resourceType]);
    });

};

export const useResourceQuery = (resourceTypeUrl, resourceType) => {
    return useQuery([...[resourceTypeUrl, resourceType]], () => fetchResources(resourceType));
};

export const useTest = (URL, resourceType) => {
    return useQuery(URL, async () => {
        const response = await axios.get(URL);
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

export const postJob = async ({method, URL, deadline, published, salaryMax, salaryMin, description, company, recruiter}) => {
    if (method === "post") {
        return axios.post(
            URL,
            {deadline, published, salaryMax, salaryMin, description, company, recruiter},
            {headers: { 'Content-Type': 'application/vnd.jobs+json' }}
        ).then(res => res.data);
    } else if (method === "patch") {
        return axios.patch(
            URL,
            {deadline, published, salaryMax, salaryMin, description, company, recruiter},
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

export const postRecruiter = async ({method, URL, name, email, company}) => {
    if (method === "post") {
        return axios.post(
            URL,
            {name:name, email:email, company:company},
            {headers: { 'Content-Type': 'application/vnd.jobs+json' }}
        ).then(res => res.data);
    } else if (method === "patch") {
        return axios.patch(
            URL,
            {name:name, email:email,company:company },
            {headers: { 'Content-Type': 'application/vnd.jobs+json' }}
        ).then(res => res.data);
    }
}


export const deleteResource = async ({URL}) => {
    return axios.delete(URL).then(res => res.data);
}

export default {usePageData, fetchResourceData, useTest, postCompany, deleteResource, fetchResources, useResourceQuery, fetchSingleResource, postJob,postRecruiter, postApplicant}
