
export type ExamScResponse = {
    "name": string;
    "courseId": string;
    "courseIndex": number;
    "campus": string;
    "time": string;
    "location": string;
    "method": string;
    "gradeCompos": string;
};

/**
 * 平台上得到的原数据格式
 */
export interface ExamScOrigin {
    /** name */
    "kcm": string;
    /** courseID */
    "kch": string;
    /** courseIndex */
    "kxh": number;
    /** campus */
    "xsjc": string; //软件园校区
    /** time */
    "sjsj": string;
    /** location */
    "jxlm": string; //软件园5区
    "jsm": string; //103d

    /** method */
    "ksfsmc": string; //开闭卷
    /** gradeCompos */
    "ksffmc": string; //成绩组成  如:"笔试30% 平时70%"
}