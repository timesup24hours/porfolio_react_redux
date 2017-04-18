import React, { Component } from 'react'
import { bytesToSize } from '../../utils'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'
import { addProductionFormValidation, submitValidation } from '../upload/addProductionFormValidation'
import * as UIActions from '../../store/actions/UIActions'
import * as actionTypes from '../../store/actions/actionTypes'

class EditProductForm extends Component {
  state = {
    id: this.props.id,
    department: this.props.currentEditProduct.department._id,
    category: this.props.currentEditProduct.category._id,
    subCategory: this.props.currentEditProduct.subCategory._id,
    stock: this.props.currentEditProduct.stock,
    numberOfStock: this.props.currentEditProduct.numberOfStock,
    desc: this.props.currentEditProduct.desc,
    name: this.props.currentEditProduct.name,
    brand: this.props.currentEditProduct.brand,
    price: this.props.currentEditProduct.price,
    salePrice: this.props.currentEditProduct.salePrice,
    listDesc: this.props.currentEditProduct.listDesc,
    onSale: this.props.currentEditProduct.onSale,
    size: this.props.currentEditProduct.size,
    newImages: [],
    images: this.props.currentEditProduct.images,
    soldBy: this.props.currentEditProduct.soldBy,
    errors: {},
  }


  /*
   * delete product
   */
   handleDeleteProduct = () => {
     this.props.handleOpenDialog({
       title: 'Comfirm delete',
       content: 'This product would be deleted permanently',
       action: {
         type: actionTypes.PRODUCT_DELETE_PRODUCT_REQUEST,
         payload: { id: this.state.id },
       },
       trueBtnText: 'Delete',
     })
   }

  /*
   *  remove the dynamically added input field (listDesc)
   */
   handelListDescRemove = (e, index) => {
      const newListDesc = this.state.listDesc.filter((s, ldi) => index !== ldi)
      this.setState({
        listDesc: newListDesc
      })
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
    localStorage.setItem('addProductForm-listDesc', JSON.stringify(newListDesc))
  }

  /*
   * increase the listDesc length in order to dynamically map the input field to the dom
   */
  handleAddBriefDescription = () => {
    if(this.state.listDesc.length < 9) {
      this.setState({ listDesc: this.state.listDesc.concat({ name: '' }) })
    }
  }

  // handle onBlue event
  handleOnBlur = (e) => {
    addProductionFormValidation(e)
    this.handleListDescError(e)
  }

  /*
   * set value of the select element to localStorage and reset the state
   */
  handleSelect = e => {
    addProductionFormValidation(e)
    if(e.target.name === 'department') {
      this.setState({ 'category': '' })
      this.setState({ 'subCategory': '' })
    }
    if(e.target.name === 'category') this.setState({ 'subCategory': '' })
    localStorage.setItem(`addProductForm-${e.target.name}`, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  /*
   * set value of the select element to localStorage and reset the state
   */
  handleChange = (e) => {
    addProductionFormValidation(e)
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
    // concat the coming object and seset the state
    this.setState({ newImages: this.state.newImages.concat(images) })
  }

  /*
   * filter out the particular id out of the state.images Array
   */
  handleRemoveImage = (index) => {
    this.setState({ images: this.state.images.filter((img, i) => i !== index) })
  }
  /*
   * filter out the particular id out of the state.newImages Array
   */
  handleRemoveNewImage = (index) => {
    this.setState({ newImages: this.state.newImages.filter((img, i) => i !== index) })
  }

  /*
   * submit
   */
  handleUploadProduct = (e) => {
    e.preventDefault()

    const { isValid, errors } = submitValidation(this.state)
    if(!isValid) {
      // document.querySelector('#AddProductForm-upload-btn').disabled = true
      this.setState({ errors })
      return false
    }
    document.querySelector('#desc').parentElement.firstChild.textContent = 'Long Description'

    // Learning Note: inorder to make NPM package multer wokring at server side,
    // this step has to perform, append each file objec to the new FormData
    let data = new FormData()
    this.state.newImages.forEach((e, i) => {
      data.append(`newImage-${i}`, e)
    })
    // Learning Note: append key and,
    // value to the new FormData to post File object and form text to server
    data.append('id', this.state.id)
    data.append('department', this.state.department)
    data.append('category', this.state.category)
    data.append('subCategory', this.state.subCategory)
    data.append('stock', this.state.stock)
    data.append('numberOfStock', this.state.numberOfStock)
    data.append('desc', this.state.desc)
    data.append('name', this.state.name)
    data.append('brand', this.state.brand)
    data.append('price', this.state.price)
    data.append('salePrice', this.state.salePrice)
    data.append('listDesc', JSON.stringify(this.state.listDesc))
    data.append('images', JSON.stringify(this.state.images))
    data.append('onSale', this.state.onSale)
    data.append('size', this.state.size)
    data.append('soldBy', this.state.soldBy)

    // api request through Epic

    this.props.editProductRequest(data)

  }

  // ImageInfo = path => {
  //   let image = new Image()
  //
  //   image.onload = () => {
  //     console.log(image);
  //     if(image) {
  //       let canvas = document.createElement('canvas')
  //       canvas.width = 200
  //       canvas.height = 200
  //       let ctx = canvas.getContext('2d')
  //       ctx.drawImage(image, 0, 0)
  //       let data = canvas.toDataURL('images/png')
  //       // console.log(data);
  //     }
  //
  //   }
  //
  //   image.src = path
  // }

  /*
   *  render()
   */
  render() {

    // Assign: image preview for the upload images
    // Explain: use the processed array derive from FileList object,
    // to turn each object inside the array to the Dom.
    // Note: window.URL.createObjectURL(files[0]), turn the file object to dataURL for <img src="" alt=""/>
    // Note: usr the "escape(f.name)" method if necessary to change the white space to % sign
    let newImagesfilesPreviewDiv = this.state.newImages.map((f, i) => {
      // `/images/products/${f}`
      return (<div className='AddProductForm-image-each' key={i}>
                <div className='AddProductForm-image-cancel'>
                <i className="material-icons hover-cursor-pointer"
                  onClick={() => this.handleRemoveNewImage(i)}>cancel</i>
                </div>
                <img style={{ width: '200px', height: '200px' }} src={window.URL.createObjectURL(f)} alt=""/>
                <div className='AddProductForm-image-text flow-text'>{f.name} ({f.type}) - size: {bytesToSize(f.size)}</div>
              </div>)
    })

    let filesPreviewDiv = this.state.images.map((f, i) => {
      // let file = new File([''], `/images/products/${f}`, { type: 'image' })
      // console.log(this.ImageInfo(`/images/products/${f}`));
      // console.log(file)
      return (<div className='AddProductForm-image-each' key={i}>
                <div className='AddProductForm-image-cancel'>
                <i className="material-icons hover-cursor-pointer"
                  onClick={() => this.handleRemoveImage(i)}>cancel</i>
                </div>
                <img style={{ width: '200px', height: '200px' }} src={`/images/products/${f}`} alt=""/>

              </div>)
    })

    /*
     *  select input const render variable
     */
    // display departments
    let departments = null
    let category = null
    let subCategory = null

    departments = this.props.menu.categories.map((d, i) => {
      return <option key={i} value={d._id}>{d.department}</option>
    })

    // display category
    category = this.props.menu.categories.map((d, i) => {
      if(d._id ===  this.state.department) {
        return d.category.map((d, i) => {
          return <option key={i} value={d._id}>{d.name}</option>
        })
      }
      return false
    })

    // display subCategory
    subCategory = this.props.menu.categories.map((d, i) => {
      if(d._id === this.state.department) {
        return d.category.map((c, i) => {
          if(c._id === this.state.category) {
            return c.subcategory.map((c, i) => {
              return <option key={i} value={c._id}>{c.name}</option>
            })
          }
          return false
        })
      }
      return false
    })

    /*
     *  dynamically add input field to the dom
     */
    let listDescInputField = null
    if(this.state.listDesc.length)
      listDescInputField = this.state.listDesc.map((l, i) => {
        return (<div className='row' key={i}>
                  <div className='col-sm-11'>
                    <div className='form-group'>
                      <input
                        id='listDesc'
                        name={`listDesc${i}`}
                        type="text"
                        value={l.name}
                        onChange={e => this.handleListDescChange(e, i)}
                        className="form-control"
                        onBlur={this.handleOnBlur}
                       />
                      <div className='addProductForm-listDesc-cancel'>
                        <i className="material-icons hover-cursor-pointer"
                          onClick={(e) => this.handelListDescRemove(e, i)}>cancel</i>
                      </div>
                      <span className='text-danger addProductForm-invalid-span'>{this.state.errors[`listDesc${i}`]}</span>
                    </div>
                  </div>
                </div>)
      })

    /*
     *  return
     */
    return (
      <div className='AddProductForm-container container'>

            {/* row */}
            <div className="row">

              <div className='col-sm-6'>
                <div className="form-group">
                  <label className=''
                    htmlFor="name">Product name</label>
                  <input
                    className='form-control'
                    placeholder="Product name"
                    id="name"
                    name='name'
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    onBlur={this.handleOnBlur}
                    required
                    />
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.name}</span>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className="form-group">
                  <label
                    className=''
                    htmlFor="brand">Brand name</label>
                  <input
                    className='form-control'
                    placeholder="Brand name"
                    id="brand"
                    name='brand'
                    type="text"
                    value={this.state.brand}
                    onChange={this.handleChange}
                    onBlur={this.handleOnBlur}
                    required
                    />
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.brand}</span>
                </div>
              </div>

            </div>

            {/* row Long Description*/}
            <div className="row">
              <div className='col-sm-12'>
                <div className="form-group">
                  <label className=''
                    htmlFor="desc">Long Description</label>
                  <textarea
                    style={{ resize: "vertical" }}
                    rows='4'
                    className='form-control'
                    id="desc"
                    name='desc'
                    value={this.state.desc}
                    onChange={this.handleChange}
                    onBlur={this.handleOnBlur}
                    required
                  ></textarea>
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.desc}</span>
                </div>
              </div>
            </div>

            {/* row List of Description */}
            <div className="row">
              <div className='col-sm-12'>
                <div className='form-group'>
                  <label htmlFor="">Brief of Description</label><br/>
                  <button className='btn btn-default' onClick={this.handleAddBriefDescription}>Add Description</button>
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.listDesc}</span>
                </div>
              </div>
            </div>
            <div className='container'>
              {listDescInputField}
            </div>

            <hr/>

            {/* row Price */}
            <div className="row">
              <div className='col-sm-4'>
                <div className="form-group">
                  <label className='' htmlFor="price">Price</label>
                  <input
                    className='form-control'
                    placeholder="Price"
                    id="price"
                    name='price'
                    value={this.state.price}
                    onChange={this.handleChange}
                    onBlur={this.handleOnBlur}
                    required
                    type='number'
                  />
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.price}</span>
                </div>
              </div>


              <div className='col-sm-4'>
                <div className="form-group">
                  <label>On Sale</label>
                  <select className="form-control" id='onSale' name='onSale' value={this.state.onSale} onChange={this.handleChange}>\
                    <option disabled>Choose your option</option>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                  </select>
                </div>
              </div>

              <div className='col-sm-4'>
                <div className="form-group">
                  <label className='' htmlFor="salePrice">Sale Price</label>
                  <input
                    className='form-control'
                    placeholder="Sale Price"
                    id="salePrice"
                    name='salePrice'
                    value={this.state.salePrice}
                    onChange={this.handleChange}
                    type='number'
                  />
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.salePrice}</span>
                </div>
              </div>

            </div>

            {/* row Size */}
            <div className="row">

              <div className="col-sm-4">
                <div className="form-group">
                  <label className='' htmlFor="size">Size</label>
                  <input
                    className='form-control'
                    placeholder="Size"
                    id="size"
                    name='size'
                    type="text"
                    value={this.state.size}
                    onChange={this.handleChange}
                    onBlur={this.handleOnBlur}
                  />
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.size}</span>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="form-group">
                  <label>In stock</label>
                  <select className='form-control'  id='stock' name='stock' value={this.state.stock} onChange={this.handleChange}>
                    <option value="" disabled>Choose your option</option>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="form-group">
                  <label className='active' htmlFor="numberOfStock">Number of Stock</label>
                  <input
                    className='form-control'
                    placeholder="Number of Stock"
                    id="numberOfStock"
                    name='numberOfStock'
                    value={this.state.numberOfStock}
                    onChange={this.handleChange}
                    type='number'
                  />
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.numberOfStock}</span>
                </div>
              </div>

            </div>{/* end of the row Size */}

            {/* row Sold By */}
            <div className="row">
              <div className="col-sm-6">
                <div className='form-group'>
                  <label className='' htmlFor="soldBy">Sold By</label>
                  <input
                    className='form-control'
                    placeholder="Sold By"
                    id="soldBy"
                    name='soldBy'
                    type="text"
                    value={this.state.soldBy}
                    onChange={this.handleChange}
                    onBlur={this.handleOnBlur}
                    required
                  />
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.soldBy}</span>
                </div>
              </div>
            </div>{/* end of input fields */}

            {/* row */}
            {/* department selector */}
            <div className="row">

              <div className="col-sm-4">
                <div className='form-group'>
                  <label>Department</label>
                  <select
                    className='form-control'
                    id='department'
                    value={this.state.department}
                    name='department'
                    onChange={this.handleSelect}
                    onBlur={this.handleOnBlur}
                  >
                    <option value="" disabled>Choose your option</option>
                    {departments}
                  </select>
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.department}</span>
                </div>
              </div>

              <div className="col-sm-4">
                <div className='form-group'>
                  <label>Category</label>
                  <select required
                    className='form-control'
                    id='category'
                    value={this.state.category}
                    name='category'
                    onChange={this.handleSelect}
                    onBlur={this.handleOnBlur}
                  >
                    <option value="" disabled>Choose your option</option>
                    {category}
                  </select>
                  <span className='text-danger addProductForm-invalid-span '>{this.state.errors.category}</span>
                </div>
              </div>

              <div className="col-sm-4">
                <div className='form-group'>
                  <label>Product subCategory</label>
                  <select required
                    className='form-control'
                    id='subCategory'
                    value={this.state.subCategory}
                    name='subCategory'
                    onChange={this.handleSelect}
                    onBlur={this.handleOnBlur}
                  >
                    <option value="" disabled>Choose your option</option>
                    {subCategory}
                  </select>
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.subCategory}</span>
                </div>
              </div>
            </div>{/* end of department selector */}

            {/* upload image
                #1 display:none is for the input element. it's for the hide the default file chooseing text
                #2 use label to replace the look of the input element
            */}
             <div className='row'>
               <div className='col-sm-12'>
                 <div className='form-group'>
                    <label htmlFor="images" className='btn btn-default'>Upload images</label>
                    <input
                      style={{ display:'none'}}
                      id='images'
                      name='images'
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={this.handleFileSelect}
                    />
                  <span className='text-danger addProductForm-invalid-span'>{this.state.errors.images}</span>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-sm-12'>
                <div className='AddProductForm-image-preview'>
                  {filesPreviewDiv}
                  {newImagesfilesPreviewDiv}
                </div>{/* end of upload image */}
              </div>
            </div>

            <hr/>

            <div className='row'>
              <div className='col-xs-6 col-sm-6'>
                <button id='AddProductForm-delete-btn' className='pull-left btn btn-danger' onClick={this.handleDeleteProduct}>Delete product</button>
              </div>
              <div className='col-xs-6 col-sm-6'>
                <button id='AddProductForm-upload-btn' className='pull-right btn btn-primary' onClick={this.handleUploadProduct}>Edit product</button>
              </div>
            </div>


      </div>
    )
  }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  editProductRequest: payload => dispatch(productActions.editProductRequest(payload)),
  handleOpenDialog: payload => dispatch(UIActions.handleOpenDialog(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProductForm)
