
export type GradeResponse = {
    "gradePoint": number;
    "courseIndex": number;
    "gradeRank": string;
    "type": string;
    "lowestGrade": string;
    "highestGrade": string;
    "grade": string;
    "name": string;
    "rank": string;
    "examTime": string,
    "credit": number;
    "courseId": string;
    "yearTerm": string;
    "selected": string;
};

/**
 * 平台上得到的原数据格式
 */
export interface GradeOrigin {
    "xnxq": string;
    "xh": string;
    "kch": string;
    "kxh": number;
    "kcm": string;
    "xs": number;
    "xf": number;
    "kcsx": string;
    "kssj": string;
    "kscjView": string;
    "wfzdj": string;
    "wfzjd": string;
}