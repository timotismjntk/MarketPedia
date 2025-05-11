import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/mockData';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

interface ProductListProps {
  products: Product[];
  title?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, title }) => {
  const shouldPaginate = products.length > 8;

  const table = useReactTable({
    data: products,
    columns: [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
        pageIndex: 0,
      },
    },
  });

  const paginatedProducts = shouldPaginate
    ? table.getRowModel().rows.map((row) => row.original)
    : products;

  return (
    <div className="py-4">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {paginatedProducts.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">No products found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {shouldPaginate && (
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-1">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
