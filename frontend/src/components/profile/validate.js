import validator from 'validator';
import isEmpty from 'lodash/isEmpty';
var Cleave = require('cleave.js');
require('cleave.js/dist/addons/cleave-phone.us');

export const validate = (data) => {
  let errors = {}
  let valid = {}
  if(data.email && !validator.isEmail(data.email)) {
    errors.email = 'invalid email address'
  } else if(data.email && validator.isEmail(data.email)) {
    valid.email = true
  }

  if(data.cellphone && !data.cellphone.match(/^\d{3}-\d{3}-\d{4}$/g)) {
    errors.cellphone = 'invalid! ex: 555-555-5555'
  } else if(data.cellphone && data.cellphone.match(/^\d{3}-\d{3}-\d{4}$/g)) {
    valid.cellphone = true
  }

  if(data.homephone && !data.homephone.match(/^\d{3}-\d{3}-\d{4}$/g)) {
    errors.homephone = 'invalid! ex: 555-555-5555'
  } else if(data.homephone && data.homephone.match(/^\d{3}-\d{3}-\d{4}$/g)) {
    valid.homephone = true
  }

  if(data.workphone && !data.workphone.match(/^\d{3}-\d{3}-\d{4}$/g)) {
    errors.workphone = 'invalid! ex: 555-555-5555'
  } else if(data.workphone && data.workphone.match(/^\d{3}-\d{3}-\d{4}$/g)) {
    valid.workphone = true
  }

  return {
    errors,
    valid,
    isValid: isEmpty(errors),
  }
}


export const initialValidate = () => {
  new Cleave('.ProfileForm-cellphone', {
    delimiter: '-',
    blocks: [3, 3, 4],
    // phone: true,
    phoneRegionCode: 'us',
  });
  new Cleave('.ProfileForm-homephone', {
    delimiter: '-',
    blocks: [3, 3, 4],
    // phone: true,
    phoneRegionCode: 'us',
  });
  new Cleave('#ProfileForm-workphone', {
    delimiter: '-',
    blocks: [3, 3, 4],
    // phone: true,
    phoneRegionCode: 'us',
  });
  new Cleave('.ProfileForm-zipcode', {
    blocks: [5],
  });
}
