import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-cyan-900 text-white py-4">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-4 sm:mb-0 text-center sm:text-left">
                    <h1 className="text-2xl font-bold">Vehicles App</h1>
                </div>
                
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                        <Facebook size={30} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <Twitter size={30} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                        <Instagram size={30} />
                    </a>
                    <a href="mailto:example@mail.com" className="hover:text-red-500">
                        <Mail size={30} />
                    </a>
                </div>
            </div>
            
            <div className="mt-2 text-center font-bold text-white">
                &copy; {new Date().getFullYear()} Created By Arya Segara. All rights reserved.
            </div>
        </footer>
    );
}
