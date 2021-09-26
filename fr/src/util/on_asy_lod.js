export default async (set_loading, res, on_suc, on_fal) => {
    
    if(res.suc) {
        await on_suc(res);
    } else {
        await on_fal(res);
    }
    
    set_loading(false)
};

