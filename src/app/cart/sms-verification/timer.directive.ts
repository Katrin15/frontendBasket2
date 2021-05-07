import { Directive, ElementRef, AfterViewChecked, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appTimer]'
})
export class TimerDirective implements AfterViewChecked, OnInit {

	@Input() start: boolean ; // children's class name to find
	//@Output() onUserVerificationSuccess = new EventEmitter<boolean>();
	@Output() onFinish = new EventEmitter<boolean>();

	startLocal: boolean = false;

	constructor(private el: ElementRef) {
	}

	ngOnInit() {  		
  	}

	ngAfterViewChecked() {
        // call our matchHeight function here later
        //this.startCount(this.el.nativeElement);

        if (this.start && !this.startLocal) {
        	this.startLocal = true;

        	this.setMinutes(this.el.nativeElement);
        	this.counting(this.el.nativeElement);
        }
    }



    counting(parent: HTMLElement) {
    	let timeleft = 59;
		let downloadTimer = setInterval( () =>{
			--timeleft;

			let seconds:string = timeleft.toString();
			if (timeleft < 10 ) { seconds = '0' + timeleft; }

			let children = parent.getElementsByClassName('seconds2');
			Array.from(children)
                .forEach((x: HTMLElement) => x.innerText = seconds);

			if (timeleft == 0) { 
				clearInterval(downloadTimer);

				this.startLocal = false;

				this.onFinish.emit(true);
			}

			},1000);
    }

    setMinutes(parent: HTMLElement) {
    	let children = parent.getElementsByClassName('seconds1');
		Array.from(children)
            .forEach((x: HTMLElement) => x.innerText = '00');
        children = parent.getElementsByClassName('seconds2');
			Array.from(children)
                .forEach((x: HTMLElement) => x.innerText = '59');
    }

}
