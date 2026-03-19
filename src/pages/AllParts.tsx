import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BrowseByCategory from "@/components/BrowseByCategory";
import { products } from "@/data/products";

const AllParts = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const categoryParam = searchParams.get("category") || "All";
    const searchParam = searchParams.get("search") || "";

    setActiveCategory(categoryParam);

    let result = products;

    // ✅ Case-insensitive category filter
    if (categoryParam !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === categoryParam.toLowerCase()
      );
    }

    // ✅ Case-insensitive search filter
    if (searchParam) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchParam.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchParams]);

  // ✅ Use navigate so React Router updates searchParams
  const handleCategoryChange = (cat: string) => {
    if (cat === "All") {
      navigate("/parts");
    } else {
      navigate(`/parts?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <div>
      <BrowseByCategory
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow-sm">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover mb-2"
            />
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
