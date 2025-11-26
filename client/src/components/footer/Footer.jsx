export default function Footer() {
    return (
        <footer className="w-full bg-amber-100 text-amber-900 py-6 ">
            <div className="container mx-auto px-4 text-center">
                <p className="text-md p-1">© 2025 Your Company. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <a href="#" className="hover:text-white">
                        Twitter
                    </a>
                    <a href="#" className="hover:text-white">
                        Facebook
                    </a>
                    <a href="#" className="hover:text-white">
                        Instagram
                    </a>
                </div>
            </div>
        </footer>
    );
}
