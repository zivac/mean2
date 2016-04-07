import {Component, Input, Output, View, EventEmitter} from 'angular2/core';
import {NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';
declare var jQuery:any;

@Component({
  selector: 'my-input'
})
@View({
  templateUrl: 'app/components/input/input.component.html',
  styleUrls: ['app/components/input/input.component.css']
})
export class InputComponent {

  @Input() value;
  @Input() type;
  @Input() name;

  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  getId(name) {
    return name.replace(' ', '_');
  }

  emitValueChange() {
    //console.log(this.value)
    this.valueChange.emit(this.value);
  }

  constructor() {}

  // ngOnInit() {
  //   jQuery('.datepicker').pickadate({
  //     selectMonths: true, // Creates a dropdown to control month
  //     selectYears: 15 // Creates a dropdown of 15 years to control year
  //   });
  // }

}
