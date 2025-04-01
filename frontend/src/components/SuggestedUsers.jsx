import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import axios from 'axios';
import { setSuggestedUsers } from '@/redux/authSlice';
import { toast } from 'sonner';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const [followState, setFollowState] = useState({}); // Track follow/unfollow state

    const followHandler = async (userId) => {
        try {
            const res = await axios.post(`https://mediagram-pn8o.onrender.com/api/v1/user/followorunfollow/${userId}`, {}, { withCredentials: true });
            if (res.data.success) {
                setFollowState((prevState) => ({
                    ...prevState,
                    [userId]: !prevState[userId], // Toggle follow state
                }));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update follow state.");
        }
    };

    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    const isFollowing = followState[user._id] || false;
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-blue-500 border-blue-500 hover:bg-blue-100"
                                onClick={() => followHandler(user._id)}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SuggestedUsers;