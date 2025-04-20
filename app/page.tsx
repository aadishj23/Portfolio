export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Portfolio Website</h1>
      <p className="text-lg text-gray-600">Coming Soon!</p>
      <footer className="mt-16 text-sm text-gray-500">
        <p>Stay tuned for updates.</p>
        <p>
          Follow me on <a href="https://github.com/aadishj23" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a> or <a href="https://www.linkedin.com/in/aadishj23/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
        </p>
      </footer>
    </div>
  );
}