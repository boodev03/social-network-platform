import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="p-4 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Threads</div>
          <div className="space-x-4">
            <Link to={ROUTES.AUTH.SIGN_IN}>
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to={ROUTES.AUTH.SIGN_UP}>
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Welcome to Threads
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the conversation. Share your thoughts. Connect with others.
              Experience a new way of social networking.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link to={ROUTES.AUTH.SIGN_UP}>
                <Button size="lg" className="text-lg px-8">
                  Get Started
                </Button>
              </Link>
              <Link to={ROUTES.AUTH.SIGN_IN}>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <div className="text-2xl mb-4">🌐</div>
              <h3 className="text-lg font-semibold">Connect Globally</h3>
              <p className="mt-2 text-muted-foreground">
                Join a worldwide community and share your perspective
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-2xl mb-4">💬</div>
              <h3 className="text-lg font-semibold">Meaningful Discussions</h3>
              <p className="mt-2 text-muted-foreground">
                Engage in conversations that matter to you
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <div className="text-2xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold">Secure & Private</h3>
              <p className="mt-2 text-muted-foreground">
                Your privacy and security are our top priorities
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Threads. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
