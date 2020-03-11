import { Component, OnInit, ɵConsole } from '@angular/core';
import { faSearch,faCircle } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';


@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  faSearch = faSearch;
  faCircle=faCircle;

  socket;
  constructor() { 
    
  }

  ngOnInit(): void {
    this.socket = io.connect('http://localhost:3000')
    this.socket.on("connect", this.onConnect);
    
  }

  onConnect =(socket)=>{
      console.log("WEB SOCKET CONNECTED....")
      this.socket.emit('EVENTS', {user:'USER_1', telefone:'#9999-9999'})

      this.socket.on('#9999-9999',(data)=>{
        console.log(data);
      })
  }

}
