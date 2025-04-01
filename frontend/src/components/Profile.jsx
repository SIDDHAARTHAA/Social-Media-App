import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');
  const [dialogType, setDialogType] = useState(null); // 'followers' or 'following'

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost =
    activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-8">
      {/* Profile Header */}
      <div className="w-[60%] bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-8">
          <Avatar className="w-32 h-32">
            <AvatarImage src={userProfile?.profilePicture} alt="Profile" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{userProfile?.username}</h1>
            <p className="text-gray-600">{userProfile?.bio || 'Bio goes here...'}</p>
            <div className="flex gap-4 mt-4">
              <span>
                <strong>{userProfile?.posts.length}</strong> posts
              </span>
              <span>
                <strong>{userProfile?.followers.length}</strong> followers
              </span>
              <span>
                <strong>{userProfile?.following.length}</strong> following
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="w-[60%] mt-8 grid grid-cols-3 gap-4">
        {displayedPost?.map((post) => (
          <div key={post?._id} className="w-full h-48 bg-gray-200 rounded-lg">
            <img
              src={post.image}
              alt="postimage"
              className="rounded-sm my-2 w-full aspect-square object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;