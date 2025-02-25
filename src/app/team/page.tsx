"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/ui/header";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const teamMembers = [
  {
    name: "Koushik Reddy Chittibala",
    role: "Tester",
    rollno: "CB.EN.U4CSE22108",
    imageUrl: "/images/koushik.jpg",
  },
  {
    name: "Jishnu Hari",
    role: "Developer",
    rollno: "CB.EN.U4CSE22122",
    imageUrl: "/images/jishnu.jpg",
  },
  {
    name: "Lucky Goyal",
    role: "Developer",
    rollno: "CB.EN.U4CSE22130",
    imageUrl: "/images/lucky.jpg",
  },
  {
    name: "Priyadharshini",
    role: "Tester",
    rollno: "CB.EN.U4CSE22147",
    imageUrl: "/images/priya.jpg",
  },
  {
    name: "Revanth Singothu",
    role: "Scrum Master",
    rollno: "CB.EN.U4CSE22149",
    imageUrl: "/public/revanth.svg",
  },
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedMember((prevMember) => {
        const currentIndex = teamMembers.findIndex(
          (member) => member.name === prevMember.name
        );
        const nextIndex = (currentIndex + 1) % teamMembers.length;
        return teamMembers[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 bg-gradient-to-r from-purple-300 to-pink-300 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="flex flex-col items-center gap-4 w-full mt-8 sm:mt-16">
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className={`cursor-pointer p-2 sm:p-4 rounded-lg transition-colors duration-300 ease-in-out ${
                selectedMember.name === member.name
                  ? "bg-purple-200"
                  : "hover:bg-purple-100"
              }`}
              onClick={() => setSelectedMember(member)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {member.name}
            </motion.div>
          ))}
        </nav>
        <motion.section
          className="w-full sm:w-3/4 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="w-full max-w-xs sm:max-w-md"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="flex flex-col items-center">
                <div className="overflow-hidden rounded-full w-32 h-32 sm:w-40 sm:h-40 mb-4">
                  <Image
                    src={selectedMember.imageUrl}
                    alt={selectedMember.name}
                    className="object-cover w-full h-full"
                    width={160}
                    height={160}
                  />
                </div>
                <hr className="w-full border-t border-gray-300 my-4" />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  {selectedMember.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {selectedMember.role}
                </CardDescription>
                <CardDescription className="text-sm text-gray-600">
                  {selectedMember.rollno}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </main>
    </motion.div>
  );
}
