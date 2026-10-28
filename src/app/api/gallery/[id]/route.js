import connectDB from '../../../lib/mongodb';
import GalleryImage from '../../../models/Gallery';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(request, context) {
	try {
		await connectDB();
		const { id } = await context.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
		}
		const image = await GalleryImage.findById(id);
		if (!image) {
			return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
		}
		return NextResponse.json({ success: true, image }, { status: 200 });
	} catch (error) {
		console.error('Gallery GET by ID error:', error);
		return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
	}
}

export async function DELETE(request, context) {
	try {
		await connectDB();
		const { id } = await context.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
		}
		const deleted = await GalleryImage.findByIdAndDelete(id);
		if (!deleted) {
			return NextResponse.json({ success: false, message: 'Image not found or already deleted' }, { status: 404 });
		}
		return NextResponse.json({ success: true, message: 'Image deleted' }, { status: 200 });
	} catch (error) {
		console.error('Gallery DELETE error:', error);
		return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
	}
}

export async function PUT(request, context) {
	try {
		await connectDB();
		const { id } = await context.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
		}
		const data = await request.json();
		if (data._id) delete data._id;
		const updated = await GalleryImage.findByIdAndUpdate(id, data, { new: true, runValidators: true });
		if (!updated) {
			return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
		}
		return NextResponse.json({ success: true, image: updated, message: 'Image updated' }, { status: 200 });
	} catch (error) {
		console.error('Gallery PUT error:', error);
		return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
	}
}
