import { GradeResponse, GradeOrigin } from "./type";

/**
 * 把从山大服务平台得到的数据转化成Response需要的数据格式
 * @param gradeInfo 服务平台上得到的原数据
 */
export function gradeAdapter(gradeInfo:Array<GradeOrigin>) : Array<GradeResponse> {
    return gradeInfo.map((info:GradeOrigin):GradeResponse => {
        return {
           yearTerm: info["xnxq"],
           courseId: info["kch"],
           courseIndex: info["kxh"],
           name: info["kcm"],
           type: info["kcsx"],
           credit: info["xf"],
           examTime: info["kssj"],
           grade: info["kscjView"],
           gradePoint: Number(info["wfzjd"]),
           gradeRank: info["wfzdj"],

           /** 暂时还没有得到数据来源的部分 */
           selected: "",
           rank: "",
           highestGrade: "",
           lowestGrade: ""
        }
    })
    
}