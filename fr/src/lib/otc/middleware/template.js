/**  */

const tem = async (ctx, nxt) => {
    // the new val has been set, if it's a prefix-middleware, it won't have this atr
    ctx.new_val;
    // the old val
    ctx.old_val;
    // you can mount the attribute to communicate with other mids
    ctx.mes = {a: 2};

    // use the next middleware function
    await nxt();

    /* glb mid will have these */
    // the data's name which will be set 
    ctx.data_name;

    // the set funtion
    ctx.set
    
    // the set function's name
    ctx.set_name
    
} 