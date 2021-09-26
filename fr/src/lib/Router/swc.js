import Bus from '../../util/bus';

const swc = (path, args) => {
    Bus.emit("swc", path, args);
}

export default swc;