import { useState, useEffect } from 'react'
import ProductGrid from "./components/ProductGrid"
import StockFilter from "./components/StockFilter"
import AddProductForm from "./components/AddProductForm"
import type { Product, PublicProduct } from "./components/ProductCard"
import './App.css'

function App() {
  // Bug 3 Planted: Initial state set to empty array, waiting for fetch
  const [products, setProducts] = useState<Product[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // BUG 3: Misspelled URL endpoint ('produts' instead of 'products')
  useEffect(() => {
  fetch("https://fakestoreapi.com/products") // 
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data: Product[]) => setProducts(data))
    .catch((err) => console.error("Fetch failed:", err));
  }, []);


  
  const visibleProducts = inStockOnly
    ? products.filter((product) => product.inStock)
    : products;
  
  const saleCount = visibleProducts.filter((product) => product.onSale).length;

  // Strip internal-only fields before handing products to display components
  const publicProducts: PublicProduct[] = visibleProducts.map(({ costPrice, ...rest }) => rest);

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { id: Date.now(), ...newProduct }]);
  };

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl text-center font-bold">Product Catalog</h1>

        <AddProductForm onAddProduct={handleAddProduct} />

        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{visibleProducts.length} products</h3>
          <StockFilter checked={inStockOnly} onChange={setInStockOnly} />
        </div>

        {saleCount > 0 && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2">
            <p className="text-red-600 font-semibold text-sm">
              {saleCount} on sale
            </p>
          </div>
        )}

        <ProductGrid products={publicProducts} />
      </div>
    </div>
  )
}

export default App