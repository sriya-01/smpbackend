// import mongoose from 'mongoose';

// const webVideoSchema = new mongoose.Schema(
//   {
//     videoPath: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model('WebVideo', webVideoSchema);
import mongoose from 'mongoose';

const organicVideoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('OrganicVideo', organicVideoSchema);
