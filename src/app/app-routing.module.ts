import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { LoadingComponent } from './pages/loading/loading.component';
import { LoadingGuard } from './guards/loading.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: (): Promise<Type<AuthModule> | AuthModule[]> => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'pages',
    loadChildren: (): Promise<Type<PagesModule> | PagesModule[]> => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'loading',
    component: LoadingComponent,
    canActivate: [LoadingGuard]
  },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
