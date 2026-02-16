import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  StarIcon,
  Mail01Icon,
  SmartPhone01Icon,
  Calendar03Icon,
  UserAccountIcon,
} from "@hugeicons/core-free-icons";
import type { User } from "../../../libs/data/types/user";
import UserService from "../../services/user.service";
import { AlertError } from "../../../libs/sweetAlert";

const MemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const userService = new UserService();
        const data = await userService.getMember(id);
        setMember(data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error("Error fetching member:", error);
        setError(error?.message || "Failed to load member profile");
        AlertError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-main mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-50 text-red-600 p-6 rounded-xl mb-4">
            <h2 className="text-xl font-bold mb-2">Error Loading Profile</h2>
            <p>{error}</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-main hover:bg-main-dull text-main-text font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Not found
  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-gray-100 p-6 rounded-xl mb-4">
            <h2 className="text-xl font-bold text-main-text mb-2">
              Member Not Found
            </h2>
            <p className="text-gray-600">
              The member you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="bg-main hover:bg-main-dull text-main-text font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Mobile Back Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-main-text transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Breadcrumb - Desktop */}
      <nav className="hidden lg:block text-sm text-gray-500 mb-8">
        <Link className="hover:text-gray-700 cursor-pointer" to="/">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-main-text font-medium">{member.userNick}</span>
      </nav>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Cover / Header Banner */}
        <div className="h-32 md:h-44 bg-gradient-to-r from-main/80 via-main to-main-dull relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCAxLjkgNCA0LTIgNC00IDQtNC0yLTQtNHptMC0yNGMwLTIgMi00IDQtNHM0IDEuOSA0IDQtMiA0LTQgNC00LTItNC00em0tMjQgMjRjMC0yIDItNCA0LTRzNCAxLjkgNCA0LTIgNC00IDQtNC0yLTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        </div>

        {/* Avatar + Info */}
        <div className="px-6 md:px-10 pb-8">
          {/* Avatar */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-14 md:-mt-16">
            <div className="relative">
              <img
                src={member.userImage || "/default-avatar.png"}
                alt={member.userNick}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white"
              />
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-3 border-white rounded-full"></div>
            </div>

            <div className="sm:pb-2 flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-main-text">
                {member.userNick}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 bg-main/15 text-main-text px-3 py-1 rounded-full">
                  <HugeiconsIcon icon={StarIcon} size={14} color="#e3b609" />
                  <span className="text-sm font-semibold">
                    {member.userPoints?.toLocaleString() || 0} points
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {member.userBio && (
            <div className="mt-6">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {member.userBio}
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Username */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-main/15 rounded-full flex items-center justify-center flex-shrink-0">
                <HugeiconsIcon
                  icon={UserAccountIcon}
                  size={18}
                  color="#e3b609"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500">Username</p>
                <p className="text-sm font-semibold text-main-text">
                  {member.userNick}
                </p>
              </div>
            </div>

            {/* Email */}
            {member.userEmail && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-main/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    size={18}
                    color="#e3b609"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-semibold text-main-text">
                    {member.userEmail}
                  </p>
                </div>
              </div>
            )}

            {/* Phone */}
            {member.userPhone && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-main/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <HugeiconsIcon
                    icon={SmartPhone01Icon}
                    size={18}
                    color="#e3b609"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-semibold text-main-text">
                    {member.userPhone}
                  </p>
                </div>
              </div>
            )}

            {/* Member Since */}
            {member.createdAt && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-main/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    size={18}
                    color="#e3b609"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-sm font-semibold text-main-text">
                    {formatDate(member.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Points Badge Section */}
          <div className="mt-8 bg-gradient-to-r from-main/10 to-main-dull/10 rounded-2xl p-6 border border-main/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-main-text">
                  Loyalty Points
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Earned through orders and activity
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={StarIcon} size={24} color="#e3b609" />
                  <span className="text-3xl font-bold text-main-text">
                    {member.userPoints?.toLocaleString() || 0}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Total Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
