import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function SearhProducts(SearchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: SearchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })

    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
    const products = await SearhProducts(searchParams.search)

    return (
        <>
            <Heading>Resultado de busqueda</Heading>
            <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
                <ProductSearchForm />
            </div>

            {products.length ? (<ProductTable product={products} />) : (<p className=" text-center text-2xl">No hay resultado</p>)}

        </>
    )

}