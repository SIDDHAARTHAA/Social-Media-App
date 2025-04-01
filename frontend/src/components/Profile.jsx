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
    <div className="flex max-w-5xl justify-center mx-auto pl-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="grid grid-cols-2">
          <section className="flex items-center justify-center">
            <Avatar className="h-32 w-32">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profilephoto"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span>{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <Link to="/account/edit">
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      Edit profile
                    </Button>
                  </Link>
                ) : (
                  <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8">
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <p
                      onClick={() => setDialogType('followers')}
                      className="cursor-pointer"
                    >
                      <span className="font-semibold">
                        {userProfile?.followers.length}{' '}
                      </span>
                      followers
                    </p>
                  </DialogTrigger>
                  <DialogContent>
                    <h1 className="font-bold mb-4">Followers</h1>
                    {userProfile?.followers.map((follower) => (
                      <div
                        key={follower._id}
                        className="flex items-center gap-2 my-2"
                      >
                        <Avatar>
                          <AvatarImage src={follower?.profilePicture} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{follower?.username}</span>
                      </div>
                    ))}
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <p
                      onClick={() => setDialogType('following')}
                      className="cursor-pointer"
                    >
                      <span className="font-semibold">
                        {userProfile?.following.length}{' '}
                      </span>
                      following
                    </p>
                  </DialogTrigger>
                  <DialogContent>
                    <h1 className="font-bold mb-4">Following</h1>
                    {userProfile?.following.map((following) => (
                      <div
                        key={following._id}
                        className="flex items-center gap-2 my-2"
                      >
                        <Avatar>
                          <AvatarImage src={following?.profilePicture} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{following?.username}</span>
                      </div>
                    ))}
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  {userProfile?.bio || 'bio here...'}
                </span>
              </div>
            </div>
          </section>
        </div>
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm">
            <span
              className={`py-3 cursor-pointer ${
                activeTab === 'posts' ? 'font-bold' : ''
              }`}
              onClick={() => handleTabChange('posts')}
            >
              POSTS
            </span>
            <span
              className={`py-3 cursor-pointer ${
                activeTab === 'saved' ? 'font-bold' : ''
              }`}
              onClick={() => handleTabChange('saved')}
            >
              SAVED
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {displayedPost?.map((post) => (
              <div
                key={post?._id}
                className="relative group cursor-pointer"
              >
                <img
                  src={post.image}
                  alt="postimage"
                  className="rounded-sm my-2 w-full aspect-square object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;