import NotFoundError from "@/lib/errors/not-found";
import { AxiosInstance } from "axios";



/**
 * 从官网上获取校车信息
 * @param axios 
 * @param start 校车起始校区
 * @param end 校车终点校区
 * @param isWeekend 是否周末  (0/1 代表 否/是)
 */

 export async function getBusInfo (
    axios: AxiosInstance,
    start: string, 
    end: string, 
    isWeekend: number
) {
    const url = "http://www.sd114.sdu.edu.cn:8080/web/bus/load"
    
    const response = await axios.post(
        url,
        {},
        {
          params: {
            schoolAddr: start,
            startAddr: "",
            afterAddr: "",
            arriveAddr: end,
            type: isWeekend
          },
        }
      );



    if(response.status != 200 || !response.data || response.data.length == 0) {
        throw NotFoundError
    }

    return response.data
}


