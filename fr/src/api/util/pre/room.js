import get_pre from "./util/get_pre";
// previous handling of the result data
const pre =  get_pre ((res) => {
    const raw_data = res.data
    const _data = {...raw_data, ins: raw_data.ins && JSON.parse(raw_data.ins)};

    if(!_data.ins) {
        _data.ins = {};
    }

    if(!_data.imgs) {
        _data.imgs = [];
    } else {
        _data.imgs = JSON.parse(_data.imgs);
    }

    if(!_data.ser) {
        _data.ser = []
    } else {
        _data.ser = _data.ser.split("");
    }




    const suc = res.errorCode == 0;
    return {data: _data, suc};
})

export default pre;