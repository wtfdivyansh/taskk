"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { cateogaryModalStore } from "@/hooks/use-modal-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export default function TagSelect({onChange,SelectedTags}:{onChange:()=>void,SelectedTags:string[]}) {
    const {setIsOpen} = cateogaryModalStore()
     const query = useQuery({
       queryKey: ["tags"],
       queryFn: async () => {
         const res = await axios.get("/api/tags");
         return res.data;
       },
     });
   const tags:Option[] = query.data?.map((tag: any) => ({
     label: tag.name,
     value: tag.name,
   })) || []
   const selectedTags:Option[] = SelectedTags.map((tag: any) => ({
     label: tag,
     value: tag,
   })) || []
  return (
    <div className="space-y-2">
      <Label>Multiselect</Label>
      <MultipleSelector
        commandProps={{
          label: "Select frameworks",
        }}
        onChange={onChange}
        value={selectedTags}
        defaultOptions={tags}
        placeholder="Select Tags"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          >
            Add a tag
          </Button>
        }
      />
    </div>
  );
}
