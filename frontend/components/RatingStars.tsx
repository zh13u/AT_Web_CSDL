import { Star, StarHalf } from "lucide-react";

type RatingStarsProps = {
    rating: number;
    size?: "sm" | "md" | "lg";
    showNumber?: boolean;
};

export function RatingStars({ rating, size = "md", showNumber = false }: RatingStarsProps) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const sizeClasses = {
        sm: "w-3.5 h-3.5",
        md: "w-4 h-4",
        lg: "w-5 h-5",
    };

    return (
        <div className="stars">
            {Array.from({ length: fullStars }).map((_, i) => (
                <Star key={`full-${i}`} className={`star ${sizeClasses[size]} fill-current`} />
            ))}
            {hasHalfStar && <StarHalf className={`star ${sizeClasses[size]} fill-current`} />}
            {Array.from({ length: emptyStars }).map((_, i) => (
                <Star key={`empty-${i}`} className={`star ${sizeClasses[size]}`} />
            ))}
            {showNumber && <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>}
        </div>
    );
}
