import { Department, Category } from '../db/models'

export const getMenu = () => {
  return Department.aggregate([
                        // {
                        //   $unwind:  {
                        //               path: '$department',
                        //               // includeArrayIndex: <string>,
                        //               preserveNullAndEmptyArrays: true,
                        //             },
                        // },
                        {
                          $lookup:  {
                                      from: "categories",
                                      localField: "categoryId",
                                      foreignField: "_id",
                                      as: "category",
                                    },
                        },
                        {
                          // $unwind: '$category'
                          $unwind:  {
                                      path: '$category',
                                      // includeArrayIndex: <string>,
                                      preserveNullAndEmptyArrays: true,
                                    },
                        },
                        {
                          $lookup:  {
                                      from: "subcategories",
                                      localField: "category.subCategoryId",
                                      foreignField: "_id",
                                      as: "category.subcategory",
                                    },
                        },
                        // { // comment this block out would unfilter these two section in the query
                        //   $project: {
                        //     "category.subCategoryId": 0,
                        //     "category.departmentId": 0,
                        //   }
                        // },
                        {
                          $group: {
                            _id: "$_id",
                            department: { $first: "$name" },
                            to: { $first: "$to" },
                            category: { $push: "$category" }
                          }
                        },
                        {
                          $project: {
                            department: 1,
                            to: 1,
                            category: {
                              $filter: {
                                input: "$category",
                                as: "a",
                                cond: { $ifNull: ["$$a._id", false] }
                            } }
                          }
                        }
                    ])
}


// app.get('/api/menu', asyncRequest(async (req, res, next) => {
//
//   let menu = null
//
//   menu = await Category.aggregate()
//                                 .lookup({
//                                   from: 'departments',
//                                   localField: 'departmentId',
//                                   foreignField: '_id',
//                                   as: 'department_doc',
//                                 })
//                                 .lookup({
//                                   from: 'subcategories',
//                                   localField: 'subCategoryId',
//                                   foreignField: '_id',
//                                   as: 'subCategory_doc',
//                                 })
//                                 .project(
//                                   {
//                                     department: {
//                                       id: '$department_doc._id',
//                                       name: '$department_doc.name',
//                                     },
//                                   }
//                                 );

//   res.status(200).json({ success: true, menu })
// }))
