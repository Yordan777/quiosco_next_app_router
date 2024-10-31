
import AdminSidebar from "@/components/admin/AdminSidebar";
import ToasNotification from "@/components/ui/ToasNotification";

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="md:flex  text-black">
                <aside className="md:w-72 md:h-screen bg-white">
                    <AdminSidebar />
                </aside>

                <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-5">
                    {children}
                </main>
            </div>

            <ToasNotification />
        </>
    )
}