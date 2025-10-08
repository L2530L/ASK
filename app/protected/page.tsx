import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Simple Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Protected Area
            </h1>
            <a
              href="/"
              className="text-blue-500 hover:text-blue-600 text-sm font-medium"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Protected Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">🔒</span>
            <p className="text-green-800 dark:text-green-200 text-sm font-medium">
              This is a protected page - only authenticated users can see this!
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to Your Dashboard
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Your Profile Information
              </h2>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{user.email}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">User ID:</span>
                  <span className="ml-2 text-gray-900 dark:text-white font-mono text-xs">{user.id}</span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Last Sign In:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                What You Can Do Here
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    🎯 Add Your Features
                  </h3>
                  <p className="text-blue-700 dark:text-blue-200 text-sm">
                    This is where you can start building your app's main functionality
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">
                    🗄️ Database Access
                  </h3>
                  <p className="text-purple-700 dark:text-purple-200 text-sm">
                    Your Supabase database is ready for storing user data
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <form action="/auth/sign-out" method="post">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
