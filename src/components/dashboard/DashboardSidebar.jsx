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
  UserIcon,
  Home,
} from "lucide-react";

import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Bars } from "@gravity-ui/icons";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.role || "users";

  const dashboardItems = {
    user: [
      { icon: LayoutDashboard, href: "/dashboard/user", label: "Overview" },
      { icon: History, href: "/dashboard/user/delivery", label: "Delivery History" },
      { icon: BookOpen, href: "/dashboard/user/readinglist", label: "My Reading List" },
      { icon: MessageSquare, href: "/dashboard/user/reviews", label: "My Reviews" },
    ],
    users: [
      { icon: LayoutDashboard, href: "/dashboard/user", label: "Overview" },
      { icon: History, href: "/dashboard/user/delivery", label: "Delivery History" },
      { icon: BookOpen, href: "/dashboard/user/readinglist", label: "My Reading List" },
      { icon: MessageSquare, href: "/dashboard/user/reviews", label: "My Reviews" },
    ],
    librarian: [
      {
        icon: LayoutDashboard,
        href: "/dashboard/librarian",
        label: "Overview",
      },
      {
        icon: PlusCircle,
        href: "/dashboard/librarian/addbook",
        label: "Add Book",
      },
      {
        icon: Boxes,
        href: "/dashboard/librarian/manage",
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
        href: "/dashboard/admin/approve",
        label: "Book Approval Queue",
      },
      {
        icon: Users,
        href: "/dashboard/admin/users",
        label: "Manage Users",
      },
      {
        icon: Library,
        href: "/dashboard/admin/allbooks",
        label: "Manage All Books",
      },
      {
        icon: ReceiptIndianRupee,
        href: "/dashboard/admin/viewall",
        label: "View All Transactions",
      },
    ],
  };

  const navItems = dashboardItems[role] || [];

  return (
    <Drawer>
      <Button className="lg:hidden" variant="secondary">
        <Bars />
        Menu
      </Button>
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 min-w-10 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center border border-white/10">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User avatar"}
                fill
                className="object-cover"
                sizes="40px"
              />
            ) : (
              <UserIcon className="text-white/20 text-2xl" />
            )}
          </div>

          <div className="overflow-hidden">
            <p className="text-white text-sm font-bold truncate leading-tight">
              {user?.name || "Guest"}
            </p>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${role === "users" || role === "user"
                  ? "text-yellow-400"
                  : role === "librarian"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
            >
              {role === "users" || role === "user" ? "User" : role}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white/10 text-white font-medium border-b border-white/5 mb-2"
        >
          <Home className="size-5 text-zinc-400" />
          <span>Back to Home</span>
        </Link>

        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-default"
            type="button"
          >
            <item.icon className="size-5 text-white" />
            <span className="text-white font-medium">{item.label}</span>
          </Link>
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
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-white/10 text-white font-medium border-b border-white/5 mb-2"
                >
                  <Home className="size-5 text-zinc-400" />
                  <span>Back to Home alskjf lkdj;lkj</span>
                </Link>

                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    <span className="text-white font-medium">{item.label}</span>
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
