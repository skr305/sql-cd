import cck from '../lib/pay/util/cck';
/** check if the desposit has enough money to pay and the password is correct
 *  if it is, return the remain after deduction,
 *  
 *  if no enough money return -1 
 * if no desposit return -2
 */
export default async ( usr_id: string, pwd: string):Promise <boolean> => {

    return await cck(usr_id, pwd, 0) >= 0;

 
}