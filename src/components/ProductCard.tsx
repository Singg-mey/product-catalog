import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
    id: number;
    name: string;
    price: number;
    costPrice: number;
    inStock: boolean;
    onSale: boolean;
}

type PublicProduct = Omit<Product, "costPrice">;

interface ProductCardProps {
    product: PublicProduct;
}

function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
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
    );
}

export default ProductCard;
export type { Product, PublicProduct };