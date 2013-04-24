var exports = module.exports = TestSchema = new Schema({});

TestSchema.add({
  name: {type: String, default: '', required: true, index:true}
});

exports = module.exports = mongoose.model('Test', TestSchema);