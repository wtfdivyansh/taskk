import { UploadDropzone } from "@/lib/uploadthing";

import { OurFileRouter } from "../api/uploadthing/core";
import { Button } from "@/components/ui/button";
import { FcCancel } from "react-icons/fc";
import { X } from "lucide-react";
interface OurUploadDropzoneProps {
  onChange: (value: string) => void;
  value: string | undefined;
}
export default function OurUploadDropzone({value,onChange}:OurUploadDropzoneProps) {
    if(value){
      return (
        <div className=" flex flex-col items-center w-full">
          <div className=" relative h-40 w-40">
            <img src={value} className="w-40 h-40 rounded-lg" />
            <Button
            type="button"
              onClick={() => onChange("")}
              className="absolute -top-3 -right-5 bg-transparent hover:bg-transparent"
            >
              <X className="bg-transparent hover:bg-rose-500 transition-colors rounded-full text-white " />
            </Button>
          </div>
        </div>
      );
    }
return (
  <div className="flex flex-col items-center w-full">
    <UploadDropzone
      className="bg-transparent w-full  border-2 border-dashed border-nuetral-700/[0.5] hover:bg-neutral-900/10 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 ut-button:hover:cursor-pointer"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        onChange(res?.[0].url);
        
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      
    />
  </div>
);
}
