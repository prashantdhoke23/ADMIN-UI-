import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminEntity } from '../entity/admin.entity';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

import { AdminService } from '../services/admin.services';

@Component({
  selector: 'admin-edit',
  templateUrl: './admin-edit.component.html'
})
export class AdminEditComponent {
  @Input() data: any = {};

  @Input()
  public admins: Array<AdminEntity> = [];
  forms: any = [];
  adminDetails: Array<AdminEntity> = new Array();
  admin_form: Array<AdminEntity> = new Array();

  adminId: number = 0;

  admin: AdminEntity = new AdminEntity();
  text: any;

  editId: any = 0; name: any;
  mail: any;
  mobile: any;

  detail: any = {};

  pass: string = '';


  ngOnInit(): void {
    let iod = this.route.snapshot.paramMap.get('id');
    console.log("id value ", iod)
    this.editId = iod;
    for (let form of this.admins) {
      if (form.id === this.editId) {
        this.name = form.name;
        this.mail = form.email;
        this.mobile = form.phNumber;

      }
    }

    console.log("mail ", this.admins)
  }

  constructor(private adminService: AdminService, private route: ActivatedRoute) {


    this.detail = this.adminService.getData();

  }

  adminForm = new FormGroup({
    adminId: new FormControl([Validators.required]),
    adminName: new FormControl([Validators.required]),
    adminPass: new FormControl([Validators.required]),
    adminPhone: new FormControl([Validators.required]),
    adminMail: new FormControl([Validators.required])
  })




  submitAdminForm = () => {


    var admin_form: any = {
      adminName: this.adminForm.value['adminName'],
      adminPass: this.adminForm.value['adminPass'],
      adminPhone: this.adminForm.value['adminPhone'],
      adminMail: this.adminForm.value['adminMail'],

    };

    console.log("after edit update --", this.detail);

    this.admin.email = this.detail.email;
    this.admin.phNumber = this.detail.phNumber;
    this.admin.name = this.detail.name;


    this.adminService.editAdmin(this.editId, this.admin).subscribe((serverResponse: any) => {
      console.log('edit  - serviceResponse : ', serverResponse);

      this.forms.push(serverResponse);
    })



  }
  deleteAdminById = (id: any) => {
    console.log("delete called ", id);
    this.adminService.deleteByadminId(id).subscribe((serverResponse: any) => {
      this.forms.pop(id);
      console.log('deleteByID - serviceResponse : ', serverResponse);

    });
  }



}







