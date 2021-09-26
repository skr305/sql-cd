import Bus from '../../util/bus';

export default (path, com) => {
    Bus.emit("add_rot", path, com);
}