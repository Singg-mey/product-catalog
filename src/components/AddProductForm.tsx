import { useState } from "react"
import type { Product } from "./ProductCard"

interface FormData {
    name: string;
    price: string;
}

type FormDraft = Partial<FormData>;

interface AddProductFormProps {
    onAddProduct: (product: Omit<Product, "id">) => void;
}

function AddProductForm({ onAddProduct }: AddProductFormProps) {
    const [formData, setFormData] = useState<FormDraft>({});
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = (): Partial<Record<keyof FormData, string>> => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.name?.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.price || isNaN(Number(formData.price))) {
            newErrors.price = "Price must be a number";
        }

        return newErrors;
        };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            onAddProduct({
            name: formData.name?.trim() ?? "",
            price: Number(formData.price ?? 0),
            costPrice: 0,
            inStock: true,
            onSale: false,
            });
            setFormData({});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xs mx-auto p-4 rounded-lg border bg-card shadow-sm">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Add product
        </h2>

        <div className="flex flex-col gap-1">
            <input
            type="text"
            name="name"
            value={formData.name ?? ""}
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
            value={formData.price ?? ""}
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
    );
}

export default AddProductForm;