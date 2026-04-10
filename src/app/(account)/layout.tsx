import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AccountSidebar } from "@/components/account/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        data-header-theme="dark"
        className="flex-1 bg-[#faf9f7] pt-[60px]"
      >
        <div className="mx-auto max-w-[1360px] px-6 py-16 md:py-24">
          {/* Page title */}
          <h1 className="mb-10 font-heading text-4xl tracking-[0.4px] text-[#2b2927]">
            Minha conta
          </h1>

          {/* Sidebar + Content */}
          <div className="flex flex-col gap-10 lg:flex-row">
            <AccountSidebar />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
