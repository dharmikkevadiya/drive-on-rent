class MongooseServices {
  constructor(model) {
    this.model = model;
  }

  create(body) {
    return this.model.create(body);
  }

  //get
  getAll(obj) {
    return this.model.find({}).select(obj);
  }

  getOneByField(field, obj) {
    return this.model.findOne(field).select(obj);
  }

  getAllByField(field, obj) {
    return this.model.find(field).select(obj);
  }

  getAllByFieldAndSort(field, obj, sortObj) {
    return this.model.find(field).select(obj).sort(sortObj);
  }

  getAllByfieldAndPopulate(field, obj, populateCollection, populateObj) {
    return this.model
      .find(field)
      .populate(populateCollection, populateObj)
      .select(obj);
  }
  getOneByfieldAndPopulate(field, obj, populateCollection, populateObj) {
    return this.model
      .findOne(field)
      .populate(populateCollection, populateObj)
      .select(obj);
  }

  //update
  patchOneByField(field, body, obj, options = { new: true }) {
    return this.model.findOneAndUpdate(field, body, options).select(obj).exec();
  }

  //delete
  deleteOneByField(field) {
    return this.model.findOneAndRemove(field).exec();
  }
  deleteManyByField(field) {
    return this.model.deleteMany(field).exec();
  }
}

module.exports = MongooseServices;
