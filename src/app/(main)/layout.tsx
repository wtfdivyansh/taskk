import ModalProvider from "@/providers/modal-provider";
import Sidebar from "../components/sidebar";
import { Toaster } from "react-hot-toast";
import "react-big-calendar/lib/css/react-big-calendar.css";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <Toaster />
      <div className="w-full h-full flex">
        <Sidebar />
        <div className="w-[80%] justify-end ">{children}</div>
      </div>
      
    </ModalProvider>
  );
}
