import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageComponent } from './message/message/message.component';
import { SessionService } from './../base/session/session.service';
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterContentChecked, AfterViewChecked, ElementRef, HostListener } from '@angular/core';

import io from 'socket.io-client';
import { AuthService } from '../auth/auth.service';

const EVENTS_TYPE={
  START:'STARTED_TYPE',
  STOP:'STOPED_TYPE'
}


@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  
  contacts = [];

  socket;
  messageTxt: string;

  @ViewChild('listMessagesContainer', { read: ViewContainerRef }) listMessagesContainer:ViewContainerRef;
  currentContact: any;
  currentContactEmail: any;
  myEmail: any;
  myName: any;
  @ViewChild('chatMessagesHistory') chatMessageHistory: ElementRef;

  sendMessageForm : FormGroup;
  page: string;
  messageStop:any;
  messages: any = [];


  constructor(
    private authService: AuthService,
    private session: SessionService,
    private cfr: ComponentFactoryResolver,
    private fb: FormBuilder
    ) { }
  
  @HostListener('keyup',['$event']) typeMessageStarted(ev: KeyboardEvent){
    const target = ev.target as HTMLElement;
    const value = this.sendMessageForm.controls.messageTxt.value;
    
    if(target.id === 'input-message' && value.length % 10 === 0){
      const messageObj = {
        ofEmail:this.myEmail,
        ofUser:this.myName,
        toUser:this.currentContactEmail,
        message:EVENTS_TYPE.START
      }
      this.socket.emit('private_message', messageObj);
      this.typeMessageStop();
    }
  }

  typeMessageStop(){
   
   if(this.messageStop){
     clearTimeout(this.messageStop) 
     this.messageStop= null;
   }
    
   this.messageStop = setTimeout(()=>{
    const messageObj = {
      ofEmail:this.myEmail,
      ofUser:this.myName,
      toUser:this.currentContactEmail,
      message:EVENTS_TYPE.STOP
    }
    this.socket.emit('private_message', messageObj);
   },3000)

  }


  ngOnInit(): void {
    this.configWebSocket()
    this.myEmail = this.session.usuario.email;
    this.myName = this.session.usuario.name;
    this.page="chatLoadPage";

    this.sendMessageForm = this.fb.group({
      messageTxt:''
    });
    
  }

  configWebSocket() {
    this.socket = io.connect('http://localhost:3000/chat')
    this.socket.on("connected", this.onConnect);
    this.socket.on('register_chat',this.register);
    this.setContacts();
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 

  scrollToBottom(): void {
      try {
          this.chatMessageHistory.nativeElement.scrollTop = this.chatMessageHistory.nativeElement.scrollHeight;
      } catch(err) { }                 
  }
  
  onConnect = (socket) => { 
    const { email } = this.session.usuario 
    this.socket.emit('register', { email });
  }

  register = result => {
    const {token , contacts} = result;
    this.session.contacts = contacts;
    this.session.chatHash = token;
    this.setContacts()
    this.setMessageToken(token)
  }

  logoutChat(){
    this.authService.logout();
  }

  setMessageToken(token){
    this.socket.on(token,(messageObj)=>{
      const { message, user, receivedEmail } = messageObj;
      if(this.currentContactEmail === receivedEmail && !this.isEventTypeMessage(message)){

        this.renderMessage(message,user, MessageComponent.CONTACT_TYPE);      
      } else {
        this.contacts.forEach(ct=>{
          if(ct.email === receivedEmail){
            ct.message = this.messageReceived(receivedEmail, message, user, MessageComponent.CONTACT_TYPE)
          }
        })
      }
    })
  }

  isEventTypeMessage(message){
    return message === EVENTS_TYPE.START 
      ? true 
      : message === EVENTS_TYPE.STOP 
      ? true : false;
  }

  messageReceived(email, message, user, type){
    let convertMessage = "";
    if(message === EVENTS_TYPE.START){
      convertMessage = 'digitando...';
    } else if(message === EVENTS_TYPE.STOP){
      convertMessage = ''
    } else{
      convertMessage = message;

      if(!this.messages[email]){
        this.messages[email]=[];
      }
      this.messages[email].push({
        message, 
        user,
        type
      });

    }

    return convertMessage;
  }

  sendMessage(){
    setTimeout(()=> {
        const message = this.sendMessageForm.controls.messageTxt.value;
        const messageObj = {
          ofEmail:this.myEmail,
          ofUser:this.myName,
          toUser:this.currentContactEmail,
          message
        }
        clearTimeout(this.messageStop);
        this.renderMyMessage();
        this.socket.emit('private_message', messageObj);
      
    },500);
  }

  currentChat(contact) {
    this.currentContact = contact.name;
    this.currentContactEmail = contact.email;
    this.page='chatHistory';

    /* if(this.messages[contact.email] && this.messages[contact.email].length > 0 ){
      this.messages[contact.email].forEach(({message, user, type}) => {
        this.renderMessage(message, user, type);
      });
    } */
  }

  private renderMyMessage(){
    this.renderMessage(this.sendMessageForm.controls.messageTxt.value, 'Me' ,MessageComponent.MY_TYPE);  
    this.sendMessageForm.controls.messageTxt.setValue("");
  }

  renderMessage(message: string,user:string,  type: string) {
    const factory = this.cfr.resolveComponentFactory(MessageComponent);
    let cMessage = this.listMessagesContainer.createComponent(factory);
    cMessage.instance.message = message;
    cMessage.instance.user = user;
    cMessage.instance.typeMessage = type;
  }

  setContacts() {
    if ( this.session.contacts ){
      this.session.contacts.forEach((ct,i) => {
        this.contacts[i] = {
          ...ct,
          message:''
        }
      });
    }
  }
}
