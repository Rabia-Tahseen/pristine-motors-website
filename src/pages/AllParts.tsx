import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BrowseByCategory from "@/components/BrowseByCategory";

const AllParts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  // 🔹 Filter products directly from URL
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category
        ? product.category.toLowerCase() === category.toLowerCase()
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  // 🔹 Handle category click
  const handleCategoryChange = (cat: string) => {
    const params: any = {};
    if (search) params.search = search;
    if (cat !== "All") params.category = cat;
    setSearchParams(params);
  };

  return (
    <div className="p-6">
      {/* CATEGORY FILTER */}
      <BrowseByCategory
        activeCategory={category || "All"}
        onCategoryChange={handleCategoryChange}
      />

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No parts found.</p>
        )}
      </div>
    </div>
  );
};

export default AllParts;
