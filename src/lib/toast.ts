// lib/toast.ts
"use client"

import { toast } from "@/components/ui/use-toast";

export const showToast = (
  title: string,
  description: string,
  variant: "default" | "destructive" = "default"
) => {
  toast({ title, description, variant });
};