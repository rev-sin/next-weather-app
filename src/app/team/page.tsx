"use client";

import { motion } from "framer-motion";
import Header from "@/components/ui/header";
import Image from "next/image";

const teamMembers = [
  {
    name: "John Doe",
    role: "Frontend Developer",
    imageUrl: "/images/",
  },
  {
    name: "Jane Smith",
    role: "Backend Developer",
    imageUrl: "/images/jane.jpg",
  },
  {
    name: "Alice Johnson",
    role: "UI/UX Designer",
    imageUrl: "/images/alice.jpg",
  },
];

export default function TeamPage() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-r from-purple-300 to-pink-300 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="flex flex-col items-center gap-4 w-full mt-16">
        <h2 className="text-4xl font-bold">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              <h3 className="mt-4 text-2xl font-semibold">{member.name}</h3>
              <p className="text-lg">{member.role}</p>
            </div>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
