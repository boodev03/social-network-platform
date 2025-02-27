import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SignIn = () => {
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

      {/* Floating elements representing social connections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 blur-3xl"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/10">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-white">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                />
              </svg>
            </div>
          </div>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 overflow-hidden border border-white/10">
            {/* Header */}
            <div className="px-8 pt-8 pb-4">
              <h1 className="text-3xl font-bold text-white text-center">
                Welcome back
              </h1>
              <p className="mt-2 text-center text-gray-300">
                Sign in to connect with your network
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form className="space-y-6">
                <div className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <div className="group relative">
                      <Input
                        type="email"
                        placeholder="Email or username"
                        className="h-12 px-5 w-full bg-white/5 border-0 rounded-xl text-gray-100 text-base placeholder:text-gray-400 transition-all duration-300 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-400"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="group relative">
                      <Input
                        type="password"
                        placeholder="Password"
                        className="h-12 px-5 w-full bg-white/5 border-0 rounded-xl text-gray-100 text-base placeholder:text-gray-400 transition-all duration-300 focus-visible:ring-indigo-500 focus-visible:ring-offset-0 focus-visible:border-indigo-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative h-5 w-5">
                      <input
                        type="checkbox"
                        id="remember"
                        className="peer h-5 w-5 rounded border-2 border-white/20 text-indigo-500 focus:ring-0 focus:ring-offset-0 appearance-none checked:bg-indigo-500 checked:border-indigo-500 transition-all duration-200"
                      />
                      <svg
                        className="absolute pointer-events-none inset-0 h-5 w-5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
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
                      className="ml-2 text-sm text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Main Sign In Button */}
                <div>
                  <Link to={ROUTES.HOME} className="block w-full">
                    <button className="relative cursor-pointer hover:opacity-80 w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium text-base overflow-hidden transition-all duration-300">
                      {/* Background gradient */}
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600"></span>

                      {/* Button text and icon */}
                      <span className="relative z-10 flex items-center justify-center">
                        <span className="mr-2">Sign in</span>
                        <svg
                          className="h-5 w-5"
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
                      </span>
                    </button>
                  </Link>
                </div>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full bg-gradient-to-r from-transparent via-white/10 to-transparent h-px"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-6 py-2 bg-white/5 backdrop-blur-md rounded-full text-sm font-medium text-gray-300 border border-white/10 shadow-sm flex items-center gap-2 transition-all duration-300 hover:shadow-md hover:border-indigo-500/30 hover:bg-white/10 group relative overflow-hidden">
                      {/* Animated background glow on hover */}
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></span>
                      {/* Text content with gradient */}
                      <span className="relative z-10 flex items-center gap-2 cursor-default">
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300">
                          Or
                        </span>
                        <span className="group-hover:text-white transition-colors duration-300">
                          continue with
                        </span>
                      </span>
                    </span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      name: "Google",
                      icon: (
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
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
                          className="h-5 w-5 text-white"
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
                          className="h-5 w-5 text-white"
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
                      className="h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-md hover:shadow-black/20"
                      aria-label={`Sign in with ${provider.name}`}
                    >
                      {provider.icon}
                    </button>
                  ))}
                </div>
              </form>
            </div>

            {/* Sign Up Link */}
            <div className="px-8 pb-8 text-center">
              <p className="text-gray-300">
                Don't have an account?{" "}
                <Link
                  to={ROUTES.AUTH.SIGN_UP}
                  className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              {["Terms", "Privacy", "Cookies"].map((item, index) => (
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
