import { Component, OnInit } from '@angular/core';
import {LancarresultadoService  } from '../services/lancarresultado.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Pedidos} from '../models/pedidos.model'
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../services/file.service';
import {saveAs} from 'file-saver';

const uri = 'http://localhost:3000/upload/file/upload';

@Component({
  selector: 'app-lancar-resultado',
  templateUrl: './lancar-resultado.component.html',
  styleUrls: ['./lancar-resultado.component.css']
})
export class LancarResultadoComponent implements OnInit {
  pedidos:Pedidos
  selectedpedidoId: string;

  selected = "Infetado"

  constructor(private lancarresultadoService:LancarresultadoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
     this.route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          this.selectedpedidoId = params.id;
          this.lancarresultadoService.verPedidoaceite(params.id).subscribe((pedidos: Pedidos) => {
            this.pedidos = pedidos;



          })
        } else {
          this.pedidos = undefined;

        }
      }
    )

  }

  uploadFicheiros(): void{
    this.router.navigate(["pdf"]);
  }

  confirmar(resultado:String): void {
    this.lancarresultadoService.AceitarPedidos(this.selectedpedidoId,resultado).subscribe((pedidos:Pedidos)=>{

    })
    this.router.navigate(['tecnicos']);

  }

  retroceder(): void {
    this.router.navigate(["tecnicos"]);
  }

}
/**

  pedidos:Pedidos
  selectedpedidoId: string;

  uploader:FileUploader = new FileUploader({url:uri});

  attachmentList:any = [];

  constructor(private lancarresultadoService:LancarresultadoService, private route: ActivatedRoute, private router: Router,private _fileService:FileService) {
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
            this.attachmentList.push(JSON.parse(response));
        }
   }

  ngOnInit(): void {
     this.route.params.subscribe(
      (params: Params) => {
        if (params.id) {
          this.selectedpedidoId = params.id;
          this.lancarresultadoService.verPedidoaceite(params.id).subscribe((pedidos: Pedidos) => {
            this.pedidos = pedidos;



          })
        } else {
          this.pedidos = undefined;

        }
      }
    )

  }

 download(index){
        var filename = this.attachmentList[index].uploadname;

        this._fileService.downloadFile(filename)
        .subscribe(
            data => saveAs(data, filename),
            error => console.error(error)
        );
    }





  confirmar(resultado:String): void {
    this.lancarresultadoService.AceitarPedidos(this.selectedpedidoId,resultado).subscribe((pedidos:Pedidos)=>{

    })
    this.router.navigate(['tecnicos']);

  }

  retroceder(): void {
    this.router.navigate(["tecnicos"]);
  }

}*/
