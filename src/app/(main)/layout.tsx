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
      <div className="min-h-screen overflow-hidden flex">
          <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </ModalProvider>
  );
}
