// import Banner from '../models/bannerModel.js'

// // Get
// export const getBanner = async (req, res) => {
//   const banner = await Banner.findOne()
//   res.json(banner)
// }

// // Create
// export const createBanner = async (req, res) => {
//   const { heading, subheading } = req.body
//   const image = req.file?.filename
//   const logo1 = req.file?.filename
//   const logo2 = req.file?.filename
//   const logo3 = req.file?.filename
//   const logo4 = req.file?.filename

//   const banner = new Banner({ heading, subheading, image,logo1,logo2,logo3,logo4 })
//   await banner.save()
//   res.json(banner)
// }

// // Update
// export const updateBanner = async (req, res) => {
//   const { id } = req.params
//   const { heading, subheading } = req.body
//   const updateData = { heading, subheading }
//   if (req.file) updateData.image = req.file.filename
//   const banner = await Banner.findByIdAndUpdate(id, updateData, { new: true })
//   res.json(banner)
// }

// // Delete field
// export const deleteField = async (req, res) => {
//   const { id, field } = req.params
//   const update = { $unset: { [field]: "" } }
//   const updated = await Banner.findByIdAndUpdate(id, update, { new: true })
//   res.json(updated)
// }


import Banner from '../models/bannerModel.js'

// GET
export const getBanner = async (req, res) => {
  const banner = await Banner.findOne()
  res.json(banner)
}

// CREATE
export const createBanner = async (req, res) => {
  const { heading, subheading } = req.body

  const image = req.files?.image?.[0]?.filename
  const logo1 = req.files?.logo1?.[0]?.filename
  const logo2 = req.files?.logo2?.[0]?.filename
  const logo3 = req.files?.logo3?.[0]?.filename
  const logo4 = req.files?.logo4?.[0]?.filename

  const banner = new Banner({
    heading,
    subheading,
    image,
    logo1,
    logo2,
    logo3,
    logo4,
  })

  await banner.save()
  res.json(banner)
}

// UPDATE
export const updateBanner = async (req, res) => {
  const { id } = req.params
  const { heading, subheading } = req.body

  const updateData = {
    heading,
    subheading,
  }

  if (req.files?.image?.[0]) updateData.image = req.files.image[0].filename
  if (req.files?.logo1?.[0]) updateData.logo1 = req.files.logo1[0].filename
  if (req.files?.logo2?.[0]) updateData.logo2 = req.files.logo2[0].filename
  if (req.files?.logo3?.[0]) updateData.logo3 = req.files.logo3[0].filename
  if (req.files?.logo4?.[0]) updateData.logo4 = req.files.logo4[0].filename

  const banner = await Banner.findByIdAndUpdate(id, updateData, { new: true })
  res.json(banner)
}

// DELETE FIELD
export const deleteField = async (req, res) => {
  const { id, field } = req.params
  const update = { $unset: { [field]: "" } }
  const updated = await Banner.findByIdAndUpdate(id, update, { new: true })
  res.json(updated)
}
