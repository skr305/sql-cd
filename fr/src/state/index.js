import Store from '../lib/otc';

const store = new Store().get_ini((store) => {
    store.add_atr("auth", {usr: ""}, {
        lgn(ctx, usr) { return {usr} }
    });
}) 

export default store;