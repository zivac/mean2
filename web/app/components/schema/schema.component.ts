import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FORM_DIRECTIVES, COMMON_DIRECTIVES} from 'angular2/common';
import {ApiService} from '../../services/api/api.service';
import {Router} from 'angular2/router';
declare var jQuery:any;

@Component({
    selector: 'my-schema',
    templateUrl: 'app/components/schema/schema.component.html',
    styleUrls: ['app/components/schema/schema.component.css'],
    providers: [ApiService]
})
export class SchemaComponent {

  @Input() data: Object;

  public name: String;
  public mainField: String;
  private router: Router;

  constructor(_router:Router) {
    this.router = _router;
    this.mainField = 'Name';
  }

  ngOnInit() {
    console.log(this.data);
    var sortableId="#sortable";
    if(this.data) {
      this.name = this.data['name'];
      this.mainField = this.data['mainField'];
      sortableId += "_1";
    }
    setTimeout(() => {
      console.log(jQuery(sortableId));
      jQuery( sortableId ).sortable({
        revert: true,
        beforeStop: function(event, ui) {
          var draggedEl = ui.item;
          if(draggedEl.hasClass('draggable')) {
            draggedEl.addClass('row');
            draggedEl.addClass('collection-field');
            draggedEl.removeClass('draggable')
            var icon = draggedEl.find('i').html();
            draggedEl.html(`
              <div class="col s1">
                <i class="material-icons">`+icon+`</i>
              </div>
              <div class="col s10">
                <input type="text" value="" placeholder="Field name" style="height:30px;margin-bottom:0">
              </div>
              <div class="col s1">
                <i class="material-icons right delete" style="cursor:pointer">delete_forever</i>
              </div>
            `);
            draggedEl.find('.delete').click(function() {
              draggedEl.remove();
            })
          }
        }
      });
      jQuery( ".draggable" ).draggable({
        connectToSortable: sortableId,
        helper: "clone",
        revert: "invalid"
      });
      jQuery( "ul, li" ).disableSelection();
    }, 0);
  }

  getKeys() {
    if(this.data) return Object.keys(this.data['form']);
    else return [];
  }

  saveCollection() {
    var collectionName = this.name;
    if(!collectionName) return;
    var schema = {};
    var form = {};
    jQuery('.collection-field').each(function(index, item) {
      var name = jQuery(item).find('input').val();
      var type = jQuery(item).data('type');
      var inputType = jQuery(item).data('input');
      if(name) {
        schema[name] = type;
        form[name] = inputType;
      }
    });
    ApiService.createCollection({name: collectionName, mainField: this.mainField, blueprint: schema, form: form}).then(data => {
      ApiService.collectionEmitter.emit(data);
      setTimeout(() => this.router.navigate(['List', { name: collectionName }]), 0);
    });
  }

  updateCollection() {
    console.log('tbd')
  }
}
