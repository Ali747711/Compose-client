import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobal";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Edit02Icon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  UserIcon,
  Mail01Icon,
  Call02Icon,
  Calendar03Icon,
  Camera01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import { AlertError, AlertSuccess } from "../../../libs/sweetAlert";
import UserService from "../../services/user.service";
import { Avatar } from "@heroui/react";
import { useSelector } from "react-redux";
import { retrieveUserDetails } from "./selector";
import { UserUpdateInput } from "../../../libs/data/types/user";

const UserDetails = () => {
  const navigate = useNavigate();
  const userDetails = useSelector(retrieveUserDetails);
  const { authUser, setAuthUser } = useGlobals();
  const [isEditing, setIsEditing] = useState(false);
  const [imageInput, setImageInput] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    userNick: userDetails?.userNick || authUser?.userNick || "",
    userEmail: userDetails?.userEmail || authUser?.userEmail || "",
    userPhone: userDetails?.userPhone || authUser?.userPhone || "",
    userBio: userDetails?.userBio || authUser?.userBio || "",
    userAddress: userDetails?.userAddresses || authUser?.userAddresses || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const signupForm = new FormData();
      signupForm.append("userNick", formData.userNick);
      signupForm.append("userBio", formData.userBio);
      signupForm.append("userEmail", formData.userEmail);
      signupForm.append("userPhone", formData.userPhone);
      if (imageInput) {
        signupForm.append("userImage", imageInput);
      }

      const userService = new UserService();
      const result = await userService.updateUser(
        signupForm as UserUpdateInput
      );
      setAuthUser(result);
      setIsEditing(false);
      AlertSuccess("User details successfully updated!");
      // Show success message
      console.log("User details updated:", authUser);
    } catch (error) {
      console.log("User Details Page, Edit User ERROR: ", error);
      AlertError(error);
    }
  };

  const handleCancel = () => {
    setFormData({
      userNick: authUser?.userNick || "",
      userEmail: authUser?.userEmail || "",
      userPhone: authUser?.userPhone || "",
      userBio: authUser?.userBio || "",
      userAddress: authUser?.userAddresses || "",
    });
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageInput(file);
      // TODO: Upload image to server
      const reader = new FileReader();
      reader.onloadend = () => {
        if (authUser) {
          setAuthUser({
            ...authUser,
            userImage: reader.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-white lg:bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/user")} className="p-1">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
          </button>
          <h1 className="text-xl font-bold text-main-text">Account Settings</h1>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-main hover:bg-main-dull text-main-text rounded-lg"
          >
            <HugeiconsIcon icon={Edit02Icon} size={20} />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
            <button
              onClick={handleSubmit}
              className="p-2 bg-main hover:bg-main-dull text-main-text rounded-lg"
            >
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 lg:p-8 max-w-4xl mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-main-text mb-1">
                Account Settings
              </h1>
              <p className="text-gray-500 text-sm">
                Manage your profile and account details
              </p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-main hover:bg-main-dull text-main-text font-semibold rounded-lg transition-all duration-200 border-2 border-main-dull"
              >
                <HugeiconsIcon icon={Edit02Icon} size={18} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 bg-main hover:bg-main-dull text-main-text font-semibold rounded-lg transition-all duration-200 border-2 border-main-dull"
                >
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-main to-main-dull rounded-full mt-3"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-main/20 via-main-dull/20 to-main/20"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between sm:items-end gap-4 -mt-16 sm:-mt-12">
              {/* Avatar */}
              <div className="relative group">
                {authUser?.userImage ? (
                  <img
                    src={authUser?.userImage}
                    alt={authUser?.userNick}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg flex items-center justify-center">
                    <Avatar
                      isBordered
                      color="warning"
                      src={authUser?.userImage}
                      size="lg"
                      className="w-28 h-28"
                    />
                  </div>
                )}
                {isEditing && (
                  <HugeiconsIcon
                    className="absolute right-0 bottom-2"
                    icon={Camera01Icon}
                    size={32}
                    fill="#fdd22c"
                  />
                )}
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Name and Email */}
              {authUser ? (
                <div className="flex-1 text-center sm:text-left sm:mt-8">
                  <h2 className="text-2xl font-bold text-main-text">
                    {authUser?.userNick || "User"}
                  </h2>
                  <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
                    <HugeiconsIcon icon={Mail01Icon} size={16} />
                    {authUser?.userEmail}
                  </p>
                </div>
              ) : (
                <div></div>
              )}

              {/* Stats */}
              <div className="flex gap-6 sm:gap-8 mt-4 sm:mt-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-main-text">24</p>
                  <p className="text-xs text-gray-500">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-main-text">
                    {formData?.userAddress?.length}
                  </p>
                  <p className="text-xs text-gray-500">Addresses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-main-text">8</p>
                  <p className="text-xs text-gray-500">Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-main-text mb-4 flex items-center gap-2">
            <HugeiconsIcon icon={UserIcon} size={20} color="#e3b609" />
            Personal Information
          </h3>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="userNick"
                  value={formData.userNick}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-main-text">
                  {authUser?.userNick || "Not provided"}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  name="userBio"
                  value={formData.userBio}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us about yourself"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-main-text">
                  {authUser?.userBio || "No bio added yet"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-main-text mb-4 flex items-center gap-2">
            <HugeiconsIcon icon={Call02Icon} size={20} color="#e3b609" />
            Contact Information
          </h3>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-main-text flex items-center gap-2">
                  <HugeiconsIcon icon={Mail01Icon} size={18} />
                  {authUser?.userEmail || "Not provided"}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 rounded-lg text-main-text flex items-center gap-2">
                  <HugeiconsIcon icon={Call02Icon} size={18} />
                  {authUser?.userPhone || "Not provided"}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-main-text mb-4">
            Account Security
          </h3>

          <div className="space-y-4">
            {/* Member Since */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-main/20 rounded-full flex items-center justify-center">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    size={20}
                    color="#e3b609"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-semibold text-main-text">
                    {authUser?.createdAt
                      ? new Date(authUser.createdAt).toLocaleDateString()
                      : "January 2024"}
                  </p>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-semibold text-main-text">Password</p>
                <p className="text-sm text-gray-500">••••••••</p>
              </div>
              <button className="text-main-dull hover:text-main-text font-semibold text-sm transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
