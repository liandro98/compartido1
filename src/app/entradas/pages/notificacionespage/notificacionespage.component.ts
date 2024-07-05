import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notificacionespage',
  templateUrl: './notificacionespage.component.html',
  styles: ``
})
export class NotificacionespageComponent {
  notifForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.notifForm = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reportType: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      recipient: ['', Validators.required]
    });
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}

