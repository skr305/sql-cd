import axios from 'axios';
import base_url from './base_url';
import qs from 'qs';

export default async (url, data, use_base=true) => {
    
    const rel_url = use_base ? `${base_url}${url}` : url;

    return axios.post(
        rel_url, 
        {
            // headers: {
            //     "ContentType": "application/json"
            // }
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(data),
            params: data,
            body:data
        }
    )
}