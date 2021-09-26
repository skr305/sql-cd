import find_hom from './find_hom';
/** check if the desposit has enough money to pay and the password is correct
 *  if it is, return the remain after deduction,
 *  
 *  if no enough money return -1 
 * if no desposit return -2
 */
export default async ( usr_id: string, pwd: string, num: number ):Promise <number> => {

    const usr_hom = await find_hom(usr_id);

    if(!usr_hom) {
        return -2;
    }
    
    if(usr_hom.rem < num ) {
        console.log(pwd, usr_hom.pwd);
        return -1;
    }
    

    if(usr_hom.pwd != pwd) {
        return -6
    }

    return usr_hom.rem - num;
}