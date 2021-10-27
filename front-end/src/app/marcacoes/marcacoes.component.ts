import { Component, OnInit } from '@angular/core';
import { MaracacoesService } from 'src/app/services/maracacoes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedidos } from 'src/app/models/pedidos.model';

@Component({
  selector: 'app-marcacoes',
  templateUrl: './marcacoes.component.html',
  styleUrls: ['./marcacoes.component.css']
})
export class MarcacoesComponent implements OnInit {

 constructor(private marcacoesService: MaracacoesService, private route: ActivatedRoute, private router: Router) { }

 selected = "SIM";

  recomendacao: string;
   grupo_de_risco: string;
    pq_risco: string;
    numero_utente:number;

  ngOnInit() {
     this.numero_utente=parseInt(localStorage.getItem("numero_utente"));


  }

  marcarExames(recomendacao,grupo_de_risco,pq_risco) {
    if( recomendacao== null ||  pq_risco == null){

      alert("Necessário preencher todos os campos!");
      return;
    }
    this.marcacoesService.createPedido(this.numero_utente,recomendacao,grupo_de_risco,pq_risco).subscribe((novoPedido:Pedidos)=>{
       this.router.navigate(['/pacientes'], { relativeTo: this.route });
    })
  }

}
