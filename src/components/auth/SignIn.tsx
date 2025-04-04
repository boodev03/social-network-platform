/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { login } from "@/services/user";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";

const SignIn = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.username.trim()) {
      newErrors.username = "Vui lòng nhập tên đăng nhập";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const response = await login(formData.username, formData.password);
      authLogin({
        id: response.data.id,
        username: response.data.username,
        email: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      toast.success("Đăng nhập thành công!");
      navigate(ROUTES.HOME);
    } catch (error: any) {
      console.error("Đăng nhập thất bại:", error);
      toast.error(error.message || "Đăng nhập thất bại");
      setApiError(
        error.message || "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950">
      {/* Các phần tử nền của nền tảng xã hội hiện đại */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-400/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-400/10 via-transparent to-transparent"></div>

      {/* Đường kết nối - khái niệm mạng xã hội */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 100 0 L 0 100"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M 0 0 L 100 100"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Các phần tử nổi đại diện cho kết nối xã hội - kích thước responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-32 sm:w-48 md:w-64 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 sm:w-48 md:w-64 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 md:w-96 rounded-full bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 blur-3xl"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-6 sm:py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[90%] sm:max-w-[400px] md:max-w-md"
        >
          {/* Logo - kích thước responsive */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/10">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
              >
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                />
              </svg>
            </div>
          </div>

          {/* Card - padding và kích thước responsive */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/30 overflow-hidden border border-white/10">
            {/* Header - kích thước text và padding responsive */}
            <div className="px-5 sm:px-6 md:px-8 pt-6 sm:pt-7 md:pt-8 pb-3 sm:pb-4">
              <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white text-center">
                Chào mừng trở lại
              </h1>
              <p className="mt-1 sm:mt-2 text-center text-sm sm:text-base text-gray-300">
                Đăng nhập để kết nối với mạng lưới của bạn
              </p>
            </div>

            {/* Form - khoảng cách responsive */}
            <div className="p-5 sm:p-6 md:p-8">
              <form
                className="space-y-4 sm:space-y-5 md:space-y-6"
                onSubmit={handleSubmit}
              >
                {apiError && (
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                    <p className="text-red-400 text-sm flex items-center">
                      <AlertCircle size={14} className="mr-2" /> {apiError}
                    </p>
                  </div>
                )}

                <div className="space-y-3 sm:space-y-4">
                  {/* Input Username */}
                  <div>
                    <div className="group relative">
                      <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Email hoặc tên đăng nhập"
                        className="h-10 sm:h-11 md:h-12 px-4 sm:px-5 w-full bg-white/5 border-0 rounded-lg sm:rounded-xl text-gray-100 text-sm sm:text-base placeholder:text-gray-400 transition-all duration-300 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-400"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-400 text-xs flex items-center mt-1 sm:mt-2 pl-2">
                        <AlertCircle size={10} className="sm:w-3 sm:h-3 mr-1" />
                        {errors.username}
                      </p>
                    )}
                  </div>

                  {/* Input Mật khẩu */}
                  <div>
                    <div className="group relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Mật khẩu"
                        className="h-10 sm:h-11 md:h-12 px-4 sm:px-5 w-full bg-white/5 border-0 rounded-lg sm:rounded-xl text-gray-100 text-sm sm:text-base placeholder:text-gray-400 transition-all duration-300 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-xs flex items-center mt-1 sm:mt-2 pl-2">
                        <AlertCircle size={10} className="sm:w-3 sm:h-3 mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* Ghi nhớ đăng nhập và Quên mật khẩu - layout responsive */}
                {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-center">
                    <div className="relative h-4 w-4 sm:h-5 sm:w-5">
                      <input
                        type="checkbox"
                        id="remember"
                        className="peer h-4 w-4 sm:h-5 sm:w-5 rounded border-2 border-white/20 text-indigo-500 focus:ring-0 focus:ring-offset-0 appearance-none checked:bg-indigo-500 checked:border-indigo-500 transition-all duration-200"
                      />
                      <svg
                        className="absolute pointer-events-none inset-0 h-4 w-4 sm:h-5 sm:w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-2 text-xs sm:text-sm text-gray-300"
                    >
                      Lưu tên đăng nhập
                    </label>
                  </div>
                  <Link
                    to={ROUTES.AUTH.FORGOT_PASSWORD}
                    className="text-xs sm:text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                  >
                    Quên mật khẩu?
                  </Link>
                </div> */}

                {/* Main Sign In Button - responsive height */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative cursor-pointer hover:opacity-80 w-full h-10 sm:h-11 md:h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base overflow-hidden transition-all duration-300"
                  >
                    {/* Background gradient */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600"></span>

                    {/* Button text and icon */}
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="mr-2">
                        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                      </span>
                      {!isSubmitting && (
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                </div>

                {/* Divider - responsive spacing */}
                <div className="relative my-5 sm:my-6 md:my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full bg-gradient-to-r from-transparent via-white/10 to-transparent h-px"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 sm:px-5 md:px-6 py-1 sm:py-2 bg-white/5 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium text-gray-300 border border-white/10 shadow-sm flex items-center gap-1 sm:gap-2 transition-all duration-300 hover:shadow-md hover:border-indigo-500/30 hover:bg-white/10 group relative overflow-hidden">
                      {/* Animated background glow on hover */}
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></span>
                      {/* Text content with gradient */}
                      <span className="relative z-10 flex items-center gap-1 sm:gap-2 cursor-default">
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300">
                          Hoặc
                        </span>
                        <span className="group-hover:text-white transition-colors duration-300">
                          Tiếp tục với
                        </span>
                      </span>
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons - responsive sizing */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  {[
                    {
                      name: "Google",
                      icon: (
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      ),
                    },
                    {
                      name: "Apple",
                      icon: (
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                        </svg>
                      ),
                    },
                    {
                      name: "GitHub",
                      icon: (
                        <svg
                          className="h-4 w-4 sm:h-5 sm:w-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      ),
                    },
                  ].map((provider, index) => (
                    <button
                      key={index}
                      type="button"
                      className="h-9 sm:h-10 md:h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-md hover:shadow-black/20"
                      aria-label={`Sign in with ${provider.name}`}
                    >
                      {provider.icon}
                    </button>
                  ))}
                </div>
              </form>
            </div>

            {/* Sign Up Link - responsive text size */}
            <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 text-center">
              <p className="text-xs sm:text-sm text-gray-300">
                Không có tài khoản?{" "}
                <Link
                  to={ROUTES.AUTH.SIGN_UP}
                  className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                >
                  Tạo tài khoản
                </Link>
              </p>
            </div>
          </div>

          {/* Footer - responsive spacing and text size */}
          <div className="mt-5 sm:mt-6 md:mt-8 text-center">
            <div className="flex justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              {["Điều khoản", "Quyền riêng tư", "Cookie"].map((item, index) => (
                <Link
                  key={index}
                  to="#"
                  className="hover:text-white transition-colors duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
