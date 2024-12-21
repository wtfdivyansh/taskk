"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { cateogaryModalStore } from "@/hooks/use-modal-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export default function TagSelect({onChange,SelectedTags}:{onChange:()=>void,SelectedTags:Option[]}) {
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
   const selectedTags:Option[] = SelectedTags.map((tag: Option) => ({
     label: tag.label,
     value: tag.value,
   })) || []
   console.log("selected",selectedTags)
   console.log("tags",tags)
  return (
    <div className="space-y-1">
      <MultipleSelector
        commandProps={{
          label: "Select Tags",
        }}
        onChange={onChange}
        value={selectedTags}
        options={tags}
        defaultOptions={[]}
        placeholder="Select Tags"
        loadingIndicator="Loading..."
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
