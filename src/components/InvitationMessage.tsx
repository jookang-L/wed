"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function InvitationMessage() {
  return (
    <section className="!p-0 text-center relative overflow-hidden" style={{ backgroundColor: '#F7F5F2' }}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="w-full"
      >
        <Image
          src="/write.jpg"
          alt="모시는 글"
          width={400}
          height={800}
          className="w-full h-auto"
          priority
        />
      </motion.div>
    </section>
  );
}

