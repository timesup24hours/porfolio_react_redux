// import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
// var Cleave = require('cleave.js');
require('cleave.js/dist/addons/cleave-phone.us');

export const addProductionFormValidation = e => {
  if(e.target.name === 'name') {
    if(e.target.name === 'name' && e.target.hasAttribute('required') && e.target.value === '') {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = 'required'
    } else if(e.target.name === 'name' && e.target.value.length < 6 && e.target.value.length >= 1) {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `too short (${e.target.value.length}/6)`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }

  if(e.target.name === 'brand') {
    if(e.target.name === 'brand' && e.target.hasAttribute('required') && e.target.value.length === 0) {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = 'required'
    } else if(e.target.name === 'brand' && e.target.value.length < 6 && e.target.value.length >= 1) {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `too short (${e.target.value.length}/6)`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }

  if(e.target.name === 'desc') {
    if(e.target.hasAttribute('required') && e.target.value.length === 0) {
      e.target.classList.add('invalid')
      e.target.parentElement.lastChild.textContent = 'required'
    } else if(e.target.value.length < 6 && e.target.value.length >= 1) {
      e.target.classList.add('invalid')
      e.target.parentElement.lastChild.textContent = `too short (${e.target.value.length}/6)`
      e.target.parentElement.firstChild.textContent = 'Long Description'
    } else if(e.target.value.length > 300 && e.target.value.length >= 1) {
      e.target.classList.add('invalid')
      e.target.parentElement.lastChild.textContent = `too long (${e.target.value.length}/300)`
      e.target.parentElement.firstChild.textContent = 'Long Description'
    } else if(e.target.value.length <= 300 && e.target.value.length >= 1) {
      e.target.classList.remove('invalid')
      e.target.parentElement.lastChild.textContent = ''
      e.target.parentElement.firstChild.textContent = `Long Description (${e.target.value.length}/300)`
    } else {
      e.target.classList.remove('invalid')
      e.target.parentElement.lastChild.textContent = ''
    }
  }

  if(e.target.name === 'price') {
    if(e.target.hasAttribute('required') && e.target.value.length === 0) {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = 'required'
    } else if(!Number.isInteger(parseInt(e.target.value, 10))) {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `invalid value`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }

  if(e.target.name === 'salePrice') {
    if(!Number.isInteger(parseInt(e.target.value, 10))) {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `invalid value`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }

  if(e.target.name === 'size') {
    if(e.target.value.length > 50 && e.target.value.length >= 1) {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `too long (${e.target.value.length}/50)`
      e.target.previousSibling.textContent = 'Size'
    } else if(e.target.value.length <= 50 && e.target.value.length >= 1) {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
      e.target.previousSibling.textContent = `Size (${e.target.value.length}/50)`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }

  if(e.target.name === 'numberOfStock') {
    if(!Number.isInteger(parseInt(e.target.value, 10))) {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `invalid value`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }


  if(e.target.name === 'soldBy') {
    if(e.target.hasAttribute('required') && e.target.value === '') {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = 'required'
    } else if(e.target.value.length > 30 && e.target.value.length >= 1) {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `too long (${e.target.value.length}/30)`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }

  if(e.target.name === 'department') {
    if(e.target.value === '') {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `required`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }

  if(e.target.name === 'category') {
    if(e.target.value === '') {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `required`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }

  if(e.target.name === 'type') {
    if(e.target.value === '') {
      e.target.classList.add('invalid')
      e.target.nextSibling.textContent = `required`
    } else {
      e.target.classList.remove('invalid')
      e.target.nextSibling.textContent = ''
    }
  }

  // if(e.target.name === 'images') {
    // e.target.nextSibling.textContent = ''
  // }


  // // if(!data.desc) errors.desc = 'Long Description is required'
  // if(data.desc  && data.desc.length < 10) {
  //   errors.desc = `Long Description is too short (${data.desc.length}/10)`
  // }
  // if(data.desc  && data.desc.length > 200) {
  //   errors.desc = `Long Description is too long (${data.desc.length}/200)`
  // }

  // if(data.cellphone && !data.cellphone.match(/^\d{3}-\d{3}-\d{4}$/g)) {
  //   errors.cellphone = 'invalid! ex: 555-555-5555'
  // }
  //
  // if(data.homephone && !data.homephone.match(/^\d{3}-\d{3}-\d{4}$/g)) {
  //   errors.homephone = 'invalid! ex: 555-555-5555'
  // }
  //
  // if(data.workphone && !data.workphone.match(/^\d{3}-\d{3}-\d{4}$/g)) {
  //   errors.workphone = 'invalid! ex: 555-555-5555'
  // }
}


// export const initialValidate = () => {
//   new Cleave('.ProfileForm-cellphone', {
//     delimiter: '-',
//     blocks: [3, 3, 4],
//     // phone: true,
//     phoneRegionCode: 'us',
//   });
//   new Cleave('.ProfileForm-homephone', {
//     delimiter: '-',
//     blocks: [3, 3, 4],
//     // phone: true,
//     phoneRegionCode: 'us',
//   });
//   new Cleave('.ProfileForm-workphone', {
//     delimiter: '-',
//     blocks: [3, 3, 4],
//     // phone: true,
//     phoneRegionCode: 'us',
//   });
//   new Cleave('.ProfileForm-zipcode', {
//     blocks: [5],
//   });
// }

export const submitValidation = data => {
  let errors = {}
  if(data.name === '') {
    errors.name = 'required'
  } else if(data.name.length < 6 && data.name.length >= 1) {
    errors.name =  `too short (${data.name.length}/6)`
  }

  if(data.brand.length === 0) {
    errors.brand = 'required'
  } else if(data.brand.length < 6 && data.brand.length >= 1) {
    errors.brand = `too short (${data.brand.length}/6)`
  }

  if(data.desc.length === 0) {
    errors.desc = 'required'
  } else if(data.desc.length < 6 && data.desc.length >= 1) {
    errors.desc = `too short (${data.desc.length}/6)`
  } else if(data.desc.length > 300 && data.desc.length >= 1) {
    errors.desc = `too long (${data.desc.length}/300)`
  }

  if(data.listDesc.length === 0) {
    errors.listDesc = 'required'
  } else if(data.listDesc.length < 2 && data.listDesc.length >= 1) {
    errors.listDesc = 'At least 2 Brief Description'
  }

  if(data.price.length === 0) {
    errors.price = 'required'
  } else if(data.price.length && !Number.isInteger(parseInt(data.price, 10))) {
    errors.price = 'invalid value'
  }

  if(data.salePrice.length && !Number.isInteger(parseInt(data.salePrice, 10))) {
    errors.salePrice = 'invalid value'
  }

  if(data.size.length > 50 && data.size.length >= 1) {
    errors.size = `too long (${data.size.length}/50)`
  }

  if(data.numberOfStock.length && !Number.isInteger(parseInt(data.numberOfStock, 10))) {
    errors.numberOfStock = 'invalid value'
  }


  if(data.soldBy === '') {
    errors.soldBy = 'required'
  } else if(data.soldBy.length > 30 && data.soldBy.length >= 1) {
    errors.soldBy = `too long (${data.soldBy.length}/30)`
  }

  if(data.department === '') {
    errors.department = 'required'
  }

  if(data.category === '') {
    errors.category = 'required'
  }

  if(data.type === '') {
    errors.type = 'required'
  }

  if(data.images.length === 0) {
    errors.images = 'image is required'
  }

  return {
    errors: errors,
    isValid: isEmpty(errors),
  }
}
