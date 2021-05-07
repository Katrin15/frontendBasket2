import { Directive, ElementRef, AfterViewChecked, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appMatchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked {

	@Input() className: string; // children's class name to find

	constructor(private el: ElementRef) {
		
    }

    ngAfterViewChecked() {
        // call our matchHeight function here later
        this.matchHeight(this.el.nativeElement, this.className);
    }

    matchHeight(parent: HTMLElement, className: string) {

    		

            // match height logic here
            if (!parent) return;

            // step 1: find all the child elements with the selected class name
            const children = parent.getElementsByClassName(className);
            
            if (!children) return;

            // set auto-height
            Array.from(children)
                .forEach((x: HTMLElement) => x.style["height"] = 'auto');

            // step 2a: get all the child elements heights
            const itemHeights = Array.from(children)
                .map(x => x.getBoundingClientRect().height);

            // step 2b: find out the tallest
            const maxHeight = itemHeights.reduce((prev, curr) => {
                return curr > prev ? curr : prev;
            }, 0);

            // step 3: update all the child elements to the tallest height
            Array.from(children)
                .forEach((x: HTMLElement) => x.style["height"] = `${maxHeight}px`);


            parent.style["height"] = maxHeight + 40 + 'px'; //`${maxHeight}px`;            
    }

}
