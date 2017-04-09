import React, { Component } from 'react'
import { bytesToSize } from '../../utils'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'
import * as addProductFormActions from '../../store/actions/addProductFormActions'
import { addProductionFormValidation, submitValidation } from './addProductionFormValidation'

const initialState = {
  department: localStorage.getItem('addProductForm-department') || '',
  category: localStorage.getItem('addProductForm-category') || '',
  type: localStorage.getItem('addProductForm-type') || '',
  stock: localStorage.getItem('addProductForm-stock') || true,
  numberOfStock: localStorage.getItem('addProductForm-numberOfStock') || '',
  desc: localStorage.getItem('addProductForm-desc') || '',
  name: localStorage.getItem('addProductForm-name') || '',
  brand: localStorage.getItem('addProductForm-brand') || '',
  price: localStorage.getItem('addProductForm-price') || '',
  salePrice: localStorage.getItem('addProductForm-salePrice') || '',
  listDesc: JSON.parse(localStorage.getItem('addProductForm-listDesc')) || [],
  onSale: localStorage.getItem('addProductForm-onSale') || false,
  size: localStorage.getItem('addProductForm-size') || '',
  images: [],
  soldBy: localStorage.getItem('addProductForm-soldBy') || '',
  errors: {},
}

const clearState = {
  department: '',
  category: '',
  type: '',
  stock: true,
  numberOfStock: '',
  desc: '',
  name: '',
  brand: '',
  price: '',
  salePrice: '',
  listDesc: [],
  onSale: false,
  size: '',
  images: [],
  soldBy: '',
  errors: {},
}

class AddProductForm extends Component {
  state = initialState

  componentWillMount() {
    this.setState(initialState)
  }

  // handle clear the form data
  handleClearForm = () => {
    localStorage.removeItem('addProductForm-department')
    localStorage.removeItem('addProductForm-category')
    localStorage.removeItem('addProductForm-type')
    localStorage.removeItem('addProduct-stock')
    localStorage.removeItem('addProductForm-numberOfStock')
    localStorage.removeItem('addProductForm-desc')
    localStorage.removeItem('addProductForm-name')
    localStorage.removeItem('addProductForm-brand')
    localStorage.removeItem('addProductForm-price')
    localStorage.removeItem('addProductForm-salePrice')
    localStorage.removeItem('addProductForm-listDesc')
    localStorage.removeItem('addProductForm-onSale')
    localStorage.removeItem('addProductForm-size')
    localStorage.removeItem('addProductForm-images')
    localStorage.removeItem('addProductForm-soldBy')
    this.setState(clearState)
  }

  // get all name and value method
  getFormNameAndValue = (listDesc, images) => ({
    [document.querySelector('#name').name]: document.querySelector('#name').value,
    [document.querySelector('#category').name]: document.querySelector('#category').value,
    [document.querySelector('#type').name]: document.querySelector('#type').value,
    [document.querySelector('#stock').name]: document.querySelector('#stock').value,
    [document.querySelector('#numberOfStock').name]: document.querySelector('#numberOfStock').value,
    [document.querySelector('#desc').name]: document.querySelector('#desc').value,
    [document.querySelector('#name').name]: document.querySelector('#name').value,
    [document.querySelector('#brand').name]: document.querySelector('#brand').value,
    [document.querySelector('#salePrice').name]: document.querySelector('#salePrice').value,
    listDesc: listDesc || this.state.listDesc,
    [document.querySelector('#onSale').name]: document.querySelector('#onSale').value,
    [document.querySelector('#size').name]: document.querySelector('#size').value,
    [document.querySelector('#images').name]: images || this.state.images,
    [document.querySelector('#soldBy').name]: document.querySelector('#soldBy').value,
  })

  // validating form value for disable the upload btn or Note
  validatingFormValueDisableUploadButton = (listDesc, images) => {
    const { isValid, errors } = submitValidation(this.getFormNameAndValue(listDesc, images))
    if(!isValid) {
      document.querySelector('#AddProductForm-upload-btn').disabled = true
      this.setState({ errors })
    } else {
      document.querySelector('#AddProductForm-upload-btn').disabled = false
    }
  }

  /*
   *  remove the dynamically added input field (listDesc)
   */
   handelListDescRemove = (e, index) => {
      const newListDesc = this.state.listDesc.filter((s, ldi) => index !== ldi)
      this.setState({
        listDesc: newListDesc
      })
      this.validatingFormValueDisableUploadButton(newListDesc)
      localStorage.setItem('addProductForm-listDesc', JSON.stringify(newListDesc))
   }


   handleListDescError = e => {
     if(e.target.id === 'listDesc') {
       if(this.state.errors.listDesc === 'At least 2 Brief Description' && this.state.listDesc.length >= 2) {
         let copy = Object.assign({}, this.state.errors)
         delete copy.listDesc
         this.setState({ errors: copy })
       }
       if(this.state.errors.listDesc === 'required' && this.state.listDesc.length !== 0) {
         let copy = Object.assign({}, this.state.errors)
         delete copy.listDesc
         this.setState({ errors: copy })
       }
     }
   }

  /*
   * change the value in the dynamically added input field (listDesc)
   */
  handleListDescChange = (e, index) => {
    const newListDesc = this.state.listDesc.map((l, ldi) => {
      if (ldi !== index) return l
      return { ...l, name: e.target.value }
    })
    addProductionFormValidation(e)
    this.handleListDescError(e)
    this.setState({ listDesc: newListDesc })
    this.validatingFormValueDisableUploadButton(newListDesc)
    localStorage.setItem('addProductForm-listDesc', JSON.stringify(newListDesc))
  }

  /*
   * increase the listDesc length in order to dynamically map the input field to the dom
   */
  handleAddBriefDescription = () => {
    this.validatingFormValueDisableUploadButton(this.state.listDesc.concat({ name: '' }))
    if(this.state.listDesc.length < 9) {
      this.setState({ listDesc: this.state.listDesc.concat({ name: '' }) })
    }
  }

  // handle onBlue event
  handleOnBlur = (e) => {
    this.validatingFormValueDisableUploadButton()
    addProductionFormValidation(e)
    this.handleListDescError(e)
  }

  /*
   * set value of the select element to localStorage and reset the state
   */
  handleSelect = e => {
    addProductionFormValidation(e)
    this.validatingFormValueDisableUploadButton()
    if(e.target.name === 'department') {
      this.setState({ 'category': '' })
      this.setState({ 'type': '' })
    }
    if(e.target.name === 'category') this.setState({ 'type': '' })
    localStorage.setItem(`addProductForm-${e.target.name}`, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  /*
   * set value of the select element to localStorage and reset the state
   */
  handleChange = (e) => {
    addProductionFormValidation(e)
    this.validatingFormValueDisableUploadButton()
    localStorage.setItem(`addProductForm-${e.target.name}`, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  /*
   *  Assign: turn the files object into array, and set to the state
   *  Explain: handle the onchange event in the <input type='file'/>
   */
  handleFileSelect = evt => {
    if(evt.target.files.length !== 0) {
      let copy = Object.assign({}, this.state.errors)
      delete copy.images
      this.setState({ errors: copy })
    }

    addProductionFormValidation(evt)
    // get the files(FileList) object from the Dom's <input type='file'/> element
    let filelist = evt.target.files

    let images = []
    // loop through each file object inside the FileList object into the images array
    for(let i = 0; i < filelist.length; i++) {
      images.push(filelist[i])
    }
    this.validatingFormValueDisableUploadButton(undefined, images)
    // concat the coming object and seset the state
    this.setState({ images: this.state.images.concat(images) })
  }

  /*
   * filter out the particular id out of the state.images Array
   */
  handleRemoveImage = (index) => {
    this.setState({ images: this.state.images.filter((img, i) => i !== index) })
    this.validatingFormValueDisableUploadButton(undefined, this.state.images.filter((img, i) => i !== index))
  }

  /*
   * submit
   */
  handleUploadProduct = (e) => {
    e.preventDefault()

    const { isValid, errors } = submitValidation(this.state)
    if(!isValid) {
      document.querySelector('#AddProductForm-upload-btn').disabled = true
      this.setState({ errors })
      return false
    }

    // Learning Note: inorder to make NPM package multer wokring at server side,
    // this step has to perform, append each file objec to the new FormData
    let data = new FormData()
    this.state.images.forEach((e, i) => {
      data.append(`image-${i}`, e)
    })
    // Learning Note: append key and,
    // value to the new FormData to post File object and form text to server
    data.append('department', this.state.department)
    data.append('category', this.state.category)
    data.append('type', this.state.type)
    data.append('stock', this.state.stock)
    data.append('numberOfStock', this.state.numberOfStock)
    data.append('desc', this.state.desc)
    data.append('name', this.state.name)
    data.append('brand', this.state.brand)
    data.append('price', this.state.price)
    data.append('salePrice', this.state.salePrice)
    data.append('listDesc', JSON.stringify(this.state.listDesc))
    data.append('onSale', this.state.onSale)
    data.append('size', this.state.size)
    data.append('soldBy', this.state.soldBy)

    // api request through Epic
    this.props.addProductRequest(data)

    // clear the form after submit
    this.handleClearForm()
  }

  /*
   *  render()
   */
  render() {
    // Assign: image preview for the upload images
    // Explain: use the processed array derive from FileList object,
    // to turn each object inside the array to the Dom.
    // Note: window.URL.createObjectURL(files[0]), turn the file object to dataURL for <img src="" alt=""/>
    // Note: usr the "escape(f.name)" method if necessary to change the white space to % sign
    let filesPreviewDiv = this.state.images.map((f, i) => {
      return (<div className='AddProductForm-image-each' key={i}>
                <div className='AddProductForm-image-cancel z-depth-2'>
                <i className="material-icons hover-cursor-pointer"
                  onClick={() => this.handleRemoveImage(i)}>cancel</i>
                </div>
                <img style={{ width: '200px', height: '200px' }} src={window.URL.createObjectURL(f)} alt=""/>
                <div className='AddProductForm-image-text flow-text'>{f.name} ({f.type}) - size: {bytesToSize(f.size)}</div>
              </div>)
    })

    /*
     *  select input const render variable
     */
    // display departments
    const departments = this.props.menu.department.map((d, i) => {
      return <option key={i} value={d.name.name}>{d.name.name}</option>
    })

    // display category
    let category = null

    if(this.state.department) {
      category = this.props.menu.department.map((d, i) => {
        if(d.name.name === this.state.department) {
           return d.children.map((c, i) => {
             return c.name && <option key={i} value={c.name}>{c.name}</option>
           })
        }
        return false
      })
    }
    // display types
    let types = null

    if(this.state.category) {
      types = this.props.menu.category.map((c, i) => {
        if(c.name.name === this.state.category) {
           return c.children.map((t, i) => {
             return c.name && <option key={i} value={t.name}>{t.name}</option>
           })
        }
        return false
      })
    }


    // if(this.state.department) {
    //   selectedDepartment = this.props.menu.department.filter((d, i) =>  d.id === this.state.department)
    //   if(selectedDepartment.length) {
    //     category = selectedDepartment[0].children.map((c, i) => {
    //       if(c.name) {
    //         return <option key={i} value={c.id}>{c.name}</option>
    //       }
    //       return false
    //     })
    //   }
    // }
    // // display types
    // let selectedCategory = null
    // let types = null
    //
    // if(this.state.category) {
    //   selectedCategory = this.props.menu.category.filter((c, i) => c.id === this.state.category)
    //   if(selectedCategory.length) {
    //     types = selectedCategory[0].children.map((t, i) => {
    //       if(t.name) {
    //         return <option key={i} value={t.id}>{t.name}</option>
    //       }
    //       return false
    //     })
    //   }
    // } // end of select input group

    /*
     *  dynamically add input field to the dom
     */
    let listDescInputField = null
    if(this.state.listDesc.length)
      listDescInputField = this.state.listDesc.map((l, i) => {
        return (<div className='addProductForm-listDesc-each' key={i}>
                  <input
                    id='listDesc'
                    name={`listDesc${i}`}
                    type="text"
                    value={l.name}
                    onChange={e => this.handleListDescChange(e, i)}
                    className="validate"
                    onBlur={this.handleOnBlur}
                   />
                  <div className='addProductForm-listDesc-cancel'>
                    <i className="material-icons hover-cursor-pointer z-depth-2"
                      onClick={(e) => this.handelListDescRemove(e, i)}>cancel</i>
                  </div>
                  <span className='red-text wrong addProductForm-invalid-span'>{this.state.errors[`listDesc${i}`]}</span>
                </div>)
      })

    /*
     *  return
     */
    return (
      <div className='AddProductForm-container container'>
        <div className="row">
          <div className="col s12">

            {/* row */}
            <div className="row">
              <div className="input-field col s6">
                <label className='active'
                  htmlFor="name">Product name</label>
                <input
                  placeholder="Product name"
                  id="name"
                  name='name'
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  onBlur={this.handleOnBlur}
                  required
                  />
                <span className='red-text wrong addProductForm-invalid-span'>{this.state.errors.name}</span>

              </div>

              <div className="input-field col s6">
                <label
                  className='active'
                  htmlFor="brand">Brand name</label>
                <input
                  placeholder="Brand name"
                  id="brand"
                  name='brand'
                  type="text"
                  value={this.state.brand}
                  onChange={this.handleChange}
                  onBlur={this.handleOnBlur}
                  required
                  />
                <span className='red-text wrong addProductForm-invalid-span'>{this.state.errors.brand}</span>
              </div>
            </div>

            {/* row Long Description*/}
            <div className="row">
              <div className="input-field col s12">
                <label className='active'
                  htmlFor="desc">Long Description</label>
                <textarea
                  id="desc"
                  name='desc'
                  value={this.state.desc}
                  onChange={this.handleChange}
                  onBlur={this.handleOnBlur}
                  className='materialize-textarea'
                  required
                ></textarea>
              <span className='red-text wrong addProductForm-invalid-span'>{this.state.errors.desc}</span>
              </div>
            </div>

            {/* row List of Description */}
            <div className="row">
              <div className='col'>
                <label htmlFor="">Brief of Description</label><br/>
                <button className='waves-effect waves-light btn' onClick={this.handleAddBriefDescription}>Add Description</button>
                <span className='red-text wrong addProductForm-listDesc-invalid-span'>{this.state.errors.listDesc}</span>
                <div className='addProductForm-listDesc-group'>
                  {listDescInputField}
                </div>
              </div>
            </div>

            <div className='divider'></div><br/>

            {/* row Price */}
            <div className="row">
              <div className="input-field col s4">
                <label className='active' htmlFor="price">Price</label>
                <input
                  placeholder="Price"
                  id="price"
                  name='price'
                  value={this.state.price}
                  onChange={this.handleChange}
                  onBlur={this.handleOnBlur}
                  required
                  type='number'
                />
              <span className='red-text wrong addProductForm-invalid-span'>{this.state.errors.price}</span>
              </div>

              <div className="col s4">
                <label>On Sale</label>
                <select className="browser-default" id='onSale' name='onSale' value={this.state.onSale} onChange={this.handleChange}>\
                  <option disabled>Choose your option</option>
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </div>

              <div className="input-field col s4">
                <label className='active' htmlFor="salePrice">Sale Price</label>
                <input
                  placeholder="Sale Price"
                  id="salePrice"
                  name='salePrice'
                  value={this.state.salePrice}
                  onChange={this.handleChange}
                  type='number'
                />
              <span className='red-text wrong addProductForm-invalid-span'>{this.state.errors.salePrice}</span>
              </div>

            </div>

            {/* row Size */}
            <div className="row">
              <div className="input-field col s4">
                <label className='active' htmlFor="size">Size</label>
                <input
                  placeholder="Size"
                  id="size"
                  name='size'
                  type="text"
                  value={this.state.size}
                  onChange={this.handleChange}
                  onBlur={this.handleOnBlur}
                />
              <span className='red-text wrong addProductForm-invalid-span'>{this.state.errors.size}</span>
              </div>

              <div className="col s4">
                <label>In stock</label>
                <select className='browser-default'  id='stock' name='stock' value={this.state.stock} onChange={this.handleChange}>
                  <option value="" disabled>Choose your option</option>
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </select>
              </div>

              <div className="input-field col s4">
                <label className='active' htmlFor="numberOfStock">Number of Stock</label>
                <input
                  placeholder="Number of Stock"
                  id="numberOfStock"
                  name='numberOfStock'
                  value={this.state.numberOfStock}
                  onChange={this.handleChange}
                  type='number'
                />
              <span className='red-text wrong addProductForm-invalid-span'>{this.state.errors.numberOfStock}</span>
              </div>
            </div>

            {/* row Sold By */}
            <div className="row">
              <div className="input-field col s4">
                <label className='active' htmlFor="soldBy">Sold By</label>
                <input
                  placeholder="Sold By"
                  id="soldBy"
                  name='soldBy'
                  type="text"
                  value={this.state.soldBy}
                  onChange={this.handleChange}
                  onBlur={this.handleOnBlur}
                  required
                />
              <span className='red-text wrong addProductForm-invalid-span'>{this.state.errors.soldBy}</span>
              </div>
            </div>{/* end of input fields */}

            {/* row */}
            {/* department selector */}
            <div className="row">
              <div className="col s4">
                <label>Department</label>
                <select
                  className='browser-default'
                  id='department'
                  value={this.state.department}
                  name='department'
                  onChange={this.handleSelect}
                  onBlur={this.handleOnBlur}
                >
                  <option value="" disabled>Choose your option</option>
                  {departments}
                </select>
                <span className='red-text invalid-span'>{this.state.errors.department}</span>
              </div>

              <div className="col s4">
                <label>Category</label>
                <select required
                  className='browser-default'
                  id='category'
                  value={this.state.category}
                  name='category'
                  onChange={this.handleSelect}
                  onBlur={this.handleOnBlur}
                >
                  <option value="" disabled>Choose your option</option>
                  {category}
                </select>
                <span className='red-text invalid-span '>{this.state.errors.category}</span>
              </div>

              <div className="col s4">
                <label>Product Type</label>
                <select required
                  className='browser-default'
                  id='type'
                  value={this.state.type}
                  name='type'
                  onChange={this.handleSelect}
                  onBlur={this.handleOnBlur}
                >
                  <option value="" disabled>Choose your option</option>
                  {types}
                </select>
                <span className='red-text invalid-span'>{this.state.errors.type}</span>
              </div>
            </div>
            {/* end of department selector */}

            {/* upload image
                #1 display:none is for the input element. it's for the hide the default file chooseing text
                #2 use label to replace the look of the input element
            */}
             <div className='row'>
               <div className='col s6 m6'>
                <label htmlFor="images" className='file-field input-field btn'>Upload images <div className='red-text' style={{ textTransform: 'capitalize' }}>{this.state.errors.images}</div></label>
                <input
                  style={{ display:'none'}}
                  id='images'
                  name='images'
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={this.handleFileSelect}
                />

              </div>
            </div>

            <div className='row'>
              <div className='col'>
                <div className='AddProductForm-image-preview'>
                  {filesPreviewDiv}
                </div>{/* end of upload image */}
              </div>
            </div>

            <div className='row'>
              <div className='col s6 m6 left'>
                <button className='waves-effect waves-light btn' onClick={this.handleClearForm}>Clear</button>
              </div>
              <div className='col s6 m6'>
                <button id='AddProductForm-upload-btn' className='waves-effect waves-light btn right' onClick={this.handleUploadProduct}>Upload product</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }

}

const mapStateToProps = state => ({
  product: state.product,
  addProductForm: state.addProductForm,
  menu: state.menu
})

const mapDispatchToProps = dispatch => ({
  addProductRequest: payload => dispatch(productActions.addProductRequest(payload)),
  setDataToProductDataFormReducer: payload => dispatch(addProductFormActions.setDataToProductDataFormReducer(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm)

/*
 *  Usage: place it inside the render() function
 *  event fires before page reload, but since we set localStorage in the onchange event. so this is an alternative implementation.
 */
// window.onbeforeunload = () => {
//   localStorage.setItem('addProductForm-department', this.state.department)
//   localStorage.setItem('addProductForm-category', this.state.category)
//   localStorage.setItem('addProductForm-type', this.state.type)
//   localStorage.setItem('addProductForm-stock', this.state.stock)
//   localStorage.setItem('addProductForm-numberOfStock', this.state.numberOfStock)
//   localStorage.setItem('addProductForm-desc', this.state.desc)
//   localStorage.setItem('addProductForm-name', this.state.name)
//   localStorage.setItem('addProductForm-brand', this.state.brand)
//   localStorage.setItem('addProductForm-price', this.state.price)
//   localStorage.setItem('addProductForm-salePrice', this.state.salePrice)
//   localStorage.setItem('addProductForm-listDesc', this.state.listDesc)
//   localStorage.setItem('addProductForm-onSale', this.state.onSale)
//   localStorage.setItem('addProductForm-size', this.state.size)
//   localStorage.setItem('addProductForm-soldBy', this.state.soldBy)
// }
