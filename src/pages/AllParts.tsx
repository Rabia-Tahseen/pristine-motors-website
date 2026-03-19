import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BrowseByCategory from "@/components/BrowseByCategory";

const AllParts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category
        ? p.category.toLowerCase() === category.toLowerCase()
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleCategoryChange = (cat: string) => {
    const params: any = {};
    if (search) params.search = search;
    if (cat !== "All") params.category = cat;
    setSearchParams(params);
  };

  return (
    <div className="p-6">
      <BrowseByCategory activeCategory={category || "All"} onCategoryChange={handleCategoryChange} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No parts found.</p>
        )}
      </div>
    </div>
  );
};

export default AllParts;
