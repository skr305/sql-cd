/** 
 * input a array of boolean
 * if all of them is true
 * return true 
 * or, return false
 */

export default (bool_arr: Array<boolean>) => {
    for(let bool of bool_arr) {
        if(!bool) {
            return false;
        }
    }
    
    return true;
}