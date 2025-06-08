import AllBanner from '../models/allBannerModel.js';

export const getAllBanners = async (req, res) => {
  const banners = await AllBanner.find();
  res.json(banners);
};

export const getBanner = async (req, res) => {
  const banner = await AllBanner.findOne({ pageKey: req.params.pageKey });
  if (!banner) return res.status(404).json({ error: 'Not found' });
  res.json(banner);
};

export const createOrUpdateBanner = async (req, res) => {
  const { pageKey, title, description } = req.body;
  const imageUrl = req.file ? `uploads/banners/${req.file.filename}` : undefined;

  const updateData = { title, description };
  if (imageUrl) updateData.imageUrl = imageUrl;

  const banner = await AllBanner.findOneAndUpdate(
    { pageKey },
    { $set: updateData },
    { new: true, upsert: true }
  );

  res.json(banner);
};

export const deleteBanner = async (req, res) => {
  const banner = await AllBanner.findOneAndDelete({ pageKey: req.params.pageKey });
  if (!banner) return res.status(404).json({ error: 'Banner not found' });
  res.json({ message: 'Banner deleted' });
};
