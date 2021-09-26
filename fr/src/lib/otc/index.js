import carry_chain from "./middleware/util/carry_chain";

/** the return val of the sets will be used to update the val */
class Store {
    data = {};
    glb_mids = [];

    pre_glb_mids = [];

    get_ini(ini) {
        ini(this);
        return this;
    }

    add_atr(data_name, ini_val="", ini_sets={}) {
        this.data[data_name] = {
            val: ini_val,
            sets: ini_sets,
            mids: [],

            pre_mids: []
        }
    };

    ini_atr_val(data_name, val) {
        if(!this.data[data_name]) {
            this.data[data_name] = {}
        }
        this.data[data_name][val] = val;
    }

    add_atr_set(data_name, set_name, set) {
        this.data[data_name]["sets"][set_name] = set
    }


    add_mid(data_name, mid, is_pre = false) {
        // the section of the middleware
        const mid_sec = is_pre ? "pre_mids" : "mids";

        return this.data[data_name][mid_sec].push(mid);
    }

    /** global mid */
    add_glb_mid(mid, is_pre = false) {
        const mid_sec = is_pre ? "glb_mids" : "pre_glb_mids";
        return this[mid_sec].push[mid];
    }


    /** core function */

    do_set(data_name, set_name, ...args) {
        const set = this.data[data_name][set_name];
        const old_val = this.data[data_name]["val"];
        const ctx = {
            data_name,
            set_name,
            set,
            old_val
        }

        const exe_pip = async () => {
            // first carry out the global pre_mids
            await carry_chain(this.pre_glb_mids, ctx);
            await carry_chain(this.data[data_name].pre_mids, ctx);
            this.data[data_name].val = ctx.new_val = await set(ctx, ...args);
            await carry_chain(this.glb_mids, ctx);
            await carry_chain(this.data[data_name].mids, ctx)
        }

        
        
        exe_pip();
    }
}

export default Store;