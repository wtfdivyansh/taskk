import { joinBoardViaInvite } from "@/actions/createInvitaion";
import { InviteAcceptButton } from "@/app/components/Buttons/InviteAcceptButton";
import { Button } from "@/components/ui/button";

export default async function JoinPage({ params }: { params: { id: string } }) {
  const board = await joinBoardViaInvite(params.id);
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center  size-72 border border-neutral-700/[0.2] bg-neutral-900/30 rounded-md shadow-md p-4 ">
        <div className="flex flex-col items-center justify-center  ">
          <div className="flex flex-row items-center space-x-2 w-24 h-24 px-2 py-2 bg-neutral-950 shadow-[0_1px_0_0_theme(colors.white/17%)_inset,0_0_0_1px_theme(colors.white/5%)] rounded-md">
            <svg
              fill="#ffffff"
              height="600px"
              width="600px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <g>
                  <path
                    d="M511.083,100.779c-0.171-0.597-0.427-1.152-0.661-1.728c-0.469-1.28-1.067-2.475-1.792-3.627
			c-0.363-0.597-0.725-1.152-1.152-1.685c-0.832-1.088-1.771-2.048-2.795-2.944c-0.469-0.427-0.896-0.875-1.387-1.259
			c-0.149-0.107-0.256-0.235-0.405-0.341c-1.493-1.045-3.093-1.856-4.757-2.496c-0.064-0.021-0.107-0.064-0.171-0.085L263.296,1.28
			c-4.715-1.707-9.877-1.707-14.592,0L14.037,86.613c-0.064,0.021-0.107,0.064-0.171,0.085c-1.664,0.64-3.264,1.451-4.757,2.496
			c-0.149,0.107-0.256,0.235-0.405,0.341c-0.491,0.384-0.917,0.832-1.387,1.259c-1.024,0.896-1.963,1.856-2.795,2.944
			c-0.427,0.533-0.789,1.088-1.152,1.685c-0.725,1.152-1.323,2.347-1.792,3.627c-0.235,0.576-0.491,1.131-0.661,1.728
			C0.363,102.677,0,104.64,0,106.667v298.667c0,8.96,5.611,16.981,14.037,20.053l234.667,85.333c0.149,0.043,0.32,0.021,0.469,0.085
			c2.219,0.747,4.501,1.195,6.827,1.195s4.608-0.448,6.827-1.195c0.149-0.064,0.32-0.043,0.469-0.085l234.667-85.333
			c8.427-3.072,14.037-11.093,14.037-20.053V106.667C512,104.64,511.637,102.677,511.083,100.779z M256,169.301L83.755,106.667
			L256,44.032l172.245,62.635L256,169.301z M469.333,390.4l-192,69.803V206.933l192-69.803V390.4z"
                  />
                </g>
              </g>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">{board.name}</h1>

          <span className="text-muted-foreground text-center">
            You have invited to join {board.name}
          </span>
          <InviteAcceptButton boardId={board.id} />
        </div>
      </div>
    </div>
  );
}
