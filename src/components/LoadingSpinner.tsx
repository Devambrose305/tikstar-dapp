export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative">
        {/* Outer Ring */}
        <div className="h-32 w-32 rounded-full border-t-2 border-b-2 border-brand-cyan animate-spin"></div>
        {/* Inner Ring */}
        <div className="h-32 w-32 rounded-full border-t-2 border-b-2 border-brand-pink animate-spin absolute inset-0" 
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        ></div>
        {/* Center Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 bg-white rounded-full animate-pulse"></div>
        </div>
        {/* Loading Text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm">
          Loading...
        </div>
      </div>
    </div>
  );
} 