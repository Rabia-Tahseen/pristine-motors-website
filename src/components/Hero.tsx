import { categories } from "@/data/products";

const normalize = (str) => str.toLowerCase().trim();

const findMatchingCategory = (query) => {
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
