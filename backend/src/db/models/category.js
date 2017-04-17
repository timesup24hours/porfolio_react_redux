import { mongoose, Schema } from '../../db'

const Category = new Schema({
  name: { type: String, required: true },
  to: { type: String },
  desc: { type: String },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  subCategoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
})

export default mongoose.model('Category', Category)
