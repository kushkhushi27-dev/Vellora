import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 1 to 10
  max?: number;
  readOnly?: boolean;
  onChange?: (val: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  readOnly = true,
  onChange,
  size = 'md',
  showNumber = true,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // 10-point scale represented with 5 stars where each star represents 2 points,
  // or 10 visual stars for exact 10-point precision!
  // In Vellora, a 10-point scale with 0.5 increments is standard. Let's render 10 star slots or interactive half-stars.
  const displayVal = hoverRating !== null ? hoverRating : rating;

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="inline-flex items-center gap-2">
      <div className="flex items-center gap-0.5" onMouseLeave={() => !readOnly && setHoverRating(null)}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starValue) => {
          const filled = displayVal >= starValue;
          const half = !filled && displayVal >= starValue - 0.5;

          return (
            <button
              key={starValue}
              type="button"
              disabled={readOnly}
              onClick={() => onChange && onChange(starValue)}
              onMouseEnter={() => !readOnly && setHoverRating(starValue)}
              className={`relative transition-transform ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-125'}`}
            >
              <Star
                className={`${starSizes[size]} transition-colors ${
                  filled
                    ? 'fill-vellora-gold text-vellora-gold'
                    : half
                    ? 'fill-vellora-gold/50 text-vellora-gold'
                    : 'text-gray-600 hover:text-gray-400'
                }`}
              />
            </button>
          );
        })}
      </div>
      {showNumber && (
        <span className="font-heading text-xs font-bold text-vellora-gold px-1.5 py-0.5 rounded bg-vellora-gold/10 border border-vellora-gold/20">
          {displayVal.toFixed(1)}/10
        </span>
      )}
    </div>
  );
};

