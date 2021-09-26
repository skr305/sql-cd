/** default previous handling */

export default (res) => {
    return {data: res.data.data, suc: res.data.errorCode == 0};
}