import { Component, OnInit } from '@angular/core';
import {CriarutilizadorService } from 'src/app/services/criarutilizador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users.model';

@Component({
  selector: 'app-criarutilizador',
  templateUrl: './criarutilizador.component.html',
  styleUrls: ['./criarutilizador.component.css']
})
export class CriarutilizadorComponent implements OnInit {
  nome: string;
  data_de_nascimento: string;
  sexo: string;
  numero_utente: string;
  email:string;
  morada: string;
  profissao: string;
  telemovel:number;
  password:string;
  role:string

   errors: String



  constructor(private criar: CriarutilizadorService, private route: ActivatedRoute, private router: Router) { }
selected = 'TECNICO';
  ngOnInit(): void {

  }

  createUser(nome, email, data_de_nascimento, sexo, password, numero_utente, morada, telemovel, profissao,role) {
    if(this.nome==null || this.email== null || this.data_de_nascimento == null || this.sexo == null || this.password == null || this.numero_utente == null || this.morada == null || this.telemovel == null || this.profissao == null || this.role == null){
      console.log(this.nome + this.email + this.data_de_nascimento + this.sexo + this.password + this.numero_utente + this.morada + this.telemovel + this.profissao + this.role )
      alert("Necessário preencher todos os campos!");
      return;
    }
    this.criar.createUtilizador(nome, email, data_de_nascimento, sexo, password, numero_utente, morada, telemovel, profissao, role).subscribe((novoUser:User)=>{
       this.router.navigate(['/gestaoutilizadores'], { relativeTo: this.route });
    },
    (error) => {
          this.errors = 'there are errors'
    });



}



}










