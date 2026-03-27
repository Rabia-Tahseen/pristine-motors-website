import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Wrench } from "lucide-react";

const carPartSubCategories = ["Body Parts", "Lighting", "Bumpers", "Interior", "Nose Cut", "Mirrors"];

const AdminCategories = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground font-body text-sm">Product categories overview</p>
      </div>

      <div className="space-y-4">
        {/* Car Parts */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Wrench className="text-emerald-600" size={24} />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground text-lg">Car Parts</h3>
                <p className="text-muted-foreground font-body text-sm">Individual parts and components</p>
              </div>
            </div>
            <ul className="ml-16 mt-2 text-sm text-muted-foreground space-y-1">
              {carPartSubCategories.map((sub, idx) => (
                <li key={idx}>• {sub}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Cars */}
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
      </div>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg">Category Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground font-body text-sm">
            Products are divided by <strong>Product Type</strong>: <strong>Car</strong> or <strong>Car Part</strong>. 
            Car Parts include subcategories such as Body Parts, Lighting, Bumpers, Interior, Nose Cut, and Mirrors. 
            When adding a product, select the correct product type and category. 
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
