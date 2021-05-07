import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {ModalOptions} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-ticket-modal',
  templateUrl: './ticket-modal.component.html',
  styleUrls: ['./ticket-modal.component.scss']
})
export class TicketModalComponent implements OnInit {
  form: FormGroup;
  isShow = false;
  modalRef: BsModalRef;
  fileToUpload: File = null; //file attace
  @ViewChild('template') template: TemplateRef<any>;
  imgCaptcha;
  isSubmitted=false;

  constructor(private modalService: BsModalService,
              private http: HttpClient) {
  }

  openModal() {
    this.isShow = true;
    const config: ModalOptions = {class: "modal-container"};
    this.modalRef = this.modalService.show(this.template, config)
  }

  ngOnInit() {
    this.getCaptcha().subscribe((data) => {
      this.createImageFromBlob(data);
    })
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      name: new FormControl('', [Validators.required,Validators.minLength(2)]),
      subject: new FormControl('', Validators.required),
      content: new FormControl('', [Validators.required, Validators.minLength(5)]),
      attach: new FormControl(''),
      capchavalue: new FormControl('', Validators.required)
    })
    this.modalService.onHide.subscribe(() => {
      this.isShow = false;
      this.fileToUpload=null;
      this.form.reset()
      this.isSubmitted=false
    })
  }

  submit(): Observable<any> {
    if (!this.form.valid) {
      return
    }
    this.submitForm().subscribe(
      () => {
        this.isSubmitted=true
      },
      (error) => {
        this.form.get('capchavalue').setValue('');
        console.log(error);
        this.getCaptcha().subscribe((data) => {
          this.createImageFromBlob(data);
        })
      }
    )

  }

  getCaptcha(): Observable<any> {
    return this.http.get('/assets/capcha/image.php', {responseType: 'blob'})
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imgCaptcha = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  submitForm(): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('attach', this.form.get('attach').value);
    formData.append('email', this.form.get('email').value);
    formData.append('name', this.form.get('name').value);
    formData.append('subject', this.form.get('subject').value);
    formData.append('content', this.form.get('content').value);
    formData.append('capchavalue', this.form.get('capchavalue').value);
    return this.http.post('/api/v2/feedback/contactform', formData)
  }
  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    this.form.get('attach').setValue(this.fileToUpload)
  }

}
