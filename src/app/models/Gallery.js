import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		default: ''
	},
	imageUrl: {
		type: String,
		required: [true, 'Image URL is required'],
	},
	tags: {
		type: [String],
		default: []
	},
	// For potential future feature (e.g., pin or ordering)
	isFeatured: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema);
