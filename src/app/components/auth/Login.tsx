import { useRef, useState } from "react";
import type { UserLoginInput } from "../../../libs/data/types/user";
import UserService from "../../services/user.service";
import { useGlobals } from "../../hooks/useGlobal";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserCircleIcon,
  PhoneCheckIcon,
  MailReceive02Icon,
  CirclePasswordIcon,
  ScanImageIcon,
} from "@hugeicons/core-free-icons";
import { AlertError, AlertSuccess } from "../../../libs/sweetAlert";

const Login = () => {
  const [state, setState] = useState("login");
  const { setAuthUser, setShowUserLogin } = useGlobals();

  // Add profile image state
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    userNick: "",
    userPhone: "",
    userPassword: "",
    userEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Target print: ", e.target.files);
    if (file) {
      setProfileImage(file);

      // create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      console.log("Reader URL: ", reader.result as string);
    }
  };

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const loginInput: UserLoginInput = {
        userNick: formData.userNick.trim(),
        userPassword: formData.userPassword,
      };
      const userService = new UserService();
      await userService.login(loginInput);
      const user = await userService.getUserDetails();
      setAuthUser(user);
      setFormData((prev) => ({ ...prev, userNick: "" }));
      setFormData((prev) => ({ ...prev, userPassword: "" }));
      setShowUserLogin(false);
      AlertSuccess("Login Successfull!");
    } catch (error) {
      console.log("Login page, Error: ", error);
      AlertError(error);
    }
  };
  const handleSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      // Create FormData to send file + text fields
      const signupData: any = new FormData();
      signupData.append("userNick", formData.userNick.trim());
      signupData.append("userPhone", formData.userPhone);
      signupData.append("userPassword", formData.userPassword);
      signupData.append("userEmail", formData.userEmail);
      if (profileImage) {
        signupData.append("userImage", profileImage);
      }
      console.log("SIGNUP data: ", signupData);
      const userService = new UserService();
      const result = await userService.signup(signupData);
      setAuthUser(result);
      setFormData({
        userEmail: "",
        userNick: "",
        userPassword: "",
        userPhone: "",
      });
      setImagePreview(null);
      setShowUserLogin(false);
      AlertSuccess("Sign-up Successfull!");
    } catch (error) {
      AlertError(error);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 right-0 left-0 z-30 flex items-center text-sm text-main-text"
    >
      <form
        onSubmit={state === "login" ? handleSubmitLogin : handleSubmitSignup}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start sm:w-87.5 w-80 shadow-xl   bg-white border border-white/10 rounded-2xl px-8 "
      >
        <h1 className="text-main-text text-3xl mt-5 font-medium">
          <span className="text-main">User</span>
          {state === "login" ? " Login" : " Sign up"}
        </h1>

        <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>
        {/* Profile Image Upload - Only in Signup */}
        {state !== "login" && (
          <div className="mt-3 w-full flex justify-center ">
            <div className="relative flex flex-col justify-center items-center">
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden "
              />

              {/* Clickable preview or placeholder */}
              <div
                onClick={handleImageClick}
                className=" w-20 h-20 rounded-full border-4 border-dashed border-border cursor-pointer overflow-hidden bg-white/10 hover:border-main-text transition-all "
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <HugeiconsIcon
                      icon={ScanImageIcon}
                      color="#c4c6d4"
                      size={32}
                    />
                  </div>
                )}
              </div>

              {/* Optional: Small text below */}
              <p className="text-xs text-gray-400 text-center mt-2">
                Click to upload <br /> (jpeg | jpg | png | webp | gif)
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center mt-3 w-full border-2  border-border focus-within:border-main-text h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <HugeiconsIcon icon={UserCircleIcon} size={18} color="#c4c6d4" />
          <input
            type="text"
            name="userNick"
            placeholder="User Nick"
            className="w-full bg-transparent text-main-text placeholder-border  outline-none "
            value={formData.userNick}
            onChange={handleChange}
            required
          />
        </div>

        {state !== "login" && (
          <div className="flex items-center w-full mt-4 bg-white/5 border-2  border-border focus-within:border-main-text h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <HugeiconsIcon icon={PhoneCheckIcon} color="#c4c6d4" size={18} />
            <input
              type="text"
              name="userPhone"
              placeholder="Phone number"
              className="w-full bg-transparent text-main-text placeholder-border outline-none "
              value={formData.userPhone}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {state !== "login" && (
          <div className="flex items-center w-full mt-4 bg-white/5 border-2  border-border focus-within:border-main-text h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <HugeiconsIcon icon={MailReceive02Icon} color="#c4c6d4" size={18} />
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              className="w-full bg-transparent text-main-text placeholder-border outline-none "
              value={formData.userEmail}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className=" flex items-center mt-4 w-full bg-white/5 border-2  border-border focus-within:border-main-text h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <HugeiconsIcon icon={CirclePasswordIcon} size={18} color="#c4c6d4" />
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            className="w-full bg-transparent text-main-text placeholder-border outline-none"
            value={formData.userPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-0 text-left">
          <button className="text-sm text-main-text hover:underline">
            Forget password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-main-text bg-main hover:bg-main-dull transition "
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-main-text hover:underline ml-1">
            click here
          </span>
        </p>
      </form>
      {/* Soft Backdrop*/}
      {/* <div className="fixed inset-0 -z-1 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl" />
      </div> */}
    </div>
  );
};

export default Login;
