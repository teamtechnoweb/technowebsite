import connectDB from '../../lib/mongodb';
import GalleryImage from '../../models/Gallery';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		await connectDB();
		const images = await GalleryImage.find().sort({ createdAt: -1 });
		return NextResponse.json(images, { status: 200 });
	} catch (error) {
		console.error('Gallery GET error:', error);
		return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
	}
}

export async function POST(req) {
	try {
		const body = await req.json();
		if (!body.imageUrl) {
			return NextResponse.json({ success: false, message: 'imageUrl is required' }, { status: 400 });
		}
		await connectDB();
		const doc = await GalleryImage.create({
			title: body.title || '',
			imageUrl: body.imageUrl,
			tags: Array.isArray(body.tags) ? body.tags : [],
			isFeatured: body.isFeatured || false
		});
		return NextResponse.json({ success: true, image: doc }, { status: 201 });
	} catch (error) {
		console.error('Gallery POST error:', error);
		return NextResponse.json({ success: false, message: 'Server error', error: error.message }, { status: 500 });
	}
}
