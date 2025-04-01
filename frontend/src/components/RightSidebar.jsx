import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        <Link to={`/profile/${user?._id}`}>
          <Avatar className="w-12 h-12">
            <AvatarImage src={user?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="text-lg font-bold"><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
          <p className="text-gray-600 text-sm">{user?.bio || 'Bio here...'}</p>
        </div>
      </div>

      {/* Suggested Users */}
      <h2 className="text-lg font-bold mb-4">Suggested for you</h2>
      <SuggestedUsers/>
    </div>
  )
}

export default RightSidebar