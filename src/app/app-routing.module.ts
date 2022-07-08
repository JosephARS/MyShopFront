import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';

const routes: Routes = [
  { path:'',
    component: LayoutComponent,
    children:[
      {path:'',redirectTo:'home', pathMatch:'full'},
      {path:'home', pathMatch:'full',component:ListaProductosComponent, },
      {path:'shopping', component:CarritoComprasComponent, },
      {path:'admin', component:AdminComponent, },
    ]
  },
//  {path:'login',component:LoginComponent},
  {path:'**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
