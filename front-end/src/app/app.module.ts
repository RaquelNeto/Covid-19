import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {CommonModule} from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistoComponent } from './registo/registo.component';
import { MenuComponent } from './menu/menu.component';
import { DefaultModule } from './layouts/default/default.module';
import { PerfiladminComponent } from './perfiladmin/perfiladmin.component';

import { EditarpasswordComponent } from './perfiladmin/editarpassword/editarpassword.component';

import { GestaoutilizadoresComponent } from './gestaoutilizadores/gestaoutilizadores.component';
import { CriarutilizadorComponent } from './gestaoutilizadores/criarutilizador/criarutilizador.component';
import { EditarutilizadorComponent } from './gestaoutilizadores/editarutilizador/editarutilizador.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { SidebarComponent } from './pacientes/sidebarP/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PerfilpacienteComponent } from './perfilpaciente/perfilpaciente.component';
import { EditarmeuperfilComponent } from './perfilpaciente/editarmeuperfil/editarmeuperfil.component';
import { MarcacoesComponent } from './marcacoes/marcacoes.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { SidebartecnicosComponent } from './tecnicos/sidebartecnicos/sidebartecnicos.component';
import { AgendarTesteComponent } from './agendar-teste/agendar-teste.component';
import { VerPedidosComponent } from './ver-pedidos/ver-pedidos.component';
import { LancarResultadoComponent } from './lancar-resultado/lancar-resultado.component';
import { PerfilTecnicoComponent } from './tecnicos/perfil-tecnico/perfil-tecnico.component';
import { EditarTecnicoComponent } from './tecnicos/editar-tecnico/editar-tecnico.component';
import { VerPerfilPacientesComponent } from './ver-perfil-pacientes/ver-perfil-pacientes.component';
import { SessionLostInterceptor } from './interceptors/session-lost.interceptor';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { GestaoPedidosAceitesComponent } from './gestao-pedidos-aceites/gestao-pedidos-aceites.component';
import { GestaoPedidosConcluidosComponent } from './gestao-pedidos-concluidos/gestao-pedidos-concluidos.component';
import { VerPedidosGeralComponent } from './ver-pedidos-geral/ver-pedidos-geral.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistoComponent,
    MenuComponent,
    PerfiladminComponent,
    EditarpasswordComponent,
    GestaoutilizadoresComponent,
    GestaoPedidosAceitesComponent,
    GestaoPedidosConcluidosComponent,
    CriarutilizadorComponent,
    EditarutilizadorComponent,
    PacientesComponent,
    SidebarComponent,
    PerfilpacienteComponent,
    EditarmeuperfilComponent,
    MarcacoesComponent,
    TecnicosComponent,
    SidebartecnicosComponent,
    AgendarTesteComponent,
    VerPedidosComponent,
    LancarResultadoComponent,
    PerfilTecnicoComponent,
    EditarTecnicoComponent,
    VerPerfilPacientesComponent,
    VerPedidosGeralComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatSnackBarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    CommonModule,
     MatSelectModule,
    MatRadioModule
  ],

  providers: [
     {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionLostInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }

  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
