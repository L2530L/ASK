import { AuthButton } from "@/components/auth-button";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Simple Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              My App
            </h1>
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            ASK
          </h1>
          
          {user ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Hello, {user.email}!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You are successfully logged in. This is your dashboard area.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  User ID: {user.id}
                </p>
                <a
                  href="/protected"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Go to Protected Page
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Get Started
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sign up or log in to access your personalized dashboard.
              </p>
              <div className="space-x-4">
                <a
                  href="/auth/sign-up"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Sign Up
                </a>
                <a
                  href="/auth/login"
                  className="inline-block bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Log In
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Simple Feature Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🔐 Authentication
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Secure user login and registration with Supabase
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🎨 Clean Design
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Simple, responsive design with Tailwind CSS
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🚀 Ready to Build
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Start adding your own features and pages
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
