"use client"

import { ChevronLeft } from "lucide-react";
import React from "react"

export default function Back() {
  return (
    <div className="w-8 h-8 absolute top-0 mt-4 rounded-full cursor-pointer "
    onClick={() => window.history.back()}
    >
    <ChevronLeft size={24} className="text-black"/>
    </div>
  );
}