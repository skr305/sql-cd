import ID from '@/access/util/ID';
import add_his from '../lib/book/add_his';
import pay from '../lib/pay';
import own from '../lib/usr/own';
import addOCU from '../room-accident/util/addOCU';

export default ( usr: string, r_id: string, r_code:string) => {

    return async ( dates:Array<string>, prc: number, hom_pwd: string, iden:string ) : Promise<string> => {
       
        const h_id = ID.HID(); 
        const usr_id = usr;
        const tgt_id = (await own(r_id)).usr;
        
        
        const pay_suc = await(pay(usr_id, tgt_id, hom_pwd, prc))
        
        if (pay_suc == 0) {


           await add_his(r_id, r_code, usr, dates, prc, iden);
           await addOCU(r_id, r_code, h_id, usr, dates);
           
           return "0"
        }

        
        //no enough money
        if(pay_suc == -1) {
            return "1";
        } 
        // no desposit
        else if (pay_suc == -2) {
            return "3"
        }
        
        // no desposit
        else if (pay_suc == -6) {
            return "4"
        }

        return "5";
        

    }
}

