import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';
import { FormularioProductoComponent } from './components/formulario-producto/formulario-producto.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { PagoComponent } from './components/pago/pago.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [
  { path:'',
    component: LayoutComponent,
    children:[
      {path:'',redirectTo:'home', pathMatch:'full'},
      {path:'home', pathMatch:'full',component:ListaProductosComponent, },
      {path:'shopping', component:CarritoComprasComponent, },
      {path:'inventario', component:AdminComponent, },
      {path:'inventario/producto/:idproducto', component:FormularioProductoComponent, },
      {path:'payment', component:PagoComponent, },
      {path:'ventas', component:VentasComponent, },
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
