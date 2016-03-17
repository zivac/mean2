import {Component} from 'angular2/core';
import {CollectionService} from '../services/collection.service';
declare var jQuery:any;

@Component({
    selector: 'my-schema',
    templateUrl: 'app/schema/schema.component.html',
    styleUrls: ['app/schema/schema.component.css'],
    providers: [CollectionService]
})
export class SchemaComponent {

  public name:string;

  ngOnInit() {
    jQuery( "#sortable" ).sortable({
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
      connectToSortable: "#sortable",
      helper: "clone",
      revert: "invalid"
    });
    jQuery( "ul, li" ).disableSelection();
  }

  saveCollection() {
    var collectionName = this.name;
    if(!collectionName) return;
    var schema = {};
    jQuery('.collection-field').each(function(index, item) {
      var name = jQuery(item).find('input').val();
      var type = jQuery(item).data('type');
      if(name) schema[name] = type;
    });
    console.log(schema);
  }
}
