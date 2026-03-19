import { useSearchParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const AllParts = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "All";

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        category === "All" || p.category === category;

      const matchSearch =
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.vehicle.toLowerCase().includes(search);

      return matchCategory && matchSearch;
    });
  }, [search, category]);

  const handleCategoryClick = (cat: string) => {
    if (cat === "All") {
      navigate("/parts");
    } else {
      navigate(`/parts?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <main className="pt-24 pb-20">
      <div className="section-container">

        <h1 className="text-3xl font-bold mb-6">All Parts</h1>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-lg ${
                category === cat
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

      </div>
    </main>
  );
};

export default AllParts;
