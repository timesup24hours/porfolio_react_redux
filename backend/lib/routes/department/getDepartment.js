'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _models = require('../../db/models');

var _util = require('../../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {

  app.get('/api/department/:id', (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var department;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              department = null;
              _context.next = 3;
              return _models.Department.find({ type: req.params.id });

            case 3:
              department = _context.sent;

              if (!(department === null)) {
                _context.next = 7;
                break;
              }

              res.status(400).json({ success: false, error: 'no this \'' + req.params.id + '\' type was found' });
              return _context.abrupt('return');

            case 7:

              res.status(200).json({ success: true, department: department });

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()));

  app.get('/api/department', (0, _util.asyncRequest)(function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      var department;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              department = null;
              _context2.next = 3;
              return _models.Department.find();

            case 3:
              department = _context2.sent;


              res.status(200).json({ success: true, department: department });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }()));

  app.get('/api/menu', (0, _util.asyncRequest)(function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, next) {
      var menu;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              menu = null;
              _context3.next = 3;
              return _models.Department.aggregate([
              // {
              //   $unwind:  {
              //               path: '$department',
              //               // includeArrayIndex: <string>,
              //               preserveNullAndEmptyArrays: true,
              //             },
              // },
              {
                $lookup: {
                  from: "categories",
                  localField: "categoryId",
                  foreignField: "_id",
                  as: "category"
                }
              }, {
                // $unwind: '$category'
                $unwind: {
                  path: '$category',
                  // includeArrayIndex: <string>,
                  preserveNullAndEmptyArrays: true
                }
              }, {
                $lookup: {
                  from: "subcategories",
                  localField: "category.subCategoryId",
                  foreignField: "_id",
                  as: "category.subcategory"
                }
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
              }, {
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
              }]);

            case 3:
              menu = _context3.sent;


              res.status(200).json({ success: true, menu: menu });

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }()));

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

};