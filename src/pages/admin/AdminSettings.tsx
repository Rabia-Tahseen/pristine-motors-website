import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

const AdminSettings = () => {
  const { user } = useAdminAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground font-body text-sm">Account and panel settings</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg flex items-center gap-2">
            <Shield size={18} /> Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 font-body text-sm">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium text-foreground">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">Role</span>
            <Badge>Admin</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">Account ID</span>
            <span className="font-mono text-xs text-muted-foreground">{user?.id?.slice(0, 12)}...</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">Last Sign In</span>
            <span className="text-foreground">
              {user?.last_sign_in_at
                ? new Date(user.last_sign_in_at).toLocaleString("en-PK")
                : "N/A"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
