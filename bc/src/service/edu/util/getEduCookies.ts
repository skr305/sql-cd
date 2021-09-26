import { AxiosInstance } from "axios";
import TDEA from '@/lib/secrets/tdea' 
const cheerio = require('cheerio')

/**
 * 得到教务系统中需要的cookies
 * @param axios 
 * @param casID 
 * @param password 
 */
export async function getEduCookies(
    axios: AxiosInstance,
    casID: string,
    password: string
) {


    const eduLoginURL = "http://pass.sdu.edu.cn/cas/login?service=http://bkjws.sdu.edu.cn/f/j_spring_security_thauth_roaming_entry"
    
    const HistoryAoData = `[{"name":"sEcho","value":2},{"name":"iColumns","value":10},{"name":"sColumns","value":""},{"name":"iDisplayStart","value":0},{"name":"iDisplayLength","value":-1},{"name":"mDataProp_0","value":"xnxq"},{"name":"mDataProp_1","value":"kch"},{"name":"mDataProp_2","value":"kcm"},{"name":"mDataProp_3","value":"kxh"},{"name":"mDataProp_4","value":"xf"},{"name":"mDataProp_5","value":"kssj"},{"name":"mDataProp_6","value":"kscjView"},{"name":"mDataProp_7","value":"wfzjd"},{"name":"mDataProp_8","value":"wfzdj"},{"name":"mDataProp_9","value":"kcsx"},{"name":"iSortCol_0","value":5},{"name":"sSortDir_0","value":"desc"},{"name":"iSortingCols","value":1},{"name":"bSortable_0","value":false},{"name":"bSortable_1","value":false},{"name":"bSortable_2","value":false},{"name":"bSortable_3","value":false},{"name":"bSortable_4","value":false},{"name":"bSortable_5","value":true},{"name":"bSortable_6","value":false},{"name":"bSortable_7","value":false},{"name":"bSortable_8","value":false},{"name":"bSortable_9","value":false}]`
    const getHistoryGradeURL = "http://bkjws.sdu.edu.cn/b/cj/cjcx/xs/lscx"

    let lt = 0

    await axios.get(eduLoginURL).then(
        (res)=> {   
            let $ = cheerio.load(res.data)
            lt = $('#lt').val()      
          
        }
    )
    

    const encode = TDEA(`${casID}${password}${lt}`, '1', '2', '3')


    await axios.post(
        eduLoginURL,
        {},
        {
          params: {
            rsa: encode,
            ul: casID.length,
            pl: password.length,
            lt,
            execution: 'e1s1',
            _eventId: 'submit',
          } 
        }
      )

      

      await axios.post(getHistoryGradeURL + "?aoData=" + HistoryAoData)


      await axios.get(eduLoginURL)


      return axios
    
}