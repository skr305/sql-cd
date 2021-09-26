import ISDUContext from '@/types/isdu-context';
import * as Router from 'koa-router';
import authRoutes from './auth';
import roomRoutes from './room';
import PerRoutes from './per';

const router = new Router<any, ISDUContext>();

router.use('/room', roomRoutes);
router.use('/auth', authRoutes);
router.use('/per', PerRoutes);


const routes = router.routes();
export default routes;
