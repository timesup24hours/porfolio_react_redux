import { Department, Category } from '../../db/models'
import { asyncRequest } from '../../util'

export default (app) => {

  app.get('/api/department/:id', asyncRequest(async (req, res, next) => {

    let department = null

    department = await Department.find({ type: req.params.id })

    if (department === null) {
      res.status(400).json({ success: false, error: `no this '${req.params.id}' type was found` })
      return
    }

    res.status(200).json({ success: true, department })
  }))

  app.get('/api/department', asyncRequest(async (req, res, next) => {

    let department = null

    department = await Department.find()

    res.status(200).json({ success: true, department })
  }))

  app.get('/api/menu', asyncRequest(async (req, res, next) => {

    let menu = null

    menu = await Department.aggregate([
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
                          // {
                          //   $project: {
                          //     "category.subCategoryId": 0,
                          //     "category.departmentId": 0,
                          //   }
                          // },
                          {
                            $group: {
                              _id: "$_id",
                              department: { $first: "$name" },
                              category: { $push: "$category" }
                            }
                          },
                          {
                            $project: {
                              _id: 1,
                              department: 1,
                              category: {
                                $filter: {
                                  input: "$category",
                                  as: "a",
                                  cond: { $ifNull: ["$$a._id", false] }
                              } }
                            }
                          }
                      ])

    res.status(200).json({ success: true, menu })
  }))

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


}
