import { useNavigate } from "react-router-dom";
import { categories } from "@/data/products";

const normalize = (str: string) => str.toLowerCase().trim();

const findMatchingCategory = (query: string) => {
  const q = normalize(query);

  return categories.find((cat) => {
    const c = normalize(cat);
    return (
      c === q ||
      c.includes(q) ||
      q.includes(c) ||
      c.replace(/s$/, "") === q ||
      q.replace(/s$/, "") === c
    );
  });
};

const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");

  const handleSearch = () => {
    const q = query.trim();
    if (!q) return;

    const match = findMatchingCategory(q);

    if (match) {
      navigate(
        `/parts?search=${encodeURIComponent(q)}&category=${encodeURIComponent(match)}`
      );
    } else {
      navigate(`/parts?search=${encodeURIComponent(q)}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search parts..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
