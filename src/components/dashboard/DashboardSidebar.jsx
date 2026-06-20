import {
  LayoutDashboard,
  History,
  BookOpen,
  MessageSquare,
  PlusCircle,
  Boxes,
  Truck,
  ClipboardCheck,
  Users,
  Library,
  ReceiptIndianRupee,
} from "lucide-react";

import { Button, Drawer } from "@heroui/react";
import { ChartArea } from "lucide-react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Bars } from "@gravity-ui/icons";

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.role || "librarian";

  const dashboardItems = {
    users: [
      { icon: LayoutDashboard, href: "/dashboard/user", label: "Overview" },
      {
        icon: History,
        href: "/dashboard/user/delivery",
        label: "Delivery History",
      },
      {
        icon: BookOpen,
        href: "/dashboard/user/list",
        label: "My Reading List",
      },
      {
        icon: MessageSquare,
        href: "/dashboard/user/reviews",
        label: "My Reviews",
      },
    ],
    librarian: [
      {
        icon: LayoutDashboard,
        href: "/dashboard/librarian",
        label: "Overview",
      },
      {
        icon: PlusCircle,
        href: "/dashboard/librarian/bookadd",
        label: "Add Book",
      },
      {
        icon: Boxes,
        href: "/dashboard/librarian/inventory",
        label: "Manage Inventory",
      },
      {
        icon: Truck,
        href: "/dashboard/librarian/deliveries",
        label: "Manage Deliveries",
      },
    ],
    admin: [
      { icon: LayoutDashboard, href: "/dashboard/admin", label: "Overview" },
      {
        icon: ClipboardCheck,
        href: "/dashboard/admin/book",
        label: "Book Approval Queue",
      },
      {
        icon: Users,
        href: "/dashboard/admin/users",
        label: "Manage Users",
      },
      {
        icon: Library,
        href: "/dashboard/admin/managebook",
        label: "Manage All Books",
      },
      {
        icon: ReceiptIndianRupee,
        href: "/dashboard/admin/viewall",
        label: "View All Transactions",
      },
    ],
  };

  const navItems = dashboardItems[role];
 
  return (
    <Drawer>
      <Button className="lg:hidden" variant="secondary">
        <Bars />
        Menu
      </Button>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-white" />
            {item.label}
          </button>
        ))}
      </nav>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
