import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  user: any
  file: any

  constructor(public sessionService: SessionService, public router: Router, public http: HttpClient) { }

  ngOnInit(): void {
    this.sessionService.me().subscribe((user) => {
      this.user = user;
      if (!this.user) {
        const options = this.sessionService.expired ? { queryParams: { expired: 'true' } } : undefined
        this.router.navigate(['/login'], options);
      }
    })
  }

  onFileSelected(e) {
    console.log(e.target.files)
    this.file = (e.target.files || [])[0]
  }

  handleSubmit(e) {
    e.preventDefault()
      const formData = new FormData()
      formData.append('pdf', this.file)
      this.http.put('/api/events/5ecfb9c85eaa8fc5aef8a70a/pdf', formData)
      .subscribe(() => {
        console.log('ok')
      }),
      (error)=>{
        console.log(error);
      }
    };


  }



