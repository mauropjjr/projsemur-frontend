import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'projetos',
        loadComponent: () => import('./views/projetos/projetos.component').then(m => m.ProjetosComponent),
        data: {
          title: 'Projetos'
        }
      },
      {
        path: 'exigencias',
        loadComponent: () => import('./views/exigencias/exigencias.component').then(m => m.ExigenciasComponent),
        data: {
          title: 'Exigências'
        }
      },
      {
        path: 'tipo-arquivos',
        loadComponent: () => import('./views/tipo-arquivos/tipo-arquivos.component').then(m => m.TipoArquivosComponent),
        data: {
          title: 'Tipo Arquivos'
        }
      },
      {
        path: 'codificacoes',
        loadComponent: () => import('./views/codificacoes/codificacoes.component').then(m => m.CodificacoesComponent),
        data: {
          title: 'Exigências'
        }
      },
      {
        path: 'analistas',
        loadComponent: () => import('./views/analistas/analistas.component').then(m => m.AnalistasComponent),
        data: {
          title: 'Analistas'
        }
      },
      {
        path: 'atividades',
        loadComponent: () => import('./views/atividades/atividades.component').then(m => m.AtividadesComponent),
        data: {
          title: 'Atividades/Usos'
        }
      },
      {
        path: 'areas-receptoras',
        loadComponent: () => import('./views/areas-receptoras/areas-receptoras.component').then(m => m.AreasReceptorasComponent),
        data: {
          title: 'Áreas Recetoras'
        }
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];
