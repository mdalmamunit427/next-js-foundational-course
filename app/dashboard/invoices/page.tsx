import Search from "@/app/ui/search"
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from "react";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import InvoicesTable from "@/app/ui/invoices/table";
import { fetchInvoicesPages } from "@/app/lib/data";
import Pagination from "@/app/ui/invoices/pagination";
import { CreateInvoice } from "@/app/ui/invoices/buttons";

const page = async({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);
  return (
    <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
    </div>
    <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      <Search placeholder="Search invoices..." />
      <CreateInvoice />
    </div>
     <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
      <InvoicesTable query={query} currentPage={currentPage} />
    </Suspense>
    <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
    </div>
  </div>
  )
}

export default page