import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import type { SupabaseProduct } from "@/pages/admin/AdminProducts";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: SupabaseProduct | null;
  onSaved: () => void;
}

const emptyForm = {
  title: "",
  product_type: "car_part",
  price: 0,
  short_description: "",
  full_description: "",
  brand: "",
  model_compatibility: "",
  condition: "used",
  stock_status: "in_stock",
  is_featured: false,
  images: [] as string[],
};

const ProductFormDialog = ({ open, onOpenChange, product, onSaved }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        product_type: product.product_type,
        price: product.price,
        short_description: product.short_description ?? "",
        full_description: product.full_description ?? "",
        brand: product.brand ?? "",
        model_compatibility: product.model_compatibility ?? "",
        condition: product.condition ?? "used",
        stock_status: product.stock_status ?? "in_stock",
        is_featured: product.is_featured ?? false,
        images: product.images ?? [],
      });
    } else {
      setForm(emptyForm);
    }
  }, [product, open]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const uploadedUrls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `products/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("product-images").upload(path, file);
      if (error) {
        toast.error(`Failed to upload ${file.name}`);
        continue;
      }
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
      uploadedUrls.push(urlData.publicUrl);
    }

    setForm((prev) => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    setUploading(false);
    if (uploadedUrls.length > 0) toast.success(`${uploadedUrls.length} image(s) uploaded`);
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const setMainImage = (index: number) => {
    setForm((prev) => {
      const images = [...prev.images];
      const [main] = images.splice(index, 1);
      return { ...prev, images: [main, ...images] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      toast.error("Title and price are required");
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title,
      product_type: form.product_type ?? "car_part",
      price: Number(form.price) || 0,
      short_description: form.short_description || null,
      full_description: form.full_description || null,
      brand: form.brand || null,
      model_compatibility: form.model_compatibility || null,
      condition: form.condition ?? null,
      stock_status: form.stock_status ?? null,
      is_featured: form.is_featured ?? false,
      images: form.images ?? [],
    };

    if (product) {
      const { error } = await supabase.from("products").update(payload).eq("id", product.id);
      if (error) {
        console.error(error);
        toast.error(error.message);
      }
      else toast.success("Product updated");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) {
        console.error(error);
        toast.error(error.message);
      }
      else toast.success("Product added");
    }

    setSaving(false);
    onOpenChange(false);
    onSaved();
  };

  const selectClass = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-body";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-body">Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Product title" />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Category *</Label>
              <select
                value={form.product_type}
                onChange={(e) =>
                setForm({ ...form, product_type: e.target.value })
                } className={selectClass}>
                <option value="car">Car</option>
                <option value="car_part">Car Part</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Price (Rs.) *</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Brand</Label>
              <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="e.g. Toyota" />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Model Compatibility</Label>
              <Input value={form.model_compatibility} onChange={(e) => setForm({ ...form, model_compatibility: e.target.value })} placeholder="e.g. Toyota Raize 2022" />
            </div>
            <div className="space-y-2">
              <Label className="font-body">Condition</Label>
              <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} className={selectClass}>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label className="font-body">Stock Status</Label>
              <select value={form.stock_status} onChange={(e) => setForm({ ...form, stock_status: e.target.value })} className={selectClass}>
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch checked={form.is_featured} onCheckedChange={(checked) => setForm({ ...form, is_featured: checked })} />
              <Label className="font-body">Featured Product</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-body">Short Description</Label>
            <Input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} placeholder="Brief description" />
          </div>

          <div className="space-y-2">
            <Label className="font-body">Full Description</Label>
            <Textarea value={form.full_description} onChange={(e) => setForm({ ...form, full_description: e.target.value })} placeholder="Detailed description" rows={4} />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label className="font-body">Images</Label>
            <div className="flex flex-wrap gap-3">
              {form.images.map((url, i) => (
                <div key={i} className="relative group w-20 h-20">
                  <img src={url} alt="" className={`w-20 h-20 object-cover rounded-lg ${i === 0 ? "ring-2 ring-primary" : ""}`} />
                  <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition">
                    <X size={12} />
                  </button>
                  {i !== 0 && (
                    <button type="button" onClick={() => setMainImage(i)} className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-[10px] py-0.5 rounded-b-lg opacity-0 group-hover:opacity-100 transition text-center">
                      Set Main
                    </button>
                  )}
                </div>
              ))}
              <label className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <Upload size={16} className="text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-body mt-1">
                  {uploading ? "..." : "Upload"}
                </span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
            {form.images.length > 0 && (
              <p className="text-xs text-muted-foreground font-body">First image is the main display image. Hover to change.</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : product ? "Update Product" : "Add Product"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
