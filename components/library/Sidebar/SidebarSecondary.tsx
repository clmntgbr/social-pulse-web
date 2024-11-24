import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LifeBuoy, MessageCircleQuestion, Send, Settings2 } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
  },
  {
    title: "Help",
    url: "#",
    icon: MessageCircleQuestion,
  },
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
];

export function SidebarSecondary({ ...props }: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="hover:bg-accent rounded-xl">
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
