import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import TextFieldGroup from '../common/TextFieldGroup'
import { bytesToSize } from '../../utils'
import Cancel from 'material-ui/svg-icons/navigation/cancel'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import * as productActions from '../../store/actions/productActions'
import * as addProductFormActions from '../../store/actions/addProductFormActions'

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
  listDesc: '',
  onSale: false,
  size: '',
  images: [],
  soldBy: ''
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

  /*
   * change the value in the dynamically added input field (listDesc)
   */
  handleListDescChange = (e, index) => {
    const newListDesc = this.state.listDesc.map((l, ldi) => {
      if (ldi !== index) return l
      return { ...l, name: e.target.value }
    })

    this.setState({ listDesc: newListDesc })
    localStorage.setItem('addProductForm-listDesc', JSON.stringify(newListDesc))
  }

  /*
   * increase the listDesc length in order to dynamically map the input field to the dom
   */
  handleAddBriefDescription = () => {
    if(this.state.listDesc.length < 10) {
      this.setState({ listDesc: this.state.listDesc.concat({ name: '' }) })
    }
  }

  isValid = () => {
    const { errors, isValid } = validate(this.state)

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid
  }

  /*
   * set value of the select element to localStorage and reset the state
   */
  handleSelect = e => {
    localStorage.setItem(`addProductForm-${e.target.name}`, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  /*
   * set value of the select element to localStorage and reset the state
   */
  handleChange = (e) => {
    localStorage.setItem(`addProductForm-${e.target.name}`, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }
  /*
   *  Assign: turn the files object into array, and set to the state
   *  Explain: handle the onchange event in the <input type='file'/>
   */
  handleFileSelect = evt => {
    // get the files(FileList) object from the Dom's <input type='file'/> element
    let filelist = evt.target.files

    let images = []
    // loop through each file object inside the FileList object into the images array
    for(let i = 0; i < filelist.length; i++) {
      images.push(filelist[i])
    }
    // concat the coming object and seset the state
    this.setState({ images: this.state.images.concat(images) })
  }

  /*
   * filter out the particular id out of the state.images Array
   */
  handleRemoveImage = (index) => {
    this.setState({ images: this.state.images.filter((img, i) => i !== index) })
  }

  /*
   * submit
   */
  handleUploadProduct = (e) => {
    e.preventDefault()

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
    data.append('listDesc', this.state.listDesc)
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
      return (<div key={i}>
                <Cancel onClick={() => this.handleRemoveImage(i)}/>
                <img style={{ width: '200px', height: '200px' }} src={window.URL.createObjectURL(f)} alt=""/>
                <div>{f.name} ({f.type}) - size: {bytesToSize(f.size)}</div>
              </div>)
    })

    /*
     *  select input const render variable
     */
    // display departments
    const departments = this.props.menu.department.map((d, i) => {
      return <option key={i} value={d._id}>{d.name.name}</option>
    })
    // display category
    let selectedDepartment = null
    let category = null

    if(this.state.department) {
      selectedDepartment = this.props.menu.department.filter((d, i) =>  d._id === this.state.department)
      if(selectedDepartment.length) {
        category = selectedDepartment[0].children.map((c, i) => {
          if(c.name) {
            return <option key={i} value={c._id}>{c.name}</option>
          }
          return false
        })
      }
    }
    // display types
    let selectedCategory = null
    let types = null

    if(this.state.category) {
      selectedCategory = this.props.menu.category.filter((c, i) => c.parent === this.state.category)
      if(selectedCategory.length) {
        types = selectedCategory[0].children.map((t, i) => {
          if(t.name) {
            return <option key={i} value={t._id}>{t.name}</option>
          }
          return false
        })
      }
    } // end of select input group

    /*
     *  dynamically add input field to the dom
     */
    let listDescInputField = null
    if(this.state.listDesc.length)
      listDescInputField = this.state.listDesc.map((l, i) => {
        return (<div key={i}>
                  <input
                    id={`listDesc${i}`}
                    name={`listDesc${i}`}
                    type="text"
                    value={l.name}
                    onChange={e => this.handleListDescChange(e, i)}
                   />
                  <Cancel onClick={(e) => this.handelListDescRemove(e, i)}/>
                </div>)
      })

    /*
     *  return
     */
    return (
      <div className='AddProductForm-container'>
        <Paper zDepth={2}>
          {/* input fields */}
          <TextFieldGroup
            classNameContainer='AddProductForm-input-container'
            classNameLabel=''
            classNameInput='AddProductForm-input-text'
            classNameError='wrong'
            label="Product name"
            name='name'
            value={this.state.name}
            onChange={this.handleChange}  />
          <Divider />

          <TextFieldGroup
            label="Brand name"
            name='brand'
            value={this.state.brand}
            onChange={this.handleChange}  />
          <Divider />

          <label htmlFor="desc">Description</label>
          <textarea
            cols="40"
            rows="5"
            name='desc'
            value={this.state.desc}
            onChange={this.handleChange} ></textarea>
          <Divider />

          <label htmlFor="">List of Description</label>
            {listDescInputField}
          <RaisedButton label="Add Description" onClick={this.handleAddBriefDescription}/>
          <Divider />

          <TextFieldGroup
            label="Size"
            name='size'
            value={this.state.size}
            onChange={this.handleChange} />
          <Divider />

          <TextFieldGroup
            label="Price"
            value={this.state.price}
            name='price'
            onChange={this.handleChange} />
          <Divider />

          <TextFieldGroup
            label="Sale Price"
            value={this.state.salePrice}
            name='salePrice'
            onChange={this.handleChange} />
          <Divider />

          <TextFieldGroup
            label="Sold By"
            value={this.state.soldBy}
            name='soldBy'
            onChange={this.handleChange} />
          <Divider />

          <div className='AddProductForm-stock'>
            <TextFieldGroup
              label="Number of Stock"
              name='numberOfStock'
              value={this.state.numberOfStock}
              onChange={this.handleChange} />

            <label htmlFor="stock">In stock</label>
            <select id='stock' name='stock' value={this.state.stock} onChange={this.handleChange}>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
          <Divider />

          <label htmlFor="onSale">On Sale</label>
          <select id='onSale' name='onSale' value={this.state.onSale} onChange={this.handleChange}>
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
          <Divider />  {/* end of input fields */}

          {/* department selector */}
          <div className='AddProductForm-category-selector-group'>
            <div>
              <label htmlFor="department">Department</label>
              <select id='department' value={this.state.department} name='department' onChange={this.handleSelect}>
                <option default disabled>select</option>
                {departments}
              </select>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select id='category' value={this.state.category} name='category' onChange={this.handleSelect}>
                <option default disabled>select</option>
                {category}
              </select>
            </div>

            <div>
              <label htmlFor="type">Product Type</label>
              <select id='type' value={this.state.type} name='type' onChange={this.handleSelect}>
                <option default disabled>select</option>
                {types}
              </select>
            </div>
          </div>
          <Divider />{/* end of department selector */}

          {/* upload image
              #1 display:none is for the input element. it's for the hide the default file chooseing text
              #2 use label to replace the look of the input element
           */}
          <label htmlFor="images" className='AddProductForm-upload-image-label'>Upload images</label>
          <input
            style={{display:'none'}}
            id='images'
            name='images'
            type="file"
            accept="image/*"
            multiple onChange={this.handleFileSelect}/>

          <div className='AddProductForm-image-preview'>
            {filesPreviewDiv}
          </div>{/* end of upload image */}

        </Paper>

        <RaisedButton label="Clear" onClick={this.handleClearForm}/>
        <RaisedButton label="upload product" primary={true} onClick={this.handleUploadProduct} />
      </div>
    )
  }

}

const mapStateToProps = state => ({
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
