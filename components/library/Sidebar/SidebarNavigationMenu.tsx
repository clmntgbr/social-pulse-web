"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useSocialNetworksContext from "@/contexts/social-networks/hooks";
import { SocialNetworkTypeEnum } from "@/enums/SocialNetworkType";
import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";
import { getSocialNetworksConnect } from "@/store/social-networks/getSocialNetworksConnect";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";
import { ToastFail } from "../Toast";

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

export function SidebarNavigationMenu() {
  const locale = useCurrentLocale();
  const { data } = useSession();
  const router = useRouter();
  const { socialNetworksDispatch } = useSocialNetworksContext();
  const [isLoadingTwitter, setIsLoadingTwitter] = useState(false);
  const [isLoadingFacebook, setIsLoadingFacebook] = useState(false);
  const [isLoadingLinkedin, setIsLoadingLinkedin] = useState(false);
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(false);
  const [isLoadingInstagram, setIsLoadingInstagram] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const onSocialNetworksConnect = async (socialNetworksType: string) => {
    if (isDisabled) {
      return;
    }

    setIsDisabled(true);
    getSocialNetworksConnect(`${data?.accessToken}`, socialNetworksType, locale, socialNetworksDispatch)
      .then((response) => {
        setTimeout(() => {
          router.push(response?.url ?? "");
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setIsDisabled(false);
          setIsLoadingFacebook(false);
          setIsLoadingInstagram(false);
          setIsLoadingLinkedin(false);
          setIsLoadingTwitter(false);
          setIsLoadingYoutube(false);
          ToastFail();
        }, 2000);
      });
  };
  return (
    <NavigationMenu className="absolute left-1/2 transform -translate-x-1/2 ">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href={`/${locale}`} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold hover:text-primary">Social Networks</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-3 gap-2 p-2 w-[345px]">
              <li className="col-span-1">
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    setIsLoadingFacebook(true);
                    onSocialNetworksConnect(SocialNetworkTypeEnum.FACEBOOK);
                  }}
                  className="flex h-full w-full select-none flex-col justify-center items-center rounded-xl facebookButton"
                >
                  {isLoadingFacebook ? (
                    <ReloadIcon className="text-white h-7 w-7 animate-spin" />
                  ) : (
                    <Image
                      src="/images/ri_facebook-fill.svg"
                      alt="Facebook"
                      width={10}
                      height={10}
                      className={`w-10 h-10 transition-all duration-200 invert brightness-0`}
                    />
                  )}
                </button>
              </li>
              <li className="col-span-1">
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    setIsLoadingTwitter(true);
                    onSocialNetworksConnect(SocialNetworkTypeEnum.TWITTER);
                  }}
                  className="flex h-full w-full select-none flex-col justify-center items-center rounded-xl twitterButton"
                >
                  {isLoadingTwitter ? (
                    <ReloadIcon className="text-white h-7 w-7 animate-spin" />
                  ) : (
                    <Image
                      src="/images/ri_twitter-fill.svg"
                      alt="Twitter"
                      width={10}
                      height={10}
                      className={`w-10 h-10 transition-all duration-200 invert brightness-0`}
                    />
                  )}
                </button>
              </li>
              <li className="col-span-1">
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    setIsLoadingYoutube(true);
                    onSocialNetworksConnect(SocialNetworkTypeEnum.YOUTUBE);
                  }}
                  className="flex h-full w-full select-none flex-col justify-center items-center rounded-xl youtubeButton"
                >
                  {isLoadingYoutube ? (
                    <ReloadIcon className="text-white h-7 w-7 animate-spin" />
                  ) : (
                    <Image
                      src="/images/ri_youtube-fill.svg"
                      alt="Youtube"
                      width={10}
                      height={10}
                      className={`w-10 h-10 transition-all duration-200 invert brightness-0`}
                    />
                  )}
                </button>
              </li>
              <li className="col-span-2">
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    setIsLoadingLinkedin(true);
                    onSocialNetworksConnect(SocialNetworkTypeEnum.LINKEDIN);
                  }}
                  className="flex h-full w-full select-none flex-col justify-center items-center rounded-xl linkedinButton"
                >
                  {isLoadingLinkedin ? (
                    <ReloadIcon className="text-white h-7 w-7 animate-spin" />
                  ) : (
                    <Image
                      src="/images/ri_linkedin-fill.svg"
                      alt="Linkedin"
                      width={10}
                      height={10}
                      className={`w-10 h-10 transition-all duration-200 invert brightness-0`}
                    />
                  )}
                </button>
              </li>
              <li className="col-span-1">
                <button
                  disabled={isDisabled}
                  onClick={() => {
                    setIsLoadingInstagram(true);
                    onSocialNetworksConnect(SocialNetworkTypeEnum.INSTAGRAM);
                  }}
                  className="flex h-full w-full select-none flex-col justify-center items-center rounded-xl instagramButton"
                >
                  {isLoadingInstagram ? (
                    <ReloadIcon className="text-white h-7 w-7 animate-spin" />
                  ) : (
                    <Image
                      src="/images/ri_instagram-fill.svg"
                      alt="Instagram"
                      width={10}
                      height={10}
                      className={`w-10 h-10 transition-all duration-200 invert brightness-0`}
                    />
                  )}
                </button>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="font-semibold hover:text-primary">Components</NavigationMenuTrigger>
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
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
