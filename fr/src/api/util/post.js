import axios from 'axios';
import qs from 'qs';
import base_url from './base_url';

export default (url, params, use_base=true) => {


    return axios({
        url: use_base ? `${base_url}${url}` : url,
        method: "Post", // 默认是 get

        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
      
        // `headers` 是即将被发送的自定义请求头
        headers: 
        {
            'Content-Type': "application/x-www-form-urlencoded",
        },
      
        // params: params,
        data: params
    })
}