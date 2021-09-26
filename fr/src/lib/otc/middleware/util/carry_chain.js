export default async (mids, ctx) => {
    console.log(mids);
    const last = mids.length-1;
    const exe_mid = (() => {
        const res = [];

        const push_mid = (idx, nxt) => {
            return res.unshift(async () => {
                return mids[idx](ctx, nxt);
            });
        }
        push_mid(last, async () => { return true });
        for(let i=last-1; i>=0; i--) {
            push_mid(i, res[0]);
        }

        return res[0];
    })()

    exe_mid();
}
