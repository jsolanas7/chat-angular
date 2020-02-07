import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { ChatServiceService } from 'src/app/services/chat-service.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  user;
  message;
  url = environment.url;
  obj = {
    user: 'Juancito',
    message:' hHoasldasdo qwkeoqw eq',
    date: '24/05/2787'
  }
  messagesList  = [];
  constructor(private http: HttpClient,
    private datePipe: DatePipe,
    private chatService: ChatServiceService
    ) { }

  ngOnInit() {
    this.getMessages();
    this.chatService.listen('recibirMensaje').subscribe((resp) => {
      this.addMessage(resp);
    });

  }

  async getMessages(){
    try{
        const messages = await this.http.get(this.url + 'getAll').toPromise();
        
        console.log(messages);
        this.messagesList = Object.entries(messages).map(item => {
          return {
            user: item[1]['user'],
            message: item[1]['message'],
            date: this.datePipe.transform(item[1]['date'], 'yyyy-MM-dd')

          }
        });
    }catch(err){
      
    }
  }
  async sendMessage(){
    if(this.user != '' && this.message != ''){
      const body = {
        user: this.user,
        message: this.message
      }
      try{
          
          const resp = await this.http.post(this.url + 'create', body).toPromise();
          console.log(resp);
          this.chatService.emit('enviarMensaje', {
            message: resp['message'],
            user: resp['user'],
            date: this.datePipe.transform(resp['date'], 'yyyy-MM-dd')
            
          });
          const respMap = {
            message: resp['message'],
            user: resp['user'],
            date: this.datePipe.transform(resp['date'], 'yyyy-MM-dd')
          }
          this.addMessage(respMap);
      }catch(err){

      }
    }
  }

  addMessage(resp){
    this.messagesList.push({
      message: resp.message,
      user: resp.user,
      date: resp.date
    })
  }
}
