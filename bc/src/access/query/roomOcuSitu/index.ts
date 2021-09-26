import query from "@/access/util/query";
import duringDays from "@/lib/date/during-days";
import moment = require("_moment@2.29.1@moment");


export default async (r_id:string):Promise<Array<Number>> => {
    const curDate = moment(new Date());

    const lastTwoMonth = moment(new Date()).subtract(59, "days"); 
    // console.log(lastTwoMonth.format("YYYY-MM-DD"), curDate.format("YYYY-MM-DD"))
    // const timeFormat = "YYYY-MM-DD"
    const days = duringDays(lastTwoMonth.format("YYYY-MM-DD"), curDate.format("YYYY-MM-DD"));


    const result:Array<Number> = [];


    const inSell = async (date:string):Promise<boolean> => {
        const findRoomSellSql = `select * from ocu where r_id = "${r_id}" and _date="${date}" `
        return (await query<OCU>(findRoomSellSql)).length != 0
    }
   

    for(let day of days) {
        const code =  await inSell(day) ? 1 : 0;
        result.push(code);
    }

    return result;
}