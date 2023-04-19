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

export const useTest = async (URL) => {
    const response = await axios.get(URL);
    return useQuery(URL, () => fetchResourceData(response.data))
}

export default {usePageData, fetchResourceData, useTest}
