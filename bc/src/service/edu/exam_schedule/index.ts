import { AxiosInstance } from "axios";
import { getEduCookies } from '../util/getEduCookies'
import { ExamScAdapter } from './adapter'
import { ExamScResponse } from "./type";

/**
 * 得到考试安排
 * @param axios 
 * @param casID 
 * @param password 
 */
export async function getExamSc(
    axios: AxiosInstance,
    casID: string,
    password: string
) {

    /** 查询得到的结果
     * 包含这个学期的成绩和历史成绩
     */
    let ExamScResult:Array<ExamScResponse> = [] 

    
    const examScAoData = `[{"name":"sEcho","value":2},{"name":"iColumns","value":11},{"name":"sColumns","value":""},{"name":"iDisplayStart","value":0},{"name":"iDisplayLength","value":30},{"name":"mDataProp_0","value":"function"},{"name":"mDataProp_1","value":"ksmc"},{"name":"mDataProp_2","value":"kcm"},{"name":"mDataProp_3","value":"kch"},{"name":"mDataProp_4","value":"kxh"},{"name":"mDataProp_5","value":"xqmc"},{"name":"mDataProp_6","value":"jxljs"},{"name":"mDataProp_7","value":"sjsj"},{"name":"mDataProp_8","value":"ksfsmc"},{"name":"mDataProp_9","value":"ksffmc"},{"name":"mDataProp_10","value":"ksbz"},{"name":"iSortCol_0","value":1},{"name":"sSortDir_0","value":"asc"},{"name":"iSortCol_1","value":3},{"name":"sSortDir_1","value":"asc"},{"name":"iSortCol_2","value":4},{"name":"sSortDir_2","value":"asc"},{"name":"iSortingCols","value":3},{"name":"bSortable_0","value":false},{"name":"bSortable_1","value":true},{"name":"bSortable_2","value":false},{"name":"bSortable_3","value":true},{"name":"bSortable_4","value":true},{"name":"bSortable_5","value":false},{"name":"bSortable_6","value":false},{"name":"bSortable_7","value":true},{"name":"bSortable_8","value":false},{"name":"bSortable_9","value":false},{"name":"bSortable_10","value":false},{"name":"xnxq","value":"2020-2021-1"},{"name":"ksrwid","value":"0000000075bacc4b0175f9152ecd0efe"}]`
    const getExamScURL = "http://bkjws.sdu.edu.cn/b/ksap/xs/vksapxs/pageList"


    axios = await getEduCookies(axios, casID, password)

    await axios.post(getExamScURL + "?aoData=" + examScAoData)
    .then(
        (res) => {
            ExamScResult = ExamScAdapter(res.data.object.aaData)
        }
    )

    return ExamScResult
}