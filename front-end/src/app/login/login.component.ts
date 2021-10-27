import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: string
  password: string
  errors: String

  constructor(private session: SessionService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params) => {
        if (params.expired) {
          this.errors = 'Your session was expired'
        }
      })
  }


  handleSubmit(event): void {
    event.preventDefault()
    this.errors = ''
    if(!this.email || !this.password){
      alert("Dados errados!");
      return;
    }
    this.session.login(this.email, this.password)
    .subscribe(
      () => {
        const role = localStorage.getItem('role');
        if(role === 'ADMIN'){
          this.router.navigate(["/dashboard"]);
        }else if(role === 'TECNICO'){
          this.router.navigate(['/tecnicos'])
        }else if(role === 'PACIENTE'){
          this.router.navigate(['/pacientes'])
        }
      },
      (error) => {
        if (error.status === 401) {
          this.errors = 'Invalid credentials.'
        } else {
          this.errors = error.message
        }
      }
    )
  }

}


/*
  login(email , password){

    this.session.login(email,password).subscribe((user:User)=>{

      if(user.role === 'Paciente'){
        this.router.navigate(['/pacientes'], { relativeTo: this.route });
      }else if(user.role === 'Tecnico'){
        this.router.navigate(['/tecnicos'], { relativeTo: this.route });
      }else if(user.role === 'ADMIN'){
        this.router.navigate(['/dashboard'], { relativeTo: this.route });
      }
      })
    ,
    (error) => {
            this.errors = 'there are errors'
          }
    }
  }*/

  /**
  login(email , password){
  this.session.login(email, password).subscribe((res: HttpResponse<any>) => {
    if (res.status === 200) {
      // we have logged in successfully
      this.router.navigate(['/tecnicos']);
    }
    console.log(res);
  })
  }*/


