'use client'
import { Home, MessageCircle, PlusCircle, Share, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
    const pathname = usePathname();
    return (
        <>
            {/* Navigation */}
            <nav className="px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between max-w-7xl mx-auto w-full from-white via-blue-50/30 to-purple-50/20">
                <div className="flex items-center gap-2">

                    <Image src="/logo.png" alt="PixiPush Logo" width={50} height={50} className="border-1 rounded-xl" />

                    <span className="text-2xl font-bold text-slate-900">PixiPush</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className={` hover:text-blue-600 transition-colors font-medium ${pathname == '/' ? 'text-blue-600' : 'text-slate-600'}`}>Home</Link>
                    <Link href="/features" className={` hover:text-blue-600 transition-colors font-medium ${pathname == '/features' ? 'text-blue-600' : 'text-slate-600'}`}>Features</Link>
                    <Link href="/previous" className={` hover:text-blue-600 transition-colors font-medium ${pathname == '/previous' ? 'text-blue-600' : 'text-slate-600'}`}>Old Shares</Link>
                    <Link href="/about" className={` hover:text-blue-600 transition-colors font-medium ${pathname == '/about' ? 'text-blue-600' : 'text-slate-600'}`}>About</Link>
                    <Link href="/chat" className={` hover:text-blue-600 transition-colors font-medium ${pathname == '/chat' ? 'text-blue-600' : 'text-slate-600'}`}>Chat</Link>
                </div>
            </nav>

            <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-sm">
                <div className="flex md:hidden items-center justify-around p-1">
                    <Link href="/" className={`flex flex-col items-center transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-500'}`}>
                        <Home className="w-5 h-5" />
                    </Link>

                    <Link href="/features" className={`flex flex-col items-center transition-colors ${pathname === '/features' ? 'text-blue-600' : 'text-gray-500'}`}>
                        <PlusCircle className="w-5 h-5" />
                    </Link>

                    <Link href="/previous" className={`flex flex-col items-center transition-colors ${pathname === '/previous' ? 'text-blue-600' : 'text-gray-500'}`}>
                        <Share className="w-5 h-5" />
                    </Link>

                    <Link href="/chat" className={`flex flex-col items-center transition-colors ${pathname === '/chat' ? 'text-blue-600' : 'text-gray-500'}`}>
                        <MessageCircle className="w-5 h-5" />
                    </Link>
                </div>
            </nav>
        </>
    )
}
export default Navbar;