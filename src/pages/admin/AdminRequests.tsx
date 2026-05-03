import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PartRequest {
  id: string;
  user_email: string;
  brand: string;
  model: string;
  year: string;
  part: string;
  condition: string;
  budget: string;
  notes: string;
  status: string;
  created_at: string;
}

const statuses = ["pending", "replied", "in_progress", "completed"];

const statusColor: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  replied: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};

const AdminRequests = () => {
  const [requests, setRequests] = useState<PartRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("part_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to fetch requests");
    } else {
      setRequests(data ?? []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("part_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error);
      toast.error("Failed to update status");
    } else {
      toast.success(`Status → ${status}`);
      fetchRequests();
    }
  };

  const handleReply = async (req: PartRequest) => {
    const message = `
Hello,

Thank you for contacting Pristine Auto Hub.

We have received your request for a ${req.part} for your ${req.brand} ${req.model}.
Our team is currently checking availability and pricing.

We will get back to you shortly.

Best regards,  
Pristine Auto Hub
`;

    const subject = `Update on your ${req.part} request`;

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        req.user_email
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
      "_blank"
    );

    await supabase
      .from("part_requests")
      .update({ status: "replied" })
      .eq("id", req.id);

    fetchRequests();
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Part Requests
        </h1>
        <p className="text-muted-foreground font-body text-sm">
          {requests.length} requests total
        </p>
      </div>

      <Card>
        <CardContent className="p-0">

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full" />
            </div>
          ) : requests.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">
              No requests yet
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Part</th>
                    <th className="text-left py-3 px-4 hidden md:table-cell">Vehicle</th>
                    <th className="text-left py-3 px-4 hidden lg:table-cell">Budget</th>

                    {/* ✅ ADDED COLUMN */}
                    <th className="text-left py-3 px-4 hidden lg:table-cell">Notes</th>

                    <th className="text-left py-3 px-4 hidden lg:table-cell">Date</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b hover:bg-muted/20 transition">

                      <td className="py-3 px-4">
                        <p className="font-medium">{req.user_email}</p>
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-medium">{req.part}</p>
                        <p className="text-xs text-muted-foreground">
                          Condition:{" "}
                          {req.condition?.trim()
                            ? req.condition
                            : <span className="italic">Not specified</span>}
                        </p>
                      </td>

                      <td className="py-3 px-4 hidden md:table-cell">
                        {req.brand} {req.model} (
                        {req.year?.trim()
                          ? req.year
                          : <span className="text-muted-foreground">N/A</span>}
                        )
                      </td>

                      <td className="py-3 px-4 hidden lg:table-cell">
                        {req.budget?.trim()
                          ? `Rs. ${req.budget}`
                          : <span className="text-muted-foreground">Not specified</span>}
                      </td>

                      {/* ✅ ADDED NOTES CELL */}
                      <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">
                        {req.notes?.trim()
                          ? req.notes
                          : <span className="italic">—</span>}
                      </td>

                      <td className="py-3 px-4 hidden lg:table-cell text-muted-foreground">
                        {new Date(req.created_at).toLocaleDateString("en-PK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="py-3 px-4">
                        <select
                          value={req.status || "pending"}
                          onChange={(e) => updateStatus(req.id, e.target.value)}
                          className={`text-xs rounded-full px-2 py-1 border-0 cursor-pointer ${
                            statusColor[req.status || "pending"]
                          }`}
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s.replace("_", " ")}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReply(req)}
                        >
                          Reply
                        </Button>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRequests;
