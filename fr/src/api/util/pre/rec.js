import get_pre from "./util/get_pre";
// previous handling of the result data
const pre =  get_pre ((res) => {

    const data = res.data.map((room) => {
        return {...room, name: room.r_name}
    })
    const suc = res.errorCode == 0;
    return {data, suc};
})

export default pre;