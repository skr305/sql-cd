class Store {

    add_atr(data_name, ini_val="", ini_sets={}) {};

    ini_atr_val(data_name, val) {};

    add_atr_set(data_name, set_name, set) {};


    add_mid(data_name, mid, is_pre = false) {};

    /** global mid */
    add_glb_mid(mid, is_pre = false) {};

    

    do_set(data_name, set_name, ...args) {};
}