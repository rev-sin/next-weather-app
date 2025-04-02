// app/(routes)/weather/_actions/exportData.ts


export const convertToCSV = (data: any[]) => {
  if (!data || data.length === 0) return null;
  
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row => 
    Object.values(row).map(value => 
      typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
    ).join(",")
  );

  return [headers, ...rows].join("\n");
};

