import { BusResponse, BusOrigin } from "./type";

/**
 * 把从山大服务平台得到的数据转化成Response需要的数据格式
 * @param busInfo 服务平台上得到的原数据
 */
export function busAdapter(busInfo:Array<BusOrigin>) : Array<BusResponse> {
    return busInfo.map((info:BusOrigin) => {
        return {
            s: info["DEPARTURE_STATION"],
            t: info["DEPARTURE_TIME"],
            e: info["TERMINUS"],
            p: info["VIA_SITE"]
        }
    })
    
}

