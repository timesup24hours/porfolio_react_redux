"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getProductsAndQuantitiesFromCartArray = exports.getProductsAndQuantitiesFromCartArray = function getProductsAndQuantitiesFromCartArray(ary) {
  var store = ary.reduce(function (sum, current) {
    sum[current] = sum[current] + 1 || 1;
    return sum;
  }, {});
  var products = [];
  for (var k in store) {
    products.push({ _id: k, quantity: store[k] });
  }
  return products;
};