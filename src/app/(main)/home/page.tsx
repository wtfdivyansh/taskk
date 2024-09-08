export default function Home() {
  return (
    <div className="border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl backdrop-blur-sm border-muted-foreground/20 overflow-scroll mt-2 bg-[#0F1011]">
      <div className="flex flex-col gap-4 relative">
        <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b bg-[#0F1011]">
          Dashboard
        </h1>
      </div>
    </div>
  );
}