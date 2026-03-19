import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BrowseByCategory from "@/components/BrowseByCategory";
import { products } from "@/data/products";

const PartsPage = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const category = searchParams.get("category") || "All";
    const search = searchParams.get("search") || "";

    setActiveCategory(category);

    let result = products;

    if (category && category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchParams]);

  return (
    <div>
      <BrowseByCategory activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <div className="grid grid-cols-3 gap-4 mt-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="border p-4">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsPage;
