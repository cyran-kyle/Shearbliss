import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

type RatingProps = {
  rating: number;
  totalStars?: number;
  className?: string;
  starClassName?: string;
};

export function Rating({
  rating,
  totalStars = 5,
  className,
  starClassName,
}: RatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(totalStars)].map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={`full-${i}`}
              className={cn('h-4 w-4 text-primary fill-primary', starClassName)}
            />
          );
        }
        if (i === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key="half"
              className={cn('h-4 w-4 text-primary fill-primary', starClassName)}
            />
          );
        }
        return (
          <Star
            key={`empty-${i}`}
            className={cn('h-4 w-4 text-muted-foreground/50', starClassName)}
          />
        );
      })}
    </div>
  );
}
