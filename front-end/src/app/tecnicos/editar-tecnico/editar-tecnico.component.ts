import { Component, OnInit } from '@angular/core';
import { EditarutilizadoresService } from 'src/app/services/editarutilizadores.service';
import { Params,ActivatedRoute, Router } from '@angular/router';
import {User} from '../../models/users.model'

@Component({
  selector: 'app-editar-tecnico',
  templateUrl: './editar-tecnico.component.html',
  styleUrls: ['./editar-tecnico.component.css']
})
export class EditarTecnicoComponent implements OnInit {

 constructor(private editarService: EditarutilizadoresService, private route: ActivatedRoute, private router: Router) { }
  id:string
  email:String
  morada:String
  profissao:String
  telemovel:String
  role:String
  data_de_nascimento:String
  passwordnew:String
  passwordold:String

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    )
  }

  editarUtilizador(email,morada,profissao,telemovel,data_de_nascimento,passwordnew,passwordold) {
    this.editarService.Editarutilizadornormal(this.id,email,morada,profissao,telemovel,data_de_nascimento,passwordnew,passwordold).subscribe((atualizar:User)=>{
       this.router.navigate(['/admin'], { relativeTo: this.route });
    })




  }


}
