import { Component, OnInit } from '@angular/core';
import { RegistoService } from 'src/app/services/registo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users.model';

@Component({
  selector: 'app-registo',
  templateUrl: './registo.component.html',
  styleUrls: ['./registo.component.css']
})
export class RegistoComponent implements OnInit {
  nome: string;
  data_de_nascimento: string;
  sexo: string;
  numero_utente: number;
  email:string;
  morada: string;
  profissao: string;
  telemovel:number;
  password:string;


  errors: String

  constructor(private registo: RegistoService, private route: ActivatedRoute, private router: Router) { }

  selected= "Masculino";

  ngOnInit(): void {
  }

   createUser(nome, email, data_de_nascimento, sexo, password, numero_utente, morada, telemovel, profissao) {
     if(this.nome==null || this.email==null ||this.password==null|| this.numero_utente==null ||this.morada==null || this.telemovel==null || this.profissao==null){
      alert("Dados errados! Preencha todos os dados!");
      return;
    }else if(this.numero_utente == 9){
      alert("Numero de utente tem de ter necessariamente 9 números!");
      return;
    }else if(this.telemovel == 9){
      alert("Numero de telemovel tem de ter necessariamente 9 números!");
      return;
    }
    this.registo.createRegisto(nome, email, data_de_nascimento, sexo, password, numero_utente, morada, telemovel, profissao).subscribe((novoUser:User)=>{
       this.router.navigate(['/login'], { relativeTo: this.route });
    },(error) => {
          this.errors = 'there are errors'
        });



}
}
