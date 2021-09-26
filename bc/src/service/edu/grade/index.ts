import { AxiosInstance } from "axios";
import { getEduCookies } from '../util/getEduCookies'
import { gradeAdapter } from './adapter'
import { GradeResponse } from "./type";

/**
 * 得到成绩
 * @param axios 
 * @param casID 
 * @param password 
 */
export async function getGrade(
    axios: AxiosInstance,
    casID: string,
    password: string
) {

    /** 查询得到的结果
     * 包含这个学期的成绩和历史成绩
     */
    let historyGrade:Array<GradeResponse> = [] 
    let currentGrade:Array<GradeResponse> = []

    
    const historyAoData = `[{"name":"sEcho","value":2},{"name":"iColumns","value":10},{"name":"sColumns","value":""},{"name":"iDisplayStart","value":0},{"name":"iDisplayLength","value":-1},{"name":"mDataProp_0","value":"xnxq"},{"name":"mDataProp_1","value":"kch"},{"name":"mDataProp_2","value":"kcm"},{"name":"mDataProp_3","value":"kxh"},{"name":"mDataProp_4","value":"xf"},{"name":"mDataProp_5","value":"kssj"},{"name":"mDataProp_6","value":"kscjView"},{"name":"mDataProp_7","value":"wfzjd"},{"name":"mDataProp_8","value":"wfzdj"},{"name":"mDataProp_9","value":"kcsx"},{"name":"iSortCol_0","value":5},{"name":"sSortDir_0","value":"desc"},{"name":"iSortingCols","value":1},{"name":"bSortable_0","value":false},{"name":"bSortable_1","value":false},{"name":"bSortable_2","value":false},{"name":"bSortable_3","value":false},{"name":"bSortable_4","value":false},{"name":"bSortable_5","value":true},{"name":"bSortable_6","value":false},{"name":"bSortable_7","value":false},{"name":"bSortable_8","value":false},{"name":"bSortable_9","value":false}]`
    const getHistoryGradeURL = "http://bkjws.sdu.edu.cn/b/cj/cjcx/xs/lscx"

    const currentAoData = `[{"name":"sEcho","value":1},{"name":"iColumns","value":10},{"name":"sColumns","value":""},{"name":"iDisplayStart","value":0},{"name":"iDisplayLength","value":-1},{"name":"mDataProp_0","value":"function"},{"name":"mDataProp_1","value":"kch"},{"name":"mDataProp_2","value":"kcm"},{"name":"mDataProp_3","value":"kxh"},{"name":"mDataProp_4","value":"xf"},{"name":"mDataProp_5","value":"kssj"},{"name":"mDataProp_6","value":"kscjView"},{"name":"mDataProp_7","value":"wfzjd"},{"name":"mDataProp_8","value":"wfzdj"},{"name":"mDataProp_9","value":"kcsx"},{"name":"iSortingCols","value":0},{"name":"bSortable_0","value":false},{"name":"bSortable_1","value":false},{"name":"bSortable_2","value":false},{"name":"bSortable_3","value":false},{"name":"bSortable_4","value":false},{"name":"bSortable_5","value":false},{"name":"bSortable_6","value":false},{"name":"bSortable_7","value":false},{"name":"bSortable_8","value":false},{"name":"bSortable_9","value":false}]`
    const getCurrentGradeURL = `http://bkjws.sdu.edu.cn/b/cj/cjcx/xs/list`

    axios = await getEduCookies(axios, casID, password)

    await axios.post(getHistoryGradeURL + "?aoData=" + historyAoData)
    .then(
        (res) => {
            historyGrade = gradeAdapter(res.data.object.aaData)
        }
    )

    await axios.post(getCurrentGradeURL + "?aoData=" + currentAoData)
    .then(
        (res) => {
            currentGrade = gradeAdapter(res.data.object.aaData)
        }
    )


    
    return {"history": historyGrade, "current": currentGrade}
    
}