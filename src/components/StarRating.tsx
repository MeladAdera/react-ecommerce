// src/components/StarRating.tsx
interface StarRatingProps {
    rating: number;
    onRate?: (rating: number) => void;
    interactive?: boolean;
    darkMode?: boolean; 
  }
  
  export default function StarRating({ 
    rating, 
    onRate, 
    interactive = false 
  }: StarRatingProps) {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate?.(star)}
            disabled={!interactive}
            className={`text-xl ${star <= rating ? 'text-yellow-500 animate-bounce' : 'text-gray-500'} ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            } transition-transform duration-100`}
          >
            {star <= rating ? '★' : '☆'}
          </button>
        ))}
      </div>
    );
  }