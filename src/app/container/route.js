import Loadable from 'react-loadable';
import LoadingComponent from '@components/loading-component';

const UserManager = Loadable({
  loader: () => import('./page/base-manager/user-manager'),
  loading: LoadingComponent,
  delay: 300,
});
const MenuManager = Loadable({
  loader: () => import('./page/base-manager/menu-manager'),
  loading: LoadingComponent,
  delay: 300,
});
const Home = Loadable({
  loader: () => import('./page/home'),
  loading: LoadingComponent,
  delay: 300,
});

export default [
  {
    uri: '/',
    code: 'index',
    component: Home,
    menu: '首页',
  },
  {
    uri: '/admin',
    code: 'baseManager',
    menu: '基础配置管理',
    children: [
      {
        uri: '/admin/user',
        code: 'userManager',
        component: UserManager,
        menu: '用户管理',
      },
      {
        uri: '/admin/menu',
        code: 'menuManager',
        component: MenuManager,
        menu: '菜单管理',
      },
    ],
  },
];
