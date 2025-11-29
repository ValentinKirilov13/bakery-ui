const classes = [
    "row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden",
    "col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden",
    "col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden",
    "row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4",
];

export default function ProductImages({ images }) {
    return (
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            {images?.map((src, index) => {
                const className = classes[index] || "aspect-square rounded-lg object-cover";
                return <img key={index} src={src} alt={src} className={className} />;
            })}
        </div>
    );
}
