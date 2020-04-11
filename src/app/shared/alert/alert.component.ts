import { Component, OnInit, Input, ViewChild, Renderer2, ElementRef, ViewContainerRef, TemplateRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, AfterViewInit {
  

  //Alert constants
  static DANGER:string ='alert-danger';
  static INFO:string ='alert-primary';
  static WARNING:string ='alert-warning';
  static SUCCESS:string ='alert-success';

  private types ={
    'danger':AlertComponent.DANGER,
    'info':AlertComponent.INFO,
    'warning':AlertComponent.WARNING,
    'success':AlertComponent.SUCCESS
  }

  private _message:string='';
  private _type:string = 'info';

  @ViewChild('alertWrap') alert:ElementRef;
  
  display:boolean;
  constructor(private renderer: Renderer2) { }
 
  ngOnInit(): void {
    this.display = !!this.message;
  }

  ngAfterViewInit(): void {
    this.rendererAlert();
  }



  @Input() 
  set message(m:string){ this._message = m; }
  get message():string { return this._message;}

  @Input() 
  set type(t:string){this._type = t;}
  get type(){ return this._type;}

  rendererAlert(){
    if (this._message){
      this.renderer.setAttribute(this.alert.nativeElement, 'class', `alert ${this.getType()} alert-dismissible fade show`);
      this.renderer.setAttribute(this.alert.nativeElement,'role', 'alert')
    }
  }

  getType() {
    return this.types[this.type];
  }


  public setMessage(message: string) {
    this.message = message;
    return this;
  }

  public setType(type: string) {
    this.type = type;
    return this;
  }

  public show() {
    this.rendererAlert();
    this.display= true;
  }

  public close() {
    this.display=false;
  }
}
