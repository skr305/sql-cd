import get_pre from "./util/get_pre";

// previous handling of the result data
const pre = get_pre ((res) => {
    const suc = res.errorCode == 0 && res.data != "-1";
    return {data: {}, suc};
})

export default pre;