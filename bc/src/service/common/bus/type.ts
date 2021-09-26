
export type BusResponse = {
    s: string;
    t: string;
    e: string;
    p: string;
};

/**
 * 平台上得到的原数据格式
 */
export interface BusOrigin {
    DEPARTURE_STATION: string;
    DEPARTURE_TIME: string;
    TERMINUS: string;
    VIA_SITE: string;
}