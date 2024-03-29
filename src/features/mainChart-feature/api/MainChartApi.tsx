import { getBaseHost } from "../../../config/env";



export const allProjectViewAsyncFetch = (setData: Function) => {
    fetch(getBaseHost() + '/pFinderData/allProjectDataStatistics',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        }
    )
        .then((response) => {
            return response.json()
        })
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};

export const oneProjectViewAsyncFetch = (setData: Function, queryParams: any) => {
    fetch(getBaseHost() + '/pFinderData/oneProjectDataStatistics',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(queryParams),
        }
    )
        .then((response) => {
            return response.json()
        })
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};

export const dataStatisticsAsyncFetch = (setData: Function, queryParams: any) => {
    fetch(getBaseHost() + '/pFinderData/dataStatistics',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(queryParams),
        }
    )
        .then((response) => {
            return response.json()
        })
        .then((json) => setData(json))
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};