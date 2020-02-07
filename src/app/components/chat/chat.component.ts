import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';


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
    ) { }

  ngOnInit() {
    this.getMessages();
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
          this.messagesList.push({
            message: this.message,
            user: this.user,
            date: this.datePipe.transform(resp['date'], 'yyyy-MM-dd')
          })
      }catch(err){

      }
    }
  }
}
