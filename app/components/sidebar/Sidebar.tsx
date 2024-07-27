import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = async ({ children }) => {
  let currentUser = null;

  try {
    currentUser = await getCurrentUser();
  } catch (error) {
    console.error("Failed to get current user", error);
    // Handle the error or show a fallback UI
  }

  return (
    <div className="h-full">
      {currentUser ? (
        <>
          <DesktopSidebar currentUser={currentUser} />
          <MobileFooter />
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      )}
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;
