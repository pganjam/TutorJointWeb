import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, forwardRef, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup} from '@angular/forms';

import { BaseControlValueAccessor } from '../../BaseControlValueAccessor';

@Component({
    selector: 'input-stars',
    templateUrl: './input-stars.component.html',
    styleUrls: ['./input-stars.component.scss'],
    providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputStarsComponent),
      multi: true
    }]
})
export class InputStarsComponent extends BaseControlValueAccessor<any> implements AfterViewInit{
    @Input() stars = [0,1,2,3,4];       // default is 5 stars
    @Input() messages: Array<string>;   // optional text descriptors for each rating value
    @Input() label: string | undefined; // optional Label
    @Input() value: number = 0;         // un-touched value should be null

    displayText: string | undefined;
    disabled = false;
    ratingText: string | undefined;

  constructor(private fb: FormBuilder, private eRef: ElementRef, private renderer: Renderer2) { 
    super(); 
    this.messages = [];
  }

  writeValue(val: number) {
    this.value = val;
    super.writeValue(this.value);
  }

  setRating(rating: number) {
    if (this.disabled) 
    { 
      return; 
    }

    // stars & messages arrays are 0 based
    let oldVal = rating;
    this.value = oldVal + 1;

    // set text to display (if it exists on the chosen star object)
    this.ratingText = this.messages[rating] ? this.messages[rating] : undefined;

    // set the value for the control
    this.onChange(this.value);
    this.onTouched();

    // SVG STAR & DOM STUFF
    const svgs = this.eRef.nativeElement.querySelectorAll('svg.star');

    for ( let i = 0, j = svgs.length; i < j; i++ ) {
      if (i <= rating) { 
        this.renderer.addClass(svgs[i], "active");
      } else {
        this.renderer.removeClass(svgs[i], "active");
      }
    }
  }

  // if there's a value on init we need to apply it to the stars programatically
  // eRef has no DOM on init. We need to work with our view within AfterViewInit
  ngAfterViewInit(){
    if (this.value !== null) { 
      let initialValue = this.value;
      this.setRating(--initialValue);
    }
  }

}
