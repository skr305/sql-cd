const axios = require('axios');

const base_url = "localhost:8088";

const tst_url = `${base_url}/usr_inf`;

axios.post(
    tst_url, 
    {},
    {
        params: {
            usr: "skr305"
        }
    }
)
.then(res => {
    console.log(res);
})
.catch(rej => {
    console.log(rej);
})