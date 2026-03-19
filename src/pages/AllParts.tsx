import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BrowseByCategory from "@/components/BrowseByCategory";

const AllParts = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const categoryQuery = searchParams.get("category") || "All";

  useEffect(() => {
    setActiveCategory(categoryQuery);

    let filtered = products;

    // Filter by category if not "All"
    if (categoryQuery && categoryQuery !== "All") {
      filtered = filtered.filter((p) => p.category === categoryQuery);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryQuery]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
      <BrowseByCategory activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      <h2 className="text-2xl font-bold mt-8 mb-4">Products</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default AllParts;
