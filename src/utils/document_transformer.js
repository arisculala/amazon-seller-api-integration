class DocumentTransformer {
  static transformDocumentToObject(mongooseDoc) {
    const jsObj = mongooseDoc.toObject();
    const { _id, __v, ...rest } = jsObj;
    const newObj = { id: _id, ...rest };
    delete newObj._id;
    delete newObj.__v;
    return newObj;
  }
}

module.exports = DocumentTransformer;
