export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <h1 className="text-3xl font-bold text-green-800">Welcome to the Home Page!</h1>

      <div className="mt-6 text-center text-sm text-gray-600">
      Already have an account?
      <a href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
        Login
      </a>
      </div>
    </div>
  );
}
