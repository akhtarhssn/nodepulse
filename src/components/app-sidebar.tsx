"use client";

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/auth/components/subscriptions/hooks/use-subscription";

const menuItems = [
  {
    title: "Workflows",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        href: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        href: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        href: "/executions",
      },
    ],
  },
];

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { hasActiveSubscription, subscription, isLoading } =
    useHasActiveSubscription();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/" prefetch>
              <Image
                src="/logos/logo.svg"
                alt="Logo"
                width={40}
                height={40}
                className="size-10"
              />
              <span className="text-sm font-medium">Nodepulse</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      className="gap-x-4 h-10 px-4"
                      isActive={
                        item.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.href)
                      }
                    >
                      <Link href={item.href} prefetch>
                        <item.icon className="size-4" />
                        <span className="">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to Pro"
                className="gap-x-4 h-10 px-4"
                onClick={() => {
                  authClient.checkout({ slug: "pro" });
                }}
              >
                <StarIcon className="size-4" />
                <span className="">Upgrade to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-4 h-10 px-4"
              onClick={() => {}}
            >
              <CreditCardIcon className="size-4" />
              <span className="">Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign out"
              className="gap-x-4 h-10 px-4"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/login");
                    },
                  },
                })
              }
            >
              <LogOutIcon className="size-4" />
              <span className="">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
