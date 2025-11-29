import Star from "./Star";

export default function StarRating({ rating = 0, max = 5 }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = max - fullStars - halfStar;

    return (
        <div className="flex space-x-1 rtl:space-x-reverse">
            {Array(fullStars)
                .fill(0)
                .map((_, i) => (
                    <Star key={`full-${i}`} filled={true} />
                ))}
            {halfStar === 1 && <Star key="half" filled={true} />}
            {Array(emptyStars)
                .fill(0)
                .map((_, i) => (
                    <Star key={`empty-${i}`} filled={false} />
                ))}
        </div>
    );
}
