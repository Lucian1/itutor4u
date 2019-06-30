
import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
@Component({
    templateUrl: 'school.component.html'
})
export class SchoolComponent implements OnInit {
    constructor(
        @Inject(DOCUMENT)
        private _document: any) { }
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
        this.themeColors();
    }
    status: { isOpen: boolean } = { isOpen: false };
    disabled: boolean = false;
    isDropup: boolean = true;
    autoClose: boolean = false;
 
  
    items: string[] = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];
  
    onHidden(): void {
      console.log('Dropdown is hidden');
    }
    onShown(): void {
      console.log('Dropdown is shown');
    }
    isOpenChange(): void {
      console.log('Dropdown state is changed');
    }
  
    toggleDropdown($event: MouseEvent): void {
      $event.preventDefault();
      $event.stopPropagation();
      this.status.isOpen = !this.status.isOpen;
    }
  
    change(value: boolean): void {
      this.status.isOpen = value;
    }
}

