import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BrowseByCategory from "@/components/BrowseByCategory";

const AllParts = () => {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  // ✅ SYNC URL → STATE
  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    const categoryQuery = searchParams.get("category") || "";

    setSearch(searchQuery);
    setActiveCategory(categoryQuery);
  }, [searchParams]);

  // ✅ FILTER LOGIC
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = activeCategory
        ? product.category.toLowerCase() === activeCategory.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="p-6">

      {/* ✅ CATEGORY FILTER UI */}
      <BrowseByCategory
        activeCategory={activeCategory || "All"}
        setActiveCategory={setActiveCategory}
      />

      {/* ✅ RESULTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No parts found.</p>
        )}
      </div>
    </div>
  );
};

export default AllParts;
