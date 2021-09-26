import { ExamScResponse, ExamScOrigin } from "./type";

/**
 * 把从山大服务平台得到的数据转化成Response需要的数据格式
 * @param examScInfo 服务平台上得到的原数据
 */
export function ExamScAdapter(examScInfo:Array<ExamScOrigin>) : Array<ExamScResponse> {
    return examScInfo.map((info:ExamScOrigin):ExamScResponse => {
        return {
           name: info["kcm"],
           courseId: info["kch"],
           courseIndex: info["kxh"],
           campus: info["xsjc"],
           time: info["sjsj"],
           location: info["jxlm"] + info["jsm"],
           method: info["ksfsmc"],
           gradeCompos: info["ksffmc"]

        }
    })
    
}