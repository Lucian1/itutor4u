import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import { MessageServiceService } from '../../../service/messageService/message-service.service';
import { Message } from '../../../model/app.message';
declare var $: any;

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.scss']
})
 
export class MessageDetailComponent implements OnInit {
  
  fromId: number = Number(localStorage.getItem('centerId'));
  fromType: string = "Parent";
  toId: number;
  toType: string = "Center";
  parentMessages: Message;
  centerMessages: Message;
  allMessage: Object[] = [];
  content: string;
  
  constructor(
    private route : Router,
    private actRoute: ActivatedRoute,
    private messageService: MessageServiceService
  ) { }

  ngOnInit() {
    this.actRoute.paramMap.subscribe(params => {
       console.log(params.get("parentId"));
       this.toId = Number(params.get("parentId"));
    })

    
    //parameter(fromId, fromType, toId, toType)
    this.messageService.allMessages(this.fromId,"Parent",this.toId,"Center").subscribe(
      res => {
      this.parentMessages = res;
      console.log("parentMessage" + this.parentMessages);
        for(let i in this.parentMessages) {
          this.allMessage.push(this.parentMessages[i]);
        }
      }
    );
    //all messager from Center to this parent
    this.messageService.allMessages(this.fromId,"Center",Number(this.toId),"Parent").subscribe(
      res => {
   //     console.log("This is all messager from Center")
     //   console.log(res);
       //this.messages.push(res);
      //  for(var i in res)
      //     this.messages.push([i, res[i]]);
         this.centerMessages = res;
        for(let i in this.centerMessages) {
           this.allMessage.push(this.centerMessages[i]);
        }
      }
    );
   
   
    this.allMessage.sort((a,b) => a['time'] - b['time']);
    console.log(this.allMessage);
   
  }
  closeForm(){
    document.getElementById("myForm").style.display = "none";
  }
  openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  sendMsg() {
    console.log(this.content);

    this.messageService.sendMessage(this.fromId,"Center",Number(this.toId),"Parent", this.content).subscribe(
      res => {
        console.log(res+ "this is response from send message")
        if(res == "success") 
        {
          alert("message sent success");
          $('textarea#msg').val = "";
          this.allMessage = [];
          this.ngOnInit();
        }else {
          alert("message sent faile");
        }
      }
    );
    // var outerDiv = document.createElement('div');
    // outerDiv.setAttribute('class', 'container darker');
      
    //   var nameTag = document.createElement('h4');
    //   nameTag.innerHTML = "me:";
    //   var contentTag = document.createElement('p');
    //   // change content innerhtml
    //   var content = $('textarea#msg').val();
    //   // var message = document.getElementById("textareaID").value();
    //   var content = $('#msg').val();
      
    //   console.log(content);
    //   contentTag.innerHTML = content;

    //   var timeTag = document.createElement("span");
    //   timeTag.setAttribute('class', 'time-right');
    //   var today = new Date();
    //   var time = today.getHours() + ":" + today.getMinutes();
    //   //time need to be chaned
    //   timeTag.innerHTML = time;
    // outerDiv.appendChild(nameTag);
    // outerDiv.appendChild(contentTag);
    // outerDiv.appendChild(timeTag);
    
    // var messageBox = document.getElementById("messageBox");
    // messageBox.appendChild(outerDiv);
  }

}

