import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistoComponent } from './registo/registo.component';
import { MenuComponent } from './menu/menu.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PerfiladminComponent } from './perfiladmin/perfiladmin.component'
import { EditarpasswordComponent } from './perfiladmin/editarpassword/editarpassword.component';
import { GestaoutilizadoresComponent } from './gestaoutilizadores/gestaoutilizadores.component';
import { EditarutilizadorComponent } from './gestaoutilizadores/editarutilizador/editarutilizador.component';
import { CriarutilizadorComponent } from './gestaoutilizadores/criarutilizador/criarutilizador.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PerfilpacienteComponent } from './perfilpaciente/perfilpaciente.component';
import { EditarmeuperfilComponent } from './perfilpaciente/editarmeuperfil/editarmeuperfil.component';
import { MarcacoesComponent } from './marcacoes/marcacoes.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { AgendarTesteComponent } from './agendar-teste/agendar-teste.component';
import { VerPedidosComponent } from './ver-pedidos/ver-pedidos.component';
import { VerPerfilPacientesComponent } from './ver-perfil-pacientes/ver-perfil-pacientes.component';
import { PerfilTecnicoComponent } from './tecnicos/perfil-tecnico/perfil-tecnico.component';
import { EditarTecnicoComponent } from './tecnicos/editar-tecnico/editar-tecnico.component';
import { LancarResultadoComponent } from './lancar-resultado/lancar-resultado.component';
import { TipoGuard } from './guards/tipo.guard';
import { GestaoPedidosConcluidosComponent } from './gestao-pedidos-concluidos/gestao-pedidos-concluidos.component';
import { GestaoPedidosAceitesComponent } from './gestao-pedidos-aceites/gestao-pedidos-aceites.component';
import{PdfComponent} from './pdf/pdf.component'
import{VerPedidosGeralComponent} from './ver-pedidos-geral/ver-pedidos-geral.component'



const routes: Routes = [
  {path: '', component: MenuComponent, },

  {path: 'login', component: LoginComponent },

  {path: 'registo', component: RegistoComponent},

  {path: 'perfiladmin', component: PerfiladminComponent, canActivate: [TipoGuard], data: { role: 'ADMIN' }},

  {path: 'editarpassword', component: EditarpasswordComponent, canActivate: [TipoGuard], data: { role: 'ADMIN' }},

  {path: 'gestaoutilizadores', component: GestaoutilizadoresComponent, canActivate: [TipoGuard], data: { role: 'ADMIN' }},

  {path: 'gestaoPedidoAceites', component: GestaoPedidosAceitesComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'gestaoPedidoConcluido', component: GestaoPedidosConcluidosComponent, canActivate: [TipoGuard], data: { role: 'ADMIN'}},

  {path: 'criarutilizador', component: CriarutilizadorComponent, canActivate: [TipoGuard], data: { role: 'ADMIN' }},

  {path: 'editarutilizador', component: EditarutilizadorComponent, canActivate: [TipoGuard], data: { role: 'ADMIN' }},

  {path: 'pacientes' , component: PacientesComponent, canActivate: [TipoGuard], data: { role: 'PACIENTE' }},

  {path: 'perfilpaciente', component: PerfilpacienteComponent, canActivate: [TipoGuard], data: { role: 'PACIENTE' }},

  {path: 'editarperfilpaciente' , component: EditarmeuperfilComponent, canActivate: [TipoGuard], data: { role: 'PACIENTE' }},

  {path: 'marcacoes' , component: MarcacoesComponent, canActivate: [TipoGuard], data: { role: 'PACIENTE' }},

  {path: 'tecnicos' , component: TecnicosComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'agendarTeste/:Pedido' , component: AgendarTesteComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'verPedido/:id' , component: VerPedidosComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'verPerfilPaciente' , component: VerPerfilPacientesComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'perfilTecnico' , component: PerfilTecnicoComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'editarPerfilTecnico' , component: EditarTecnicoComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'lancarResultado/:id' , component: LancarResultadoComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'pdf' , component: PdfComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'pacientegeral' , component: VerPedidosGeralComponent, canActivate: [TipoGuard], data: { role: 'TECNICO' }},

  {path: 'dashboard' , component: DefaultComponent, canActivate: [TipoGuard], data: { role: 'ADMIN' },
   children: [
     {path: '' , component: DashboardComponent}
   ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
