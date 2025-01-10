import { getSettings } from "@/data-access/settings";
import SettingsForm from "../_components/settings-form";

export default async function Settings({params}:{params:{taskId:string}}) {
  const initialSettings = await getSettings(params.taskId)
  if(!initialSettings){
    return <div>Not Found</div>
  }
  return (
    <div className="border-l-[1px] border-t-[1px]  h-screen  border-muted-foreground/20 overflow-scroll bg-neutral-900/60 ">
      <div className="flex flex-col gap-y-2 mt-4 border-b-[1px] border-neutral-700/[0.6]  h-fit">
        <div className="flex flex-row justify-between">
          <h1 className="text-4xl font-normal text-neutral-300 px-6">
            Settings
          </h1>
        </div>
      </div>
      <div className=" w-full p-4 space-y-8">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">General</h2>
          <p className="text-muted-foreground">
            Settings and options for your application.
          </p>
        </div>
        <SettingsForm initialSettings={initialSettings} />
      
      </div>
    </div>
  );
}
