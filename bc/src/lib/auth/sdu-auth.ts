import { AuthUrl } from '@/constant/auth';
import { AxiosInstance } from 'axios';
import InternalError from '@/lib/errors/internal';
import TDEA from '@/lib/secrets/tdea';
import SDUService from '@/constant/sdu-service';
import InvalidArgumentError from '../errors/invalid-argument';

/**
 * 山东大学统一鉴权服务
 * @param axios
 * @param serviceUrl
 * @param casID
 * @param password
 */
async function sduUniAuth(
  axios: AxiosInstance,
  serviceUrl: SDUService,
  casID: string,
  password: string
) {
  const { data: html } = await axios.get<string>(AuthUrl, {
    params: {
      service: serviceUrl,
    },
  });
  const ltMatch = /id="lt".*?value="(.*?)"/.exec(html);
  if (!ltMatch) {
    throw new InternalError('获取统一认证服务数据失败');
  }
  const lt = ltMatch[1];
  const encode = TDEA(`${casID}${password}${lt}`, '1', '2', '3');
  const { data: resHtml } = await axios.post<string>(
    AuthUrl,
    {},
    {
      params: {
        service: serviceUrl,
        rsa: encode,
        ul: casID.length,
        pl: password.length,
        lt,
        execution: 'e1s1',
        _eventId: 'submit',
      },
    }
  );
  const errMatch = /<span id="errormsg" class="script_red">(.*?)<\/span>/g.exec(
    resHtml
  );
  if (errMatch) {
    throw new InvalidArgumentError(errMatch[1]);
  }
  return axios;
}

export default sduUniAuth;
