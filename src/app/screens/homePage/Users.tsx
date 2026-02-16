import { useSelector } from "react-redux";
import { retrieveTopUsers } from "./selector";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";
import { useNavigate } from "react-router-dom";
import type { User } from "../../../libs/data/types/user";

const Users = () => {
  const topUsers = useSelector(retrieveTopUsers);
  const navigate = useNavigate();

  if (!topUsers || topUsers.length === 0) {
    return null;
  }

  return (
    <section className="w-full mt-16">
      <div className=" mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-main-text mb-2">
            Top Members
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full"></div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {topUsers.slice(0, 12).map((user: User) => (
            <div
              key={user._id}
              onClick={() => navigate(`/member/${user._id}`)}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-main hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-3">
                <img
                  src={user.userImage || "/default-avatar.png"}
                  alt={user.userNick}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 group-hover:border-main transition-all"
                />
              </div>

              {/* User Info */}
              <div className="text-center">
                <h3 className="text-sm font-semibold text-main-text mb-1 truncate">
                  {user.userNick}
                </h3>

                {/* Points */}
                <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                  <HugeiconsIcon icon={StarIcon} size={12} color="#e3b609" />
                  <span>{user.userPoints?.toLocaleString() || 0} pts</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Users;
