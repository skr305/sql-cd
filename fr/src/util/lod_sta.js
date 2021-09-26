const subs = [];

/** subscript */
export const sub = (suber) => {
    subs.push(suber);
}

export default (state) => {
    subs.forEach((suber) => {
        suber(state);
    })
}