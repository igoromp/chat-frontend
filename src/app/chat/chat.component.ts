import { MessageComponent } from './message/message/message.component';
import { SessionService } from './../base/session/session.service';
import { BaseService } from './../base/base.service';
import { Component, OnInit, ViewChild, AfterViewInit, ViewContainerRef, ComponentFactoryResolver, AfterContentChecked, AfterViewChecked, ElementRef } from '@angular/core';

import io from 'socket.io-client';
import { AuthService } from '../auth/auth.service';


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

  constructor(
    private authService: AuthService,
    private base : BaseService,
    private session: SessionService,
    private cfr: ComponentFactoryResolver
    ) { 
    
  }
  

  ngOnInit(): void {
    this.configWebSocket()
    this.myEmail = this.session.usuario.email;
    this.myName = this.session.usuario.name;
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
    
    //if (!this.session.chatHash){
    this.socket.emit('register', { email });
    //}
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
      const {message, user} = messageObj;
      this.renderMessage(message,user, 'contactmessage');      
    })
  }

  sendMessage(){
    setTimeout(()=> {
      const messageObj = {
        ofUser:this.myName,
        toUser:this.currentContactEmail,
        message: this.messageTxt
      }
      this.renderMyMessage();
      this.socket.emit('private_message', messageObj)
    },500);
  }

  currentChat(contact) {
    this.currentContact = contact.name;
    this.currentContactEmail = contact.email;
  }

  private renderMyMessage(){
    this.renderMessage(this.messageTxt, 'Me' ,'mymessage');  
    this.messageTxt = '';

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
      this.contacts = this.session.contacts;
    }
  }
}
