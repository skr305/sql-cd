import ivk from '../lib/get_ivk';
import pay from '../../request/pay';
import { get_on_suc, get_on_fal, get_on_err } from './cab';

/**
 * @params usr_id, tgt_id, pwd, number
 */
const do_book = ivk(pay)(get_on_suc, get_on_fal, get_on_err);