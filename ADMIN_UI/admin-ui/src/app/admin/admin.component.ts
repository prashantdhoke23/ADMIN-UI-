import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminEntity } from '../entity/admin.entity';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.services';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']

})
export class AdminComponent {
  @Output() redirect: EventEmitter<any> = new EventEmitter();

  @Output()
  addForm: EventEmitter<AdminEntity> = new EventEmitter();
  addData: EventEmitter<any> = new EventEmitter();

  dtOptions: DataTables.Settings = {};
  forms: any = [];
  adminDetails: Array<AdminEntity> = new Array();
  admin_form: Array<AdminEntity> = new Array();
  public errorMsg: any;
  adminId: number = 0;

  admin: AdminEntity = new AdminEntity();

  editAdmin: AdminEntity = new AdminEntity();

  edit_email: any;
  name: any;
  mobile: any;
  mail: any;

  detail:any = {};

  constructor(private adminService: AdminService, private router: Router) { }
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,


    };

    this.adminService.getAllAdmins().subscribe((serverResponse: any) => {
      console.log('constrcutor serverResponse ', serverResponse);
      this.forms = serverResponse;
      this.addForm.emit(serverResponse);
    },
      (error) => {
        this.errorMsg = error;
      })
  }






  adminForm = new FormGroup({
    adminId: new FormControl([Validators.required]),
    adminName: new FormControl([Validators.required], Validators.minLength(4)),
    adminPass: new FormControl([Validators.required], Validators.minLength(3)),
    adminPhone: new FormControl([Validators.required], Validators.minLength(3)),
    adminMail: new FormControl([Validators.required], Validators.minLength(10))
  })




  submitAdminForm = () => {
    console.log('admin obj ', this.admin);

    //userd to post api call
    // var admin_form: any = {
    //   adminName: this.adminForm.value['adminName'],
    //   adminPass: this.adminForm.value['adminPass'],
    //   adminPhone: this.adminForm.value['adminPhone'],
    //   adminMail: this.adminForm.value['adminMail']
    // };



    this.adminService.createNewAdmin(this.admin).subscribe((serverResponse: any) => {
      console.log('createNewAdmin - serviceResponse : ', serverResponse);

      this.forms.push(serverResponse);
    },
      (error) => {
        this.errorMsg = error;
      }
    )
    console.log("forms -- ", this.forms)

    // console.log(this.adminForm.value);
    // this.adminService.addAdmins(admin_form);
    for (let i = 0; i < this.forms.length; i++) {
      console.log("Block statement execution no", i);
      console.log(" try --", this.forms.name)
    }

    let list: any[] = [];

    for (let form of this.forms) {
      list.push(form.id);
    }

    console.log("list ==== > ", list);



  }






  deleteAdminById = (id: any) => {
    console.log("delete called ", id);
    this.adminService.deleteByadminId(id).subscribe((serverResponse: any) => {
      const i = this.forms.findIndex((e: { id: any; }) => e.id === id);
      if (i !== -1) {
        this.forms.splice(i, 1);
      }
      console.log("i vlaue ", i)

      console.log('deleteByID - serviceResponse : ', serverResponse);

    },
      (error) => {
        this.errorMsg = error;
      }
    );
  }


  // editAdmin = this.forms
  navToEditPage = (id: number, detail: any) => {
    const i = this.forms.findIndex((e: { id: any; }) => e.id === id);


    this.redirect.emit(detail);
    console.log("admin nav to edit ", detail)

    this.adminService.setData(detail);

    this.router.navigate(['/admin_edit', id]);


  }





}



  //console.log(: any"forms -- ", this: any.forms: any);










