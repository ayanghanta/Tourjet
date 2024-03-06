class APIFeatures {
  constructor(orgQueryObj, query) {
    this.orgQueryObj = orgQueryObj;
    this.query = query;
  }

  filtering() {
    const queryObj = { ...this.orgQueryObj };
    const excludeFileds = ['sort', 'fields', 'page', 'limit'];
    excludeFileds.forEach((el) => delete queryObj[el]);

    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|lte|lt|gt)\b/g,
      (match) => `$${match}`
    );
    // console.log(JSON.parse(queryStr));
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.orgQueryObj.sort) {
      const sortBy = this.orgQueryObj.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else this.query = this.query.sort('-ratingQuantity');

    return this;
  }

  limiting() {
    if (this.orgQueryObj.fields) {
      const limitingFields = this.orgQueryObj.fields.split(',').join(' ');
      this.query = this.query.select(limitingFields);
    } else this.query = this.query.select('-__v');

    return this;
  }

  paginate() {
    const page = this.orgQueryObj.page || 1;
    const limit = this.orgQueryObj.limit || 10;

    this.query = this.query.skip((page - 1) * limit).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
