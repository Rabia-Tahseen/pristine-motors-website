import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ProductFormDialog from "@/components/admin/ProductFormDialog";

export interface SupabaseProduct {
  id: string;
  title: string;
  product_type: string;
  category?: { name: string };
  category_id?: string;
  price: number;
  short_description: string;
  full_description: string;
  brand: string;
  model_compatibility: string;
  condition: string;
  stock_status: string;
  images: string[];
  is_featured: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  product_type: string;
}

const AdminProducts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dashboardFilter = queryParams.get("filter"); // "car-parts" | "cars" | null

  const [products, setProducts] = useState<SupabaseProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SupabaseProduct | null>(null);

  // ✅ Set initial filter from dashboard (no race condition)
  useEffect(() => {
    if (dashboardFilter === "car-parts") {
      setCategoryFilter("car_part");
    } else if (dashboardFilter === "cars") {
      setCategoryFilter("car");
    } else {
      setCategoryFilter("all");
    }
  }, [dashboardFilter]);

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) throw error;
      setCategories(data ?? []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  // ✅ MAIN FIXED FETCH FUNCTION
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("products")
        .select(`*, category:categories(name)`)
        .order("created_at", { ascending: false });

      // 🔥 PRIORITY: Dashboard filter first
      if (dashboardFilter === "car-parts") {
        query = query.eq("product_type", "car_part");
      } else if (dashboardFilter === "cars") {
        query = query.eq("product_type", "car");
      } else {
        // normal filters
        if (categoryFilter === "car_part") {
          query = query.eq("product_type", "car_part");
        } else if (categoryFilter === "car") {
          query = query.eq("product_type", "car");
        }
      }

      if (stockFilter !== "all") {
        query = query.eq("stock_status", stockFilter);
      }

      if (search) {
        query = query.ilike("title", `%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setProducts(data ?? []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchCategories();
  }, []);

  // refetch on filters
  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, stockFilter, search, dashboardFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) toast.error("Failed to delete product");
    else {
      toast.success("Product deleted");
      fetchProducts();
    }
  };

  const handleEdit = (product: SupabaseProduct) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const stockBadge = (status: string) => {
    const colors: Record<string, string> = {
      in_stock: "bg-emerald-100 text-emerald-800",
      out_of_stock: "bg-red-100 text-red-800",
      sold: "bg-muted text-muted-foreground",
    };

    return (
      <Badge className={`${colors[status] ?? "bg-muted text-foreground"} text-xs font-body`}>
        {status.replace("_", " ")}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground font-body text-sm">{products.length} products total</p>
        </div>

        <Button onClick={handleAdd} className="gap-2">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      {/* FILTERS */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* ✅ Dropdown synced with dashboard */}
            <select
              value={
                dashboardFilter
                  ? dashboardFilter === "cars"
                    ? "car"
                    : "car_part"
                  : categoryFilter
              }
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm font-body"
            >
              <option value="all">All Categories</option>
              <option value="car">Cars</option>
              <option value="car_part">Car Parts</option>
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm font-body"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </CardHeader>

        {/* TABLE */}
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-muted-foreground py-10 font-body">No products found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2">Image</th>
                    <th className="text-left py-3 px-2">Title</th>
                    <th className="hidden md:table-cell text-left py-3 px-2">Category</th>
                    <th className="text-left py-3 px-2">Price</th>
                    <th className="hidden sm:table-cell text-left py-3 px-2">Status</th>
                    <th className="text-right py-3 px-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/30">
                      <td className="py-3 px-2">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 bg-muted flex items-center justify-center text-xs">N/A</div>
                        )}
                      </td>

                      <td className="py-3 px-2">
                        <p className="font-medium">{product.title}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </td>

                      <td className="hidden md:table-cell py-3 px-2">
                        <Badge variant="outline">{product.category?.name ?? "Uncategorized"}</Badge>
                      </td>

                      <td className="py-3 px-2 font-semibold">
                        Rs. {product.price.toLocaleString()}
                      </td>

                      <td className="hidden sm:table-cell py-3 px-2">
                        {stockBadge(product.stock_status)}
                      </td>

                      <td className="py-3 px-2 text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                            <Pencil size={14} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editingProduct}
        onSaved={fetchProducts}
        categories={categories}
      />
    </div>
  );
};

export default AdminProducts;
