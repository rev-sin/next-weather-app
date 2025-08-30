"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { teamMembers } from "./_members/members";

// Utility function to get the next member in the list
const getNextMember = (currentMemberName: string) => {
  const currentIndex = teamMembers.findIndex(
    (member) => member.name === currentMemberName
  );
  const nextIndex = (currentIndex + 1) % teamMembers.length;
  return teamMembers[nextIndex];
};

// Clears any existing interval
const clearExistingInterval = (intervalRef: React.MutableRefObject<NodeJS.Timeout | null>) => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
};

// Creates a new interval and sets it to rotate selected members
const createNewInterval = (
  setSelectedMember: React.Dispatch<React.SetStateAction<typeof teamMembers[0]>>,
  intervalRef: React.MutableRefObject<NodeJS.Timeout | null>
) => {
  intervalRef.current = setInterval(() => {
    setSelectedMember((prevMember) => getNextMember(prevMember.name));
  }, 5000);
};

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    clearExistingInterval(intervalRef);
    createNewInterval(setSelectedMember, intervalRef);
    return () => clearExistingInterval(intervalRef);
  }, []);

  const handleMemberClick = (member: (typeof teamMembers)[0]) => {
    setSelectedMember(member);
    clearExistingInterval(intervalRef);
    createNewInterval(setSelectedMember, intervalRef);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 pb-20 gap-8 sm:gap-16 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="region"
      aria-labelledby="team-heading"
    >
      <div className="w-4/5 mx-auto">
        <h1 id="team-heading" className="text-3xl font-bold mb-4 text-center">Meet the Team</h1>
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-8" aria-label="Team members">
          {teamMembers.map((member) => {
            const isSelected = selectedMember.name === member.name;
            const cardClasses = `cursor-pointer p-2 sm:p-4 rounded-lg transition-colors duration-300 ease-in-out focus:outline focus:outline-purple-500 ${
              isSelected ? "bg-purple-200" : "hover:bg-purple-100"
            }`;

            return (
              <motion.button
                key={member.name}
                className={cardClasses}
                onClick={() => handleMemberClick(member)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                aria-pressed={isSelected}
                tabIndex={0}
                type="button"
              >
                {member.name}
              </motion.button>
            );
          })}
        </nav>

        <motion.section
          className="w-full sm:w-3/4 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          role="region"
          aria-label="Selected team member"
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
                    alt={`Photo of ${selectedMember.name}, ${selectedMember.role}`}
                    className="object-cover w-full h-full"
                    width={160}
                    height={160}
                  />
                </div>
                <hr className="w-full border-t border-gray-300 my-4" />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  {selectedMember.name}
                </CardTitle>
                <CardDescription className="text-lg text-gray-200">
                  {selectedMember.role}
                </CardDescription>
                <CardDescription className="text-lg text-gray-600">
                  {selectedMember.rollno}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </motion.div>
  );
}
