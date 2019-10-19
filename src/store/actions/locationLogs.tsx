import axios from '../../axios';

export const saveLocationLog = (locationLog: any, token: string, userId: string) => {
    return () => {
        const queryParams = "locationLogs.json?auth="+token;
        console.log(locationLog);
        axios.post(queryParams, locationLog)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }
}