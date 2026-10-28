'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Head from 'next/head';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    faculty: '',
    memberType: 'team',
    ecTitle: '',
    imageUrl: '',
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [gallerySelectedFile, setGallerySelectedFile] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState(null);
  const [galleryTitle, setGalleryTitle] = useState('');
  
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      fetchMembers();
      fetchGallery();
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };
  
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/member');
      setMembers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load members');
      setLoading(false);
      toast.error('Failed to load members');
      console.error('Error fetching members:', err);
    }
  };
  
  const fetchGallery = async () => {
    try {
      setGalleryLoading(true);
      const res = await axios.get('/api/gallery');
      setGalleryImages(res.data);
    } catch (e) {
      console.error('Error fetching gallery:', e);
      toast.error('Failed to load gallery');
    } finally {
      setGalleryLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleGalleryFileChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 8 * 1024 * 1024) { toast.error('Image > 8MB not allowed'); return; }
      if (!file.type.startsWith('image/')) { toast.error('Select an image file'); return; }
      setGallerySelectedFile(file);
      const r = new FileReader();
      r.onloadend = () => setGalleryPreview(r.result);
      r.readAsDataURL(file);
    }
  };
  
  const uploadImage = async () => {
    if (!selectedImage) return null;
    
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'team_members';
    
    if (!cloudName) {
      console.error('Cloudinary cloud name not configured');
      toast.error('Image upload configuration missing. Please check .env.local file.');
      return null;
    }
    
    const formDataForUpload = new FormData();
    formDataForUpload.append('file', selectedImage);
    formDataForUpload.append('upload_preset', uploadPreset);
    
    setUploading(true);
    
    try {
      console.log('Uploading to Cloudinary:', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
      console.log('Upload preset being used:', uploadPreset);
      
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formDataForUpload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 60000,
        }
      );
      
      setUploading(false);
      console.log('Upload successful:', response.data);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      console.error('Error details:', error.response?.data);
      setUploading(false);
      
      if (error.response?.data?.error) {
        toast.error(`Upload failed: ${error.response.data.error.message}`);
      } else if (error.response?.status === 401) {
        toast.error('Image upload failed: Invalid upload preset or unauthorized.');
      } else if (error.response?.status === 400) {
        toast.error('Image upload failed: Invalid file or configuration. Check console for details.');
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Image upload timed out. Please try with a smaller image.');
      } else {
        toast.error(`Failed to upload image: ${error.message}`);
      }
      return null;
    }
  };
  
  const uploadGalleryImage = async () => {
    if (!gallerySelectedFile) return null;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'team_members';
    if (!cloudName) { toast.error('Cloudinary not configured'); return null; }
    const fd = new FormData();
    fd.append('file', gallerySelectedFile);
    fd.append('upload_preset', preset);
    setGalleryUploading(true);
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      return res.data.secure_url;
    } catch (err) {
      console.error('Gallery upload error:', err);
      toast.error('Upload failed');
      return null;
    } finally {
      setGalleryUploading(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      batch: '',
      faculty: '',
      memberType: 'team',
      ecTitle: '',
      imageUrl: '',
    });
    setSelectedImage(null);
    setImagePreview(null);
    setIsEditMode(false);
    setEditingMemberId(null);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.batch || !formData.faculty || (!isEditMode && !selectedImage && !formData.imageUrl)) {
      toast.error('Please fill all required fields' + (!isEditMode ? ' and upload an image' : ''));
      return;
    }
    
    if (formData.memberType === 'ec' && !formData.ecTitle) {
      toast.error('Please enter a title for EC member');
      return;
    }
    
    setIsSubmitting(true);
    
    const loadingToast = toast.loading(isEditMode ? 'Updating member...' : 'Adding member...');
    
    try {
      let imageUrl = formData.imageUrl;
      
      if (selectedImage) {
        imageUrl = await uploadImage();
        
        if (!imageUrl) {
          setIsSubmitting(false);
          toast.dismiss(loadingToast);
          return;
        }
      }
      
      const memberData = {
        ...formData,
        imageUrl,
        ...(formData.memberType !== 'ec' && { ecTitle: undefined })
      };
      
      if (isEditMode) {
        await axios.put(`/api/member/${editingMemberId}`, memberData);
        toast.success('Member updated successfully!', { id: loadingToast });
      } else {
        await axios.post('/api/member', memberData);
        toast.success('Member added successfully!', { id: loadingToast });
      }
      
      resetForm();
      fetchMembers();
    } catch (error) {
      console.error(isEditMode ? 'Error updating member:' : 'Error adding member:', error);
      toast.error(
        `Failed to ${isEditMode ? 'update' : 'add'} member: ${error.response?.data?.message || error.message}`,
        { id: loadingToast }
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAddGalleryImage = async (e) => {
    e.preventDefault();
    if (!gallerySelectedFile) { toast.error('Select an image'); return; }
    const loadingT = toast.loading('Uploading photo...');
    try {
      const url = await uploadGalleryImage();
      if (!url) { toast.dismiss(loadingT); return; }
      await axios.post('/api/gallery', { imageUrl: url, title: galleryTitle });
      toast.success('Photo added', { id: loadingT });
      setGallerySelectedFile(null); setGalleryPreview(null); setGalleryTitle('');
      fetchGallery();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save photo', { id: loadingT });
    }
  };
  
  const handleDelete = async (memberId) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      const loadingToast = toast.loading('Deleting member...');
      
      try {
        await axios.delete(`/api/member/${memberId}`);
        setMembers(members.filter(member => member._id !== memberId));
        toast.success('Member deleted successfully', { id: loadingToast });
      } catch (error) {
        console.error('Error deleting member:', error);
        toast.error(
          'Failed to delete member: ' + (error.response?.data?.message || error.message),
          { id: loadingToast }
        );
      }
    }
  };
  
  const handleDeleteGalleryImage = async (id) => {
    if (!confirm('Delete this photo?')) return;
    const t = toast.loading('Deleting photo...');
    try {
      await axios.delete(`/api/gallery/${id}`);
      setGalleryImages(galleryImages.filter(g => g._id !== id));
      toast.success('Photo deleted', { id: t });
    } catch (e) {
      console.error(e);
      toast.error('Delete failed', { id: t });
    }
  };
  
  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      batch: member.batch,
      faculty: member.faculty,
      memberType: member.memberType,
      ecTitle: member.ecTitle || '',
      imageUrl: member.imageUrl,
    });
    setImagePreview(member.imageUrl);
    setEditingMemberId(member._id);
    setIsEditMode(true);
    
    document.getElementById('memberForm').scrollIntoView({ behavior: 'smooth' });
    toast.success('Ready to edit member');
  };
  
  const handleCancelEdit = () => {
    resetForm();
    toast.success('Edit cancelled');
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard | Team Management</title>
      </Head>
      
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 4000,
          style: {
            background: '#18181b',
            color: '#fff',
            border: '1px solid #3f3f46',
          },
          
          success: {
            duration: 3000,
            style: {
              background: '#166534',
              border: '1px solid #16a34a',
            },
            iconTheme: {
              primary: '#16a34a',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#991b1b',
              border: '1px solid #dc2626',
            },
            iconTheme: {
              primary: '#dc2626',
              secondary: '#fff',
            },
          },
          loading: {
            style: {
              background: '#1e40af',
              border: '1px solid #3b82f6',
            },
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white">
        <header className="bg-black shadow-md py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">
              Team Admin <span className="text-red-600">Dashboard</span>
            </h1>
            <button 
              onClick={handleLogout}
              className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div id="memberForm" className="bg-zinc-900 shadow-lg rounded-lg p-6 border border-zinc-800">
                <h2 className="text-xl font-semibold mb-6 text-red-500">
                  {isEditMode ? 'Edit Team Member' : 'Add New Team Member'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="batch" className="block text-sm font-medium text-gray-300 mb-1">
                      Batch *
                    </label>
                    <input
                      type="text"
                      id="batch"
                      name="batch"
                      value={formData.batch}
                      onChange={handleInputChange}
                      placeholder="e.g. 2021-2025"
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="faculty" className="block text-sm font-medium text-gray-300 mb-1">
                      Faculty *
                    </label>
                    <input
                      type="text"
                      id="faculty"
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleInputChange}
                      placeholder="e.g. Computer Science"
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Member Type *
                    </label>
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="team"
                          name="memberType"
                          value="team"
                          checked={formData.memberType === 'team'}
                          onChange={handleInputChange}
                          className="mr-2 text-red-600 focus:ring-red-600"
                        />
                        <label htmlFor="team" className="text-gray-300">Team Member</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="ec"
                          name="memberType"
                          value="ec"
                          checked={formData.memberType === 'ec'}
                          onChange={handleInputChange}
                          className="mr-2 text-red-600 focus:ring-red-600"
                        />
                        <label htmlFor="ec" className="text-gray-300">EC Member</label>
                      </div>
                    </div>
                  </div>
                  
                  {formData.memberType === 'ec' && (
                    <div className="mb-4">
                      <label htmlFor="ecTitle" className="block text-sm font-medium text-gray-300 mb-1">
                        EC Title *
                      </label>
                      <select
                        id="ecTitle"
                        name="ecTitle"
                        value={formData.ecTitle}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                        required={formData.memberType === 'ec'}
                      >
                        <option value="">Select a title</option>
                        <option value="Captain">Captain</option>
                        <option value="Vice Captain">Vice Captain</option>
                        <option value="Technical Lead">Technical Lead</option>
                        <option value="Manager">Manager</option>
                        <option value="Director Electrical">Director Electrical</option>
                        <option value="Director Marketing">Director Marketing</option>
                        <option value="Director R&D">Director R&D</option>
                        <option value="Director Sponsorship">Director Sponsorship</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Profile Image {isEditMode ? '' : '*'} (Max 5MB)
                    </label>
                    <div className="flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg p-4">
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label 
                        htmlFor="imageUpload" 
                        className="cursor-pointer flex flex-col items-center justify-center w-full"
                      >
                        {imagePreview ? (
                          <div className="relative w-40 h-40 mb-2">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-40 h-40 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedImage(null);
                                setImagePreview(null);
                                setFormData({...formData, imageUrl: ''});
                              }}
                              className="absolute top-1 right-1 bg-red-600 rounded-full p-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <>
                            <svg className="w-12 h-12 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span className="mt-2 text-sm text-zinc-500">
                              Click to {isEditMode ? 'change' : 'upload'} image
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                    {isEditMode && imagePreview && (
                      <p className="text-xs text-gray-400 mt-2">
                        * Leave image unchanged to keep the current photo
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-3">
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex-1 py-2 px-4 border border-zinc-600 rounded-md text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none"
                      >
                        Cancel
                      </button>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || uploading}
                      className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                        (isSubmitting || uploading) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting || uploading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {uploading ? 'Uploading Image...' : (isEditMode ? 'Updating Member...' : 'Adding Member...')}
                        </span>
                      ) : (
                        isEditMode ? 'Update Member' : 'Add Member'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-zinc-900 shadow-lg rounded-lg p-6 border border-zinc-800">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-red-500">Team Members</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        fetchMembers();
                        toast.success('Members list refreshed');
                      }} 
                      className="px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700 transition-colors"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
                
                {loading ? (
                  <div className="flex justify-center items-center p-8">
                    <svg className="animate-spin h-10 w-10 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : error ? (
                  <div className="bg-red-900/30 border border-red-800 p-4 rounded-md text-red-400">
                    {error}
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-lg font-medium text-gray-200 mb-4 border-b border-zinc-800 pb-2">
                        EC Members ({members.filter(m => m.memberType === 'ec').length})
                      </h3>
                      {members.filter(m => m.memberType === 'ec').length === 0 ? (
                        <p className="text-gray-500 italic">No EC members found</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {members
                            .filter(member => member.memberType === 'ec')
                            .map(member => (
                              <div key={member._id} className="bg-black border border-zinc-800 rounded-lg p-4 flex space-x-4">
                                <img 
                                  src={member.imageUrl} 
                                  alt={member.name} 
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-white">{member.name}</h4>
                                  <p className="text-sm text-red-500">{member.ecTitle}</p>
                                  <div className="text-xs text-gray-400 mt-1">
                                    {member.batch} • {member.faculty}
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <button
                                    onClick={() => handleEdit(member)}
                                    className="text-zinc-500 hover:text-blue-500 transition-colors"
                                    title="Edit member"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(member._id)}
                                    className="text-zinc-500 hover:text-red-500 transition-colors"
                                    title="Delete member"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-200 mb-4 border-b border-zinc-800 pb-2">
                        Regular Team Members ({members.filter(m => m.memberType === 'team').length})
                      </h3>
                      {members.filter(m => m.memberType === 'team').length === 0 ? (
                        <p className="text-gray-500 italic">No team members found</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {members
                            .filter(member => member.memberType === 'team')
                            .map(member => (
                              <div key={member._id} className="bg-black border border-zinc-800 rounded-lg p-4 flex space-x-4">
                                <img 
                                  src={member.imageUrl} 
                                  alt={member.name} 
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-white">{member.name}</h4>
                                  <div className="text-xs text-gray-400 mt-1">
                                    {member.batch} • {member.faculty}
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                  <button
                                    onClick={() => handleEdit(member)}
                                    className="text-zinc-500 hover:text-blue-500 transition-colors"
                                    title="Edit member"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(member._id)}
                                    className="text-zinc-500 hover:text-red-500 transition-colors"
                                    title="Delete member"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* GALLERY MANAGEMENT SECTION */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-6">
          <div className="mt-14 bg-zinc-900 shadow-lg rounded-lg p-6 border border-zinc-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-red-500">Gallery Management</h2>
              <button onClick={() => { fetchGallery(); toast.success('Gallery refreshed'); }} className="px-4 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700">Refresh</button>
            </div>
            <form onSubmit={handleAddGalleryImage} className="mb-8">
              <div className="grid md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Title (optional)</label>
                  <input value={galleryTitle} onChange={e=>setGalleryTitle(e.target.value)} placeholder="e.g. Competition Day" className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Photo *</label>
                  <div className="border-2 border-dashed border-zinc-700 rounded-lg p-3 text-center cursor-pointer">
                    <input id="galleryFile" type="file" accept="image/*" onChange={handleGalleryFileChange} className="hidden" />
                    <label htmlFor="galleryFile" className="block text-sm text-zinc-400">
                      {galleryPreview ? 'Change Image' : 'Select Image'}
                    </label>
                    {galleryPreview && <img src={galleryPreview} alt="preview" className="mt-2 h-16 w-16 object-cover rounded" />}
                  </div>
                </div>
                <div>
                  <button type="submit" disabled={galleryUploading} className={`w-full py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 disabled:opacity-50`}>{galleryUploading ? 'Uploading...' : 'Add Photo'}</button>
                </div>
              </div>
            </form>

            {galleryLoading ? (
              <div className="flex justify-center p-8">
                <svg className="animate-spin h-8 w-8 text-red-600" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
              </div>
            ) : (
              <div>
                {galleryImages.length === 0 ? (
                  <p className="text-gray-500">No gallery images yet.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {galleryImages.map(img => (
                      <div key={img._id} className="relative group border border-zinc-800 rounded-lg overflow-hidden bg-black">
                        <img src={img.imageUrl} alt={img.title || 'Team photo'} className="w-full h-32 object-cover" />
                        {img.title && <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs px-2 py-1 truncate">{img.title}</div>}
                        <button onClick={() => handleDeleteGalleryImage(img._id)} className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-700 text-white rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity" title="Delete">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}