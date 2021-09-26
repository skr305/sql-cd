import data_par from "./data_par";

export default (pre_func, use_par = true) => {
    return (res) => {
        if(use_par) {
            return pre_func(data_par(res));
        }
        return pre_func;
    }
}