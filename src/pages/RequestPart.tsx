import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "923219454136";
const OWNER_EMAIL = "hamzanaveed1@gmail.com";

const RequestPart = () => {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    part: "",
    condition: "Either",
    budget: "",
    notes: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Restrict budget and year to numbers only
    if (name === "budget" || name === "year") {
      setForm({ ...form, [name]: value.replace(/\D/g, "") });
    } else {
      setForm({ ...form, [name]: value });
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.brand.trim() || form.brand.trim().length < 2) {
      newErrors.brand = "Enter a valid brand (e.g., Toyota)";
    }
    if (!form.model.trim() || form.model.trim().length < 2) {
      newErrors.model = "Enter a valid model (e.g., Civic)";
    }
    if (!form.part.trim() || form.part.trim().length < 2) {
      newErrors.part = "Enter a valid part (e.g., Headlight)";
    }
    if (form.year && !/^\d{4}$/.test(form.year)) {
      newErrors.year = "Enter a valid 4-digit year";
    }

    return newErrors;
  };

  const handleSend = (method: "whatsapp" | "email") => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const message = `Hi, I'd like to request a part.

Vehicle Brand: ${form.brand}
Model: ${form.model}
Year: ${form.year || "-"}

Part Needed: ${form.part}
Condition: ${form.condition}
Budget: ${form.budget || "-"}

Additional Notes: ${form.notes || "-"}`;

    if (method === "whatsapp") {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } else {
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${OWNER_EMAIL}&su=Part Request&body=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400";

  const selectClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400";

  return (
    <main className="pt-16 pb-12 min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Request a Part
          </h1>
          <p className="text-gray-500 mt-1">
            Fill in the details and send your request.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 bg-white p-5 rounded-xl shadow-md"
        >

          {/* Brand */}
          <div>
            <Label>Vehicle Brand *</Label>
            <Input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="e.g., Toyota"
              className={inputClass}
            />
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
          </div>

          {/* Model */}
          <div>
            <Label>Vehicle Model *</Label>
            <Input
              name="model"
              value={form.model}
              onChange={handleChange}
              placeholder="e.g., Civic"
              className={inputClass}
            />
            {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
          </div>

          {/* Year */}
          <div>
            <Label>
              Vehicle Year <span className="text-gray-400">(optional)</span>
            </Label>
            <Input
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="e.g., 2005"
              className={inputClass}
            />
            {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
          </div>

          {/* Part */}
          <div>
            <Label>Part Needed *</Label>
            <Input
              name="part"
              value={form.part}
              onChange={handleChange}
              placeholder="e.g., Headlight"
              className={inputClass}
            />
            {errors.part && <p className="text-red-500 text-sm mt-1">{errors.part}</p>}
          </div>

          {/* Condition */}
          <div>
            <Label>Condition</Label>
            <select
              name="condition"
              value={form.condition}
              onChange={handleChange}
              className={selectClass}
            >
              <option>Either</option>
              <option>New</option>
              <option>Used</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <Label>
              Budget <span className="text-gray-400">(optional)</span>
            </Label>
            <Input
              name="budget"
              value={form.budget}
              onChange={handleChange}
              placeholder="e.g., 5000"
              className={inputClass}
            />
          </div>

          {/* Notes */}
          <div>
            <Label>
              Additional Notes <span className="text-gray-400">(optional)</span>
            </Label>
            <Textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Optional details"
              rows={3}
              className={inputClass}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <Button
              onClick={() => handleSend("whatsapp")}
              className="flex-1 flex items-center justify-center gap-2 
              bg-green-500 hover:bg-green-600 
              shadow-md hover:shadow-lg 
              transition-all duration-200 
              hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              WhatsApp
            </Button>

            <Button
              onClick={() => handleSend("email")}
              className="flex-1 flex items-center justify-center gap-2 
              bg-blue-900 hover:bg-blue-800 text-white 
              shadow-md hover:shadow-lg 
              transition-all duration-200 
              hover:scale-[1.02]"
            >
              <Mail size={18} />
              Email
            </Button>
          </div>

        </motion.form>
      </div>
    </main>
  );
};

export default RequestPart;
