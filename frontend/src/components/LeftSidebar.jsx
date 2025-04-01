import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import CreatePost from './CreatePost';
import { setPosts, setSelectedPost } from '@/redux/postSlice';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('https://mediagram-pn8o.onrender.com/api/v1/user/logout', { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === 'Create') {
      setOpen(true);
    } else if (textType === 'Profile') {
      navigate(`/profile/${user?._id}`);
    } else if (textType === 'Home') {
      navigate('/');
    } else if (textType === 'Messages') {
      navigate('/chat');
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: 'Home', disabled: false },
    { icon: <Search />, text: 'Search', disabled: true },
    { icon: <TrendingUp />, text: 'Explore', disabled: true },
    { icon: <MessageCircle />, text: 'Messages', disabled: false },
    { icon: <Heart />, text: 'Notifications', disabled: true },
    { icon: <PlusSquare />, text: 'Create', disabled: false },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: 'Profile',
      disabled: false,
    },
    { icon: <LogOut />, text: 'Logout', disabled: false },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-[20%] bg-white border-r border-gray-200 flex flex-col items-center py-6">
      {/* Instagram Logo */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="Instagram Logo"
        className="w-16 mb-8"
      />

      {/* Sidebar Items */}
      <div className="flex flex-col gap-6 w-full">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => !item.disabled && sidebarHandler(item.text)}
            className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
              item.disabled
                ? 'text-gray-400 cursor-not-allowed'
                : 'hover:bg-gray-100 cursor-pointer'
            }`}
          >
            {item.icon}
            <span className="text-lg font-medium">{item.text}</span>
            {item.text === 'Notifications' && likeNotification.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    size="icon"
                    className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                  >
                    {likeNotification.length}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div>
                    {likeNotification.length === 0 ? (
                      <p>No new notification</p>
                    ) : (
                      likeNotification.map((notification) => {
                        return (
                          <div key={notification.userId} className="flex items-center gap-2 my-2">
                            <Avatar>
                              <AvatarImage src={notification.userDetails?.profilePicture} />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                              <span className="font-bold">{notification.userDetails?.username}</span> liked your
                              post
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ))}
      </div>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;