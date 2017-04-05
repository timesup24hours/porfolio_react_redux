'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../../db/models');

var _config = require('../../../config');

var _util = require('../../util');

var _schemaInspector = require('schema-inspector');

var _schemaInspector2 = _interopRequireDefault(_schemaInspector);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidV4 = require('uuid/v4');

var storage = _multer2.default.diskStorage({
  // destination: 'public/uploads/images',
  // destination: '../frontend/build/images/products',
  destination: process.env.NODE_ENV === 'production' ? '../frontend/build/images/products' : '../frontend/public/images/products',
  filename: function filename(req, file, cb) {
    cb(null, Math.random() + '-' + new Date() + '-' + file.originalname); // file name should be unique
    // cb(null, `${file.originalname}`) // test only
  }
});

var upload = (0, _multer2.default)({ storage: storage });

exports.default = function (app) {

  app.post('/api/addProduct', _passport2.default.authenticate('local-jwt'), upload.any(), (0, _util.asyncRequest)(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, next) {
      var validatedBody, images, product;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(req.files && req.files.length === 0)) {
                _context.next = 3;
                break;
              }

              res.status(400).json({ error: 'images if required' });
              return _context.abrupt('return');

            case 3:
              validatedBody = validateAddProductBody(sanitizationProductBody(req.body).data);

              if (validatedBody.valid) {
                _context.next = 7;
                break;
              }

              res.status(400).json({ error: 'invalided data' });
              // res.status(400).json({ error: 'invalided data', error: validatedBody.error })
              return _context.abrupt('return');

            case 7:
              images = [];

              req.files.forEach(function (f) {
                images.push(f.filename);
              });

              product = null;


              product = new _models.Product();

              product.name = req.body.name, product.brand = req.body.brand, product.price = req.body.price, product.salePrice = req.body.salePrice, req.body.listDesc.forEach(function (l, i) {
                product.listDesc.push(l);
              });
              product.department = req.body.department;
              product.type = req.body.type;
              product.desc = req.body.desc;
              product.images = images;
              product.category = req.body.category;
              product.stock = req.body.stock;
              product.numberOfStock = req.body.numberOfStock;
              product.onSale = req.body.onSale;
              product.size = req.body.size;
              product.soldBy = req.body.soldBy;
              _context.next = 24;
              return product.save();

            case 24:

              res.status(201).json({ success: true, product: product });

            case 25:
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
};

var sanitizationProductBody = function sanitizationProductBody(data) {

  var sanitization = {
    type: 'object',
    properties: {
      name: { type: 'string', rules: ['trim', 'title'], optional: false },
      brand: { type: 'string', rules: ['trim', 'title'], optional: false },
      desc: { type: 'string', rules: ['trim'], optional: false },
      listDesc: {
        type: 'array',
        splitWith: ',',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' }
          }
        },
        optional: false
      },
      price: { type: 'number', optional: false },
      salePrice: { type: 'number', optional: true, def: 0 },
      onSale: { type: 'boolean', optional: false },
      stock: { type: 'boolean', optional: true },
      numberOfStock: { type: 'number', optional: true, def: 0 },
      size: { type: 'string', optional: true },
      department: { type: 'string', optional: false },
      category: { type: 'string', optional: false },
      type: { type: 'string', optional: false },
      soldBy: { type: 'string', optional: false }
    }
  };

  // Let's update the data
  return _schemaInspector2.default.sanitize(sanitization, data);
};

var validateAddProductBody = function validateAddProductBody(data) {
  var body = JSON.stringify(data);
  var validation = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        // pattern: /^[0-9a-z_]{1,3}$/,
        optional: false
      },
      brand: {
        type: 'string',
        minLength: 1,
        optional: false
      },
      desc: {
        type: 'string',
        minLength: 2,
        optional: false
      },
      listDesc: {
        type: 'array',
        minLength: 2,
        optional: false
      },
      price: {
        type: 'number',
        gt: 0,
        optional: false
      },
      salePrice: {
        type: 'number',
        optional: true
      },
      onSale: {
        type: 'boolean',
        optional: false
      },
      stock: {
        type: 'boolean',
        optional: true
      },
      numberOfStock: {
        type: 'number',
        optional: true
      },
      size: {
        type: 'string',
        optional: true
      },
      department: {
        type: 'string',
        optional: false
      },
      category: {
        type: 'string',
        optional: false
      },
      type: {
        type: 'string',
        optional: false
      },
      soldBy: {
        type: 'string',
        optional: false
      }

    }
  };

  return _schemaInspector2.default.validate(validation, JSON.parse(body));
};