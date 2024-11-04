"use client";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ToastAction } from "@/components/ui/toast";
import useSocialAccountsContext from "@/contexts/social_accounts/hooks";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getFacebookLoginUrl } from "@/store/social_accounts/getFacebookLoginUrl";
import { getLinkedinLoginUrl } from "@/store/social_accounts/getLinkedinLoginUrl";
import { getTwitterLoginUrl } from "@/store/social_accounts/getTwitterLoginUrl";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function Menu() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { socialAccountsDispatch } = useSocialAccountsContext();

  const onFacebookLoginUrl = async () => {
    getFacebookLoginUrl(session?.accessToken ?? "", pathname, socialAccountsDispatch)
      .then((response) => {
        router.push(response?.value ?? "");
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  const onLinkedinLoginUrl = async () => {
    getLinkedinLoginUrl(session?.accessToken ?? "", pathname, socialAccountsDispatch)
      .then((response) => {
        router.push(response?.value ?? "");
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  const onTwitterLoginUrl = async () => {
    getTwitterLoginUrl(session?.accessToken ?? "", pathname, socialAccountsDispatch)
      .then((response) => {
        router.push(response?.value ?? "");
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Réseaux sociaux</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-2 gap-2 p-2 w-[230px]">
              <li className="col-span-1">
                <button onClick={onFacebookLoginUrl} className="flex h-full w-full select-none flex-col justify-center items-center rounded-xl facebookButton">
                  <Facebook size="40" strokeWidth="0.5" color="#ffffff" fill="#ffffff" />
                </button>
              </li>
              <li className="col-span-1">
                <button onClick={onTwitterLoginUrl} className="flex h-full w-full select-none flex-col justify-center items-center rounded-xl twitterButton">
                  <Twitter size="40" strokeWidth="0.5" color="#ffffff" fill="#ffffff" />
                </button>
              </li>
              <li className="col-span-2">
                <button onClick={onLinkedinLoginUrl} className="flex h-full w-full select-none flex-col justify-center items-center rounded-xl linkedinButton">
                  <Linkedin size="40" strokeWidth="0.5" color="#ffffff" fill="#ffffff" />
                </button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Documentation</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
