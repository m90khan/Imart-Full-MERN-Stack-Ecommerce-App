// model is the model => camp, course . populate options. requestQuery = req.query
const apiFeatures = (model, populateOptions, requestQuery) => async (req, res, next) => {
  let query;
  const reqQuery = { ...requestQuery };
  //exclude fields
  const excludeFields = ['page', 'sort', 'limit', 'fields'];

  excludeFields.forEach((field) => delete reqQuery[field]);
  // create operators lt gt gte in ggt  => $
  let queryString = JSON.stringify(reqQuery);
  queryString = queryString.replace(/\b(gte|gt|lte|lt|in)\b/g, (match) => `$${match}`);
  // console.log(reqQuery);

  query = model.find(JSON.parse(queryString));

  // Select limited fields
  if (requestQuery.fields) {
    const fields = requestQuery.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }
  //sort
  if (requestQuery.sort) {
    const sortBy = requestQuery.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }
  // pagination
  const page = requestQuery.page * 1 || 1;
  const limit = requestQuery.limit * 1 || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);

  if (populateOptions) {
    query.populate(populateOptions);
  }

  //execute query
  const results = await query;

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1, // current page +1 => next page
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1, // current page -1 => prev page
      limit,
    };
  }

  if (!results) next(new AppError(`No Results found`, 404));

  let searchResults = {
    status: 'success',
    length: results.length,
    pagination,
    data: results,
  };
  return searchResults;
  //   return res.apiFeatures;
};

export default apiFeatures;

// let query;
// const reqQuery = { ...req.query };
// //exclude fields
// const excludeFields = ['page', 'sort', 'limit', 'fields'];

// excludeFields.forEach((field) => delete reqQuery[field]);
// // create operators lt gt gte in ggt  => $
// let queryString = JSON.stringify(reqQuery);
// queryString = queryString.replace(/\b(gte|gt|lte|lt|in)\b/g, (match) => `$${match}`);
// // console.log(reqQuery);

// query = Camp.find(JSON.parse(queryString));

// // Select limited fields
// if (req.query.fields) {
//   const fields = req.query.fields.split(',').join(' ');
//   query = query.select(fields);
// } else {
//   query = query.select('-__v');
// }
// //sort
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(',').join(' ');
//   query = query.sort(sortBy);
// } else {
//   query = query.sort('-createdAt');
// }
// // pagination
// const page = req.query.page * 1 || 1;
// const limit = req.query.limit * 1 || 25;
// const startIndex = (page - 1) * limit;
// const endIndex = page * limit;
// const total = await Camp.countDocuments();
// query = query.skip(startIndex).limit(limit);

// //execute query
// const bootCamps = await query.populate('courses');

// const pagination = {};
// if (endIndex < total) {
//   pagination.next = {
//     page: page + 1, // current page +1 => next page
//     limit,
//   };
// }
// if (startIndex > 0) {
//   pagination.prev = {
//     page: page - 1, // current page -1 => prev page
//     limit,
//   };
// }
// if (!bootCamps) next(new AppError(`No Bootcamps found`, 404));
