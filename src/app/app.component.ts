import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontendBasket2';

  constructor(private eltRef:ElementRef) {
    let prop = eltRef.nativeElement.getAttribute('bodyData');
    console.log("PROP", prop);
  }
}
