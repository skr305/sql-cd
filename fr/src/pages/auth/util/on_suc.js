import ivk from '../../../api/common/lib/get_ivk';

export default (usr, pwd) => {
    const on_suc = () => {

        // the logic of the load the person_info and
        return (res) => {
            const on_suc = (res) => {
                const {avatar, hom_id, usr} = res.data;
                set_usr({avatar, usr, hom_id});
                
                history.replace("/rec");

           }
           const api = get_ivk(get_per)(on_suc);

           api(usr);
        }
    }


    const api = get_ivk(reg)(on_suc());
        api(usrname, pwd1);
}