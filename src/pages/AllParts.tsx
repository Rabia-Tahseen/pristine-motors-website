import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BrowseByCategory from "@/components/BrowseByCategory";
import { products } from "@/data/products";

const AllParts = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const category = searchParams.get("category") || "All";
    const search = searchParams.get("search") || "";

    // ✅ Sync category state with URL
    setActiveCategory(category);

    let result = products;

    // ✅ Apply category filter
    if (category && category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    // ✅ Apply search filter
    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchParams]);

  // ✅ Update URL when clicking categories inside Parts page
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      window.history.pushState({}, "", "/parts");
    } else {
      window.history.pushState({}, "", `/parts?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div>
      <BrowseByCategory
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
      />

      {/* Render your product layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow-sm">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-2" />
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="text-blue-700 font-bold mt-2">Rs. {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllParts;
