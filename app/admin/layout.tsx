import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminTopbar } from "@/components/admin/topbar"

export const metadata: Metadata = {
  title: "Admin · xZark",
  description: "Painel de controle xZark Security Operations Center",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <AdminSidebar />
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        <AdminTopbar />
        <main className="flex-1 px-4 py-6 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  )
}
