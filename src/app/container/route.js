import Loadable from 'react-loadable';
import LoadingComponent from '../../components/loading-component';

const User = Loadable({
  loader: () => import('./page/user'),
  loading: LoadingComponent,
  delay: 300,
});

export default [
  {
    path: '/user',
    key: 'user',
    component: User,
    name: '用户',
    // children: [
    //   {
    //     path: '/login',
    //     component: Home,
    //     breadcrumbName: 'qqq',
    //   },
    // ],
  },
];
