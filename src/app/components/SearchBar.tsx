"use client"
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
export default function SearchBar() {
  const router = useRouter()
  const [search, setSearch] = useState("");
  useEffect(() => {
    const debounce = ()=>{
      const timer=setTimeout(() => {
        router.push(`?search=${search}`);
      }, 0);
      console.log("timer", timer);
      return () => clearTimeout(timer);
    }
    debounce()
  }, [search]);
    return (
      <div className="relative flex items-center  max-w-2xl">
        <FiSearch className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-neutral-600" />
        <Input
          placeholder="Search tasks.."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
  
          className=" pl-8 border border-neutral-700/[0.2] shadow-sm focus-visible:offset-1 focus-visible:ring-neutral-900 focus-visible:outline-none focus-visible:ring-0 w-64"
        />
      </div>
    );
}      