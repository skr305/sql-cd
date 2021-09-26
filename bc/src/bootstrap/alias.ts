import * as moduleAlias from 'module-alias';
import * as path from 'path';

// 解析绝对路径
moduleAlias.addAlias('@', path.resolve(__dirname, '../'));
moduleAlias();
