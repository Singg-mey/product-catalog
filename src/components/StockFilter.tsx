interface StockFilterProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

function StockFilter({ checked, onChange }: StockFilterProps) {
    return (
        <label className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-card shadow-sm cursor-pointer select-none">
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 accent-primary"
        />
        <span className="text-sm font-medium">In stock only</span>
        </label>
    );
}

export default StockFilter;