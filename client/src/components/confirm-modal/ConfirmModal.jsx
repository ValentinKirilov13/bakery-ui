export default function ConfirmModal({
    open,
    onClose,
    onConfirm,
    message,
    action,
    title,
    confirmText,
}) {
    const getClasses = () => {
        switch (action) {
            case "DELETE":
                return "bg-red-500 hover:bg-red-600";
            case "NAVIGATE":
                return "bg-amber-500 hover:bg-amber-600";
            default:
                return "bg-amber-500 hover:bg-amber-600";
        }
    };

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                    onClick={onClose}
                >
                    <div
                        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fadeIn transform transition-all scale-105"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">
                            {title}
                        </h2>

                        <p className="text-gray-700 mb-8 leading-relaxed text-base">
                            {message}
                        </p>

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={onClose}
                                className="cursor-pointer px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 transition font-medium shadow-sm"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={onConfirm}
                                className={`${getClasses()} cursor-pointer px-5 py-2.5 rounded-xl text-white transition font-semibold shadow-md hover:shadow-lg`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
