import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CURRENT_YEAR = new Date().getFullYear();

const RequestPart = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user_email: "",
    brand: "",
    model: "",
    year: "",
    part: "",
    condition: "Either",
    budget: "",
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "year") {
      setForm({ ...form, year: value.replace(/\D/g, "").slice(0, 4) });
      return;
    }

    if (name === "budget") {
      setForm({ ...form, budget: value.replace(/\D/g, "") });
      return;
    }

    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.user_email.trim()) {
      newErrors.user_email = "Email is required";
    } else if (!emailRegex.test(form.user_email)) {
      newErrors.user_email = "Enter a valid email address";
    }

    if (!form.brand.trim()) newErrors.brand = "Brand is required";
    if (!form.model.trim()) newErrors.model = "Model is required";
    if (!form.part.trim()) newErrors.part = "Part is required";

    if (form.year) {
      const y = Number(form.year);

      if (form.year.length !== 4) {
        newErrors.year = "Year must be 4 digits";
      } else if (y < 1950 || y > CURRENT_YEAR) {
        newErrors.year = `Year must be between 1980 - ${CURRENT_YEAR}`;
      }
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("part_requests").insert([
      {
        user_email: form.user_email,
        brand: form.brand,
        model: form.model,
        year: form.year,
        part: form.part,
        condition: form.condition,
        budget: form.budget,
        notes: form.notes,
      },
    ]);

    setLoading(false);

    if (!error) {
      setSuccess(true);

      setForm({
        user_email: "",
        brand: "",
        model: "",
        year: "",
        part: "",
        condition: "Either",
        budget: "",
        notes: "",
      });
    }
  };

  // ✅ FIXED AUTO SCROLL (THIS IS THE IMPORTANT PART)
  useEffect(() => {
    if (success) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [success]);

  return (
    <main className="min-h-screen pt-16 pb-12 bg-gradient-to-br from-blue-50 via-sky-50 to-white">
      <div className="max-w-2xl mx-auto px-4">

        <h1 className="text-3xl font-bold text-center text-blue-1000 mb-6">
          Request a Part
        </h1>

        <AnimatePresence mode="wait">

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-xl shadow-xl text-center border border-blue-100"
            >
              <h2 className="text-2xl font-bold text-blue-1000">
                Thank you for your request
              </h2>

              <p className="text-gray-600 mt-4">
               We’ve received your request and will get back to you soon with availability and pricing details.
               </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">

                <Button
                  onClick={() => setSuccess(false)}
                  className="
                    bg-white
                    text-blue-900
                    border border-blue-900
                    hover:bg-blue-50
                    shadow-md
                    hover:shadow-lg
                    transition-all
                  "
                >
                  Submit Another Request
                </Button>

                <Button
                  onClick={() => navigate("/")}
                  className="
                    bg-blue-900
                    text-white
                    hover:bg-blue-800
                    shadow-md
                    hover:shadow-xl
                    transition-all
                  "
                >
                  Go Home
                </Button>

              </div>
            </motion.div>
          ) : (
            <motion.div className="space-y-4 bg-white/90 p-5 rounded-xl shadow-md">

              <div>
                <Label>Email *</Label>
                <Input
                  name="user_email"
                  value={form.user_email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                />
                {errors.user_email && <p className="text-red-500 text-sm">{errors.user_email}</p>}
              </div>

              <div>
                <Label>Brand *</Label>
                <Input name="brand" value={form.brand} onChange={handleChange} placeholder="Toyota" />
                {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
              </div>

              <div>
                <Label>Model *</Label>
                <Input name="model" value={form.model} onChange={handleChange} placeholder="Corolla" />
                {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
              </div>

              <div>
                <Label>Year</Label>
                <Input
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="e.g. 2018"
                  maxLength={4}
                />
                {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
              </div>

              <div>
                <Label>Part *</Label>
                <Input name="part" value={form.part} onChange={handleChange} placeholder="Headlight" />
                 {errors.part && <p className="text-red-500 text-sm">{errors.part}</p>}
              </div>

             <div>
  <Label>Condition</Label>

  <select
    name="condition"
    value={form.condition}
    onChange={handleChange}
    className="w-full border p-2 rounded"
  >
    <option value="Either">Either</option>
    <option value="New">New</option>
    <option value="Used">Used</option>
  </select>
</div>
              <div>
                <Label>Budget (optional)</Label>
                <Input
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder="e.g. 5000"
                />
              </div>

              <Textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any extra details..."
              />

              <div className="flex justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="
                    bg-blue-900
                    text-white
                    hover:bg-blue-800
                    shadow-md
                    hover:shadow-xl
                    px-6
                    transition-all
                  "
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </main>
  );
};

export default RequestPart;
