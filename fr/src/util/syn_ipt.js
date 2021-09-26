/** make the function sychonizing the input with the state from the state setter */
export default (setter) => {
    return (event) => {
        return setter(event.target.value);
    }
};