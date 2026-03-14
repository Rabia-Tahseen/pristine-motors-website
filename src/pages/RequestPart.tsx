import { useState } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "923219454136";
const EMAIL_ADDRESS = "hamzanaveed1@gmail.com";

const RequestPart = () => {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    part: "",
    condition: "",
    budget: "",
    notes: ""
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (method: "whatsapp" | "email") => {
    const message = `
Hi, I'd like to request a part.

Vehicle Brand: ${form.brand}
Model: ${form.model}
Year: ${form.year}

Part Needed: ${form.part}
Condition: ${form.condition}
Budget: ${form.budget}

Additional Notes:
${form.notes}
`;

    if (method === "whatsapp") {
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    } else if (method === "email") {
      const subject = encodeURIComponent("Part Request from Website");
      const body = encodeURIComponent(message);
      const mailto = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
      window.open(mailto, "_blank");
    }
  };

  return (
    <main className="pt-24 pb-20 min-h-screen bg-background">
      <div className="section-container max-w-2xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Request a Part
          </h1>
          <p className="mt-3 text-muted-foreground font-body">
            Can't find the part you need? Fill the form below and send your request directly to the owner.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 bg-card border border-border rounded-xl p-6"
        >
          <input
            name="brand"
            placeholder="Vehicle Brand (Toyota, Honda, etc)"
            className="w-full border border-border rounded-lg px-4 py-3"
            onChange={handleChange}
            required
          />

          <input
            name="model"
            placeholder="Vehicle Model (Civic, Corolla, etc)"
            className="w-full border border-border rounded-lg px-4 py-3"
            onChange={handleChange}
            required
          />

          <input
            name="year"
            placeholder="Vehicle Year (e.g. 2017)"
            className="w-full border border-border rounded-lg px-4 py-3"
            onChange={handleChange}
          />

          <input
            name="part"
            placeholder="Part Needed (Headlight, Bumper, etc)"
            className="w-full border border-border rounded-lg px-4 py-3"
            onChange={handleChange}
            required
          />

          <select
            name="condition"
            className="w-full border border-border rounded-lg px-4 py-3"
            onChange={handleChange}
          >
            <option value="">Preferred Condition</option>
            <option>New</option>
            <option>Used</option>
            <option>Either</option>
          </select>

          <input
            name="budget"
            placeholder="Budget (optional)"
            className="w-full border border-border rounded-lg px-4 py-3"
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Additional details"
            rows={3}
            className="w-full border border-border rounded-lg px-4 py-3"
            onChange={handleChange}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              type="button"
              onClick={() => handleSubmit("whatsapp")}
              className="btn-whatsapp flex-1 py-3"
            >
              Send via WhatsApp
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("email")}
              className="flex-1 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: "#1D2A55" }}
            >
              Send via Email
            </button>
          </div>

        </motion.form>

      </div>
    </main>
  );
};

export default RequestPart;
