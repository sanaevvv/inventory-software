export const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto py-10 bg-white rounded-md shadow mt-4">
      {children}
    </div>
  );
};
