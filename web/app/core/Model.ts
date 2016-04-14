export class Model {

  private _id: String;

  static autoIncrementValue = 1;

  constructor() {
    this._id = 'temp_'+Model.autoIncrementValue;
    Model.autoIncrementValue += 1;
  };

  save()  {
    var toSave = JSON.stringify(this, (key, value) => {
      if(key=="_id" && value.startsWith("temp_")) return undefined;
      if(key && typeof value === "object" && value._id) {
        return value._id;
      }
      return value;
    })
    console.log(toSave);
  }

}
