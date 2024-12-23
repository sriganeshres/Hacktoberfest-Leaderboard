import React, { useState, useEffect } from "react";
import { useUserList } from "../hooks/useUserList";

const LeaderboardNoAuth = () => {
  const { users, isLoading } = useUserList();
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Sort users by AcceptedHacktoberFestPRs in descending order
  const sortedUsers = [...users].sort(
    (a, b) => b.AcceptedHacktoberFestPRs - a.AcceptedHacktoberFestPRs
  );

  // Determine users for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedUsers.length);
  const visibleUsers = sortedUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Reset to page 1 if users data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  return (
    <div className="height-[95vh]">
      <h1 className="font-semibold text-center text-[#3b82f6] text-4xl pt-10 pb-2">
        BugBounty Leaderboard
      </h1>
      <h3 className="text-xl font-semibold text-center pb-4 text-[#3b82f6]">Devlup Labs</h3>
      <div className="overflow-auto rounded-lg">
        {isLoading ? (
          <p className="p-4 text-center text-white">Loading...</p>
        ) : (
          <>
            {/* Desktop View */}
            <div className="max-[587px]:hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Username
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Contributions
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Accepted Contributions
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                      Updated At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleUsers.map((user) => (
                    <tr key={user.username} className="bg-white">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.username}</td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.HacktoberFestContributions}</td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.AcceptedHacktoberFestPRs}</td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="min-[587px]:hidden grid grid-cols-1 gap-4">
              {visibleUsers.map((user) => (
                <div className="bg-white p-4 rounded-lg shadow" key={user.username}>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="bg-green-200 rounded-lg p-1">{user.username}</div>
                    <div className="bg-red-200 rounded-lg p-1">{user.HacktoberFestContributions}</div>
                    <div className="bg-orange-200 rounded-lg p-1">{user.AcceptedHacktoberFestPRs}</div>
                    <div className="bg-purple-200 rounded-lg p-1">{user.updatedAt}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex flex-col items-center">
              <nav className="pagination flex justify-center">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`${currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                      } px-3 py-2 rounded-md cursor-pointer mx-1`}
                  >
                    {index + 1}
                  </button>
                ))}
              </nav>

              <div className="mt-2 text-sm text-center">
                Showing {startIndex + 1} to {endIndex} of {sortedUsers.length}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderboardNoAuth;
