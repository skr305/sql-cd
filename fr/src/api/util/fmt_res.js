import data_par from "./pre/util/data_par";
import default_pre from './pre/util/default_pre'

const fmt_res = (api, pre = default_pre) => {
    return async (...args) => {
        const res = await api(...args);
        return pre(res);
    }   
}

export default fmt_res;