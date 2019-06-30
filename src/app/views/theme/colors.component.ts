import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { Router } from '@angular/router';
import { MessageServiceService } from '../../service/messageService/message-service.service';
import { Message } from '../../model/app.message';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  messages : Object[] = [];
  centerId: string;
  constructor(
    @Inject(DOCUMENT) private _document: any,
    private route : Router,
    private messageService: MessageServiceService
  ) {}

  public themeColors(): void {
    Array.from(this._document.querySelectorAll('.theme-color')).forEach((el: HTMLElement) => {
      const background = getStyle('background-color', el);
      const table = this._document.createElement('table');
      table.innerHTML = `
        <table class="w-100">
          <tr>
            <td class="text-muted">HEX:</td>
            <td class="font-weight-bold">${rgbToHex(background)}</td>
          </tr>
          <tr>
            <td class="text-muted">RGB:</td>
            <td class="font-weight-bold">${background}</td>
          </tr>
        </table>
      `;
      el.parentNode.appendChild(table);
    });
  }
  ngOnInit(): void {
    this.centerId =  localStorage.getItem('centerId');
   // console.log(this.messageService.showMessageList());
   this.messageService.showMessageList().subscribe(
      res => {
        var set = new Set();
        // filter duplicate parentName object
        for(var i = 0; i < res.length; i ++) {
          if(!set.has(res[i].Name)) {
            set.add(res[i].Name);
           this.messages.push(res[i]);
          }
        }
        //this.messages = res;
        console.log("all messages");
        console.log(this.messages);
      }
    )
    this.themeColors();
  }

  checkMessage(): void {
    alert("works");
    //this.route.navigate(['/school/detailMessage/' + this.messages.fromId])
  }
}
