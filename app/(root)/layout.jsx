import Navbar from "@/components/navbar";

const Layout = ({ children }) => {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
                <Navbar />
                {children}
            </div>
        </>
    )
}
export default Layout;