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
            default:
                return "";
        }
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm animate-fadeIn">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            {title}
                        </h2>

                        <p className="text-gray-600 mb-6">{message}</p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="cursor-pointer px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={onConfirm}
                                className={`${getClasses()} cursor-pointer px-4 py-2 rounded-lg text-white transition`}
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
