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

const socialImageSchema = new mongoose.Schema({
  image: { type: String, required: true }, // path to uploaded image file
}, { timestamps: true });

export default mongoose.model('SocialImage', socialImageSchema);
