export default function NotFound(){
  return (
    <div className='bg-gradient-to-r bg-gradient-to-r from-red-100 via-red-300 to-red-500 min-h-screen'>
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h1 className="text-6xl font-bold">Error 404: Page Not Found</h1>
        <p className="text-2xl mt-4">The requested page does not exist.</p>
      </div>
    </div>
  );
};

