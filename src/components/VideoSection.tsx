import { motion } from "framer-motion";

const VideoSection = () => (
  <section className="py-20 md:py-28 bg-muted/50">
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          See Us in Action
        </h2>
        <p className="mt-3 text-muted-foreground text-lg">
          Watch how our parts perform under real-world conditions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
        style={{ boxShadow: "var(--shadow-card-hover)" }}
      >
        <div className="aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Pristine Motors video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </div>
  </section>
);

export default VideoSection;
