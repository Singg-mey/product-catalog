import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import './App.css'

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  onSale: boolean;
}

interface FormData {
  name: string;
  price: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([
  { id: 1, name: "Wireless Headphone", price: 50, inStock: true, onSale: false },
  { id: 2, name: "Keyboard", price: 89, inStock: false, onSale: true },
  { id: 3, name: "Magic Mouse", price: 35, inStock: true, onSale: true },
]);

  const [formData, setFormData] = useState<FormData>({ name: "", price: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [inStockOnly, setInStockOnly] = useState(false);

  const visibleProducts = inStockOnly
    ? products.filter((product) => product.inStock)
    : products;

  const saleCount = visibleProducts.filter((product) => product.onSale).length;

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): Partial<Record<keyof FormData, string>> => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.price === "" || isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a number";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newProduct = {
        id: Date.now(),
        name: formData.name.trim(),
        price: Number(formData.price),
        inStock: true,
        onSale: false,
      };

      setProducts((prev) => [...prev, newProduct]);
      setFormData({ name: "", price: "" });
    }
  };


  return (
    <>
    <div className="min-h-screen bg-muted/30 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-2xl text-center font-bold">Product Catalog</h1>

          {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xs mx-auto p-4 rounded-lg border bg-card shadow-sm">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Add product
          </h2>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {errors.price && <p className="text-red-600 text-xs">{errors.price}</p>}
          </div>

          <button
            type="submit"
            className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Add product
          </button>
        </form>

          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{visibleProducts.length} products</h3>

            <label className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-card shadow-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              <span className="text-sm font-medium">In stock only</span>
            </label>
          </div>

          {/* Sale banner */}
          {saleCount > 0 && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2">
              <p className="text-red-600 font-semibold text-sm">
                {saleCount} on sale
              </p>
            </div>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden transition-shadow hover:shadow-lg"
              >
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <Badge
                      className={
                        product.inStock
                          ? "bg-green-600 hover:bg-green-600"
                          : "bg-gray-400 hover:bg-gray-400"
                      }
                    >
                      {product.inStock ? "In stock" : "Sold out"}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-foreground">${product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>

    </>
  )
}

export default App
