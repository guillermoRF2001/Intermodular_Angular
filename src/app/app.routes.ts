import { Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuarioDetailComponent } from './components/usuario-detail/usuario-detail.component';
import { CocheListComponent } from './components/coche-list/coche-list.component';
import { CocheFormComponent } from './components/coche-form/coche-form.component';
import { CocheDetailComponent } from './components/coche-detail/coche-detail.component';

export const routes: Routes = [
  { path: 'usuarios', component: UsuarioListComponent },
  { path: 'usuarios/nuevo', component: UsuarioFormComponent },
  { path: 'usuarios/editar/:id', component: UsuarioFormComponent },
  { path: 'usuarios/:id', component: UsuarioDetailComponent },
  { path: 'coches', component: CocheListComponent },
  { path: 'coches/nuevo', component: CocheFormComponent },
  { path: 'coches/editar/:id', component: CocheFormComponent },
  { path: 'coches/:id', component: CocheDetailComponent },
  { path: '', redirectTo: '/coches', pathMatch: 'full' },
];