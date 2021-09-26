export default (set_loading, err, on_err) => {
    set_loading(false)
    return on_err(err);
}