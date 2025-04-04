import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { motion } from "framer-motion";
import { AtSign, AlertCircle, ArrowLeft, Send } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success state
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset request failed:", error);
      setError("Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950">
      {/* Modern social platform background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-400/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-400/10 via-transparent to-transparent"></div>

      {/* Connection lines - social network concept */}
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

      {/* Floating elements representing social connections - responsive sizes */}
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
          {/* Logo - responsive size */}
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

          {/* Card - responsive padding and sizing */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/30 overflow-hidden border border-white/10">
            {/* Header - responsive text sizes and padding */}
            <div className="px-5 sm:px-6 md:px-8 pt-6 sm:pt-7 md:pt-8 pb-3 sm:pb-4">
              <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white text-center">
                {isSubmitted ? "Kiểm tra email của bạn" : "Đặt lại mật khẩu"}
              </h1>
              <p className="mt-1 sm:mt-2 text-center text-sm sm:text-base text-gray-300">
                {isSubmitted
                  ? "Chúng tôi đã gửi cho bạn hướng dẫn để đặt lại mật khẩu"
                  : "Nhập email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu"}
              </p>
            </div>

            {/* Form - responsive spacing */}
            <div className="p-5 sm:p-6 md:p-8">
              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5 md:space-y-6"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Email Input */}
                    <div>
                      <div className="group relative">
                        <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <AtSign
                            size={16}
                            className="sm:w-[18px] sm:h-[18px]"
                          />
                        </div>
                        <Input
                          id="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                          placeholder="Email"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          className="h-10 sm:h-11 md:h-12 pl-10 sm:pl-12 pr-4 sm:pr-5 w-full bg-white/5 border-0 rounded-lg sm:rounded-xl text-gray-100 text-sm sm:text-base placeholder:text-gray-400 transition-all duration-300 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-400"
                        />
                      </div>
                      {error && (
                        <p className="text-red-400 text-xs flex items-center mt-1 sm:mt-2 pl-2">
                          <AlertCircle
                            size={10}
                            className="sm:w-3 sm:h-3 mr-1"
                          />{" "}
                          {error}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Reset Password Button - responsive height */}
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
                          {isSubmitting
                            ? "Đang gửi..."
                            : "Gửi liên kết đặt lại"}
                        </span>
                        {!isSubmitting && (
                          <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {/* Success animation */}
                  <div className="flex justify-center py-4 sm:py-6">
                    <div className="relative">
                      <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-500/20 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1,
                          }}
                          className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center"
                        >
                          <motion.svg
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white"
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
                          </motion.svg>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Additional instructions */}
                  <div className="text-center text-sm sm:text-base text-gray-300 space-y-2 sm:space-y-3">
                    <p>Nếu bạn không thấy email, kiểm tra thư rác của bạn.</p>
                    <p>
                      Nếu bạn vẫn cần trợ giúp, vui lòng{" "}
                      <a
                        href="#"
                        className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                      >
                        liên hệ hỗ trợ
                      </a>
                      .
                    </p>
                  </div>

                  {/* Return to sign in button */}
                  <div className="pt-2 sm:pt-3">
                    <Link to={ROUTES.AUTH.SIGN_IN} className="block w-full">
                      <button className="relative cursor-pointer hover:opacity-80 w-full h-10 sm:h-11 md:h-12 bg-white/5 hover:bg-white/10 text-white rounded-lg sm:rounded-xl font-medium text-sm sm:text-base overflow-hidden transition-all duration-300 border border-white/10">
                        <span className="relative z-10 flex items-center justify-center">
                          <ArrowLeft
                            size={16}
                            className="sm:w-[18px] sm:h-[18px] mr-2"
                          />
                          <span>Trở lại đăng nhập</span>
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sign In Link - responsive text size */}
            {!isSubmitted && (
              <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8 text-center">
                <p className="text-xs sm:text-sm text-gray-300">
                  Nhớ mật khẩu của bạn?{" "}
                  <Link
                    to={ROUTES.AUTH.SIGN_IN}
                    className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            )}
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

export default ForgotPassword;
