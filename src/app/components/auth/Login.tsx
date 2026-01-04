import { useRef, useState } from "react";
import type { UserInput, UserLoginInput } from "../../../libs/data/types/user";
import UserService from "../../services/user.service";
import { useGlobals } from "../../hooks/useGlobal";

interface LoginProps {
  setShowUserLogin: (input: boolean) => void;
}

const Login = (props: LoginProps) => {
  const { setShowUserLogin } = props;
  const [state, setState] = useState("login");
  const { setAuthUser } = useGlobals();

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
    if (file) {
      setProfileImage(file);

      // create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginInput: UserLoginInput = {
      userNick: formData.userNick,
      userPassword: formData.userPassword,
    };

    const userService = new UserService();
    const result = await userService.login(loginInput);
    setAuthUser(result);
    setFormData((prev) => ({ ...prev, userNick: "" }));
    setFormData((prev) => ({ ...prev, userPassword: "" }));
    setShowUserLogin(false);
  };
  const handleSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create FormData to send file + text fields
    const signupData: any = new FormData();
    signupData.append("userNick", formData.userNick);
    signupData.append("userPhone", formData.userPhone);
    signupData.append("userPassword", formData.userPassword);
    signupData.append("userEmail", formData.userEmail);
    if (profileImage) {
      signupData.append("userImage", profileImage);
    }
    // const loginInput: UserInput = {
    //   userNick: formData.userNick,
    //   userPhone: formData.userPhone,
    //   userPassword: formData.userPassword,
    //   userEmail: formData.userEmail,
    // };

    const userService = new UserService();
    const result = await userService.signup(signupData);
    setAuthUser(result);
    setFormData({
      userEmail: "",
      userNick: "",
      userPassword: "",
      userPhone: "",
    });
    setShowUserLogin(false);
    setImagePreview(null);
    setShowUserLogin(false);
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 right-0 left-0 z-30 flex items-center text-sm text-main-text"
    >
      <form
        onSubmit={state === "login" ? handleSubmitLogin : handleSubmitSignup}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start sm:w-87.5 w-80 shadow-xl   bg-white/6 border border-white/10 rounded-2xl px-8 "
      >
        <h1 className="text-white text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>
        {/* Profile Image Upload - Only in Signup */}
        {state !== "login" && (
          <div className="mt-6 w-full flex justify-center">
            <div className="relative">
              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />

              {/* Clickable preview or placeholder */}
              <div
                onClick={handleImageClick}
                className="w-24 h-24 rounded-full border-4 border-dashed border-white/30 cursor-pointer overflow-hidden bg-white/10 hover:border-main-text transition-all"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/50"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Optional: Small text below */}
              <p className="text-xs text-gray-400 text-center mt-2">
                Click to upload
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-main-text h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white/60"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <circle
              cx="12"
              cy="8"
              r="5"
            /> <path d="M20 21a8 8 0 0 0-16 0" />{" "}
          </svg>
          <input
            type="text"
            name="userNick"
            placeholder="User Nick"
            className="w-full bg-transparent text-main-text placeholder-white/60 border-none outline-none "
            value={formData.userNick}
            onChange={handleChange}
            required
          />
        </div>

        {state !== "login" && (
          <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-main-text h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white/75"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />{" "}
              <rect x="2" y="4" width="20" height="16" rx="2" />{" "}
            </svg>
            <input
              type="text"
              name="userPhone"
              placeholder="Phone number"
              className="w-full bg-transparent text-main-text placeholder-white/60 border-none outline-none "
              value={formData.userPhone}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {state !== "login" && (
          <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-main-text h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white/75"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />{" "}
              <rect x="2" y="4" width="20" height="16" rx="2" />{" "}
            </svg>
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              className="w-full bg-transparent text-main-text placeholder-white/60 border-none outline-none "
              value={formData.userEmail}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className=" flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-main-text h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-white/75"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />{" "}
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />{" "}
          </svg>
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            className="w-full bg-transparent text-main-text placeholder-white/60 border-none outline-none"
            value={formData.userPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4 text-left">
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
      <div className="fixed inset-0 -z-1 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default Login;
