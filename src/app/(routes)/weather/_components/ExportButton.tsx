"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { convertToCSV } from "@/app/(routes)/weather/_actions/exportData";
import { toast } from "@/components/ui/use-toast";

interface ExportButtonProps {
  data: Record<string, any>[];
  filename: string;
}

export default function ExportButton({ data, filename }: ExportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const csvData = await convertToCSV(data);
      if (!csvData) {
        toast({ title: "Error", description: "No data to export", variant: "destructive" });
        return;
      }

      const blob = new Blob([csvData], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({ title: "Success", description: `${filename} downloaded!` });
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Export failed", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleExport} 
      size="sm" 
      variant="outline"
      disabled={isLoading}
      aria-label="Export data as CSV"
    >
      {isLoading ? (
        "Exporting..."
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" /> 
          Export
        </>
      )}
    </Button>
  );
}