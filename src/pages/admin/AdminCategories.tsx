import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Wrench } from "lucide-react";

const AdminCategories = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground font-body text-sm">Product categories overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Car className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-lg">Cars</h3>
              <p className="text-muted-foreground font-body text-sm">Complete vehicles for sale</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Wrench className="text-emerald-600" size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-lg">Car Parts</h3>
              <p className="text-muted-foreground font-body text-sm">Individual parts and components</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Category Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground font-body text-sm">
            Categories are fixed to <strong>Car</strong> and <strong>Car Part</strong>. When adding a product, select the appropriate category from the dropdown. You can filter products by category on the Products page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
