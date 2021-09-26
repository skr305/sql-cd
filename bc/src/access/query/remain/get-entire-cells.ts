import Cell from "@/dto/Cell";

/** get all r_code of one group */
export default (cell:Cell) => {
    const result = [];

    for(let i=cell.begin; i<=cell.end; i++) {
        result.push(`${cell.head}${i}`)
    }

    return result
}