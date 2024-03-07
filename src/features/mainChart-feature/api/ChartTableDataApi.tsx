import {getBaseHost} from "../../../config/env";

export const queryByUser = (setData: Function, queryParams: any) => {
    fetch(getBaseHost() + '/chartData/query',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(queryParams),
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json, 'json');
            setData(json);
        })
        .catch((error) => {
            console.log('fetch data failed', error);
        });
};

export const saveByUser = (setData: Function, queryParams: any) => {
    fetch(getBaseHost() + '/chartData/save',
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