import React from 'react';
import Feed from './Feed';
import RightSidebar from './RightSidebar';

const Home = () => {
  return (
    <div className="flex justify-center bg-gray-50 min-h-screen">
      {/* Feed */}
      <div className="w-[60%] bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <Feed />
      </div>

      {/* Right Sidebar */}
      <div className="w-[20%] ml-8">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;