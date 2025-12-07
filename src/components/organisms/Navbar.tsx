import { useState, useEffect, useRef } from "react";
import mainstackLogo from "../../assets/logos/mainstack-logo.svg";
import HomeIcon from "../../assets/icons/home.svg?react";
import AnalyticsIcon from "../../assets/icons/analytics.svg?react";
import RevenueIcon from "../../assets/icons/revenue.svg?react";
import CrmIcon from "../../assets/icons/crm.svg?react";
import AppsIcon from "../../assets/icons/apps.svg?react";
import NotificationsIcon from "../../assets/icons/notifications.svg?react";
import ChatIcon from "../../assets/icons/chat.svg?react";
import MenuIcon from "../../assets/icons/menu.svg?react";
import ChevronDownIcon from "../../assets/icons/chevron-down.svg?react";
import LinkInBioIcon from "../../assets/icons/link-in-bio.svg?react";
import StoreIcon from "../../assets/icons/store.svg?react";
import MediaKitIcon from "../../assets/icons/media-kit.svg?react";
import InvoicingIcon from "../../assets/icons/invoicing.svg?react";
import { CiSettings, CiLogout } from "react-icons/ci";
import { GoBug } from "react-icons/go";
import { MdSwitchAccount, MdCardGiftcard } from "react-icons/md";
import { IoReceiptOutline, IoChevronForward } from "react-icons/io5";
import { useUser } from "../../queries/revenue.queries";
import { getUserInitials } from "../../utils";
import Skeleton from "../atoms/Skeleton";

export default function Navbar() {
  const { data: userData, isLoading: userLoading } = useUser();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAppsExpanded, setIsAppsExpanded] = useState(false);
  const [isLinkInBioMenuOpen, setIsLinkInBioMenuOpen] = useState(false);
  const [isLinkInBioAnimating, setIsLinkInBioAnimating] = useState(false);
  const [isLinkInBioMounted, setIsLinkInBioMounted] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const linkInBioMenuRef = useRef<HTMLDivElement>(null);

  const profileMenuOptions = [
    { name: "Settings", icon: CiSettings },
    { name: "Purchase History", icon: IoReceiptOutline },
    { name: "Refer and Earn", icon: MdCardGiftcard },
    { name: "Integrations", icon: AppsIcon },
    { name: "Report Bug", icon: GoBug },
    { name: "Switch Account", icon: MdSwitchAccount },
    { name: "Sign Out", icon: CiLogout },
  ];

  const linkInBioMenuOptions = [
    {
      icon: LinkInBioIcon,
      title: "Link in Bio",
      description: "Manage your Link in Bio",
    },
    {
      icon: StoreIcon,
      title: "Store",
      description: "Manage your Store Activities",
    },
    {
      icon: MediaKitIcon,
      title: "Media Kit",
      description: "Manage your Media Kit",
    },
    {
      icon: InvoicingIcon,
      title: "Invoicing",
      description: "Manage your Invoices",
    },
  ];

  const navLinks = [
    { name: "Home", icon: HomeIcon },
    { name: "Analytics", icon: AnalyticsIcon },
    { name: "Revenue", icon: RevenueIcon },
    { name: "CRM", icon: CrmIcon },
    { name: "Apps", icon: AppsIcon },
  ];

  const linkStyles = {
    Home: {
      link: "text-gray-400 hover:text-gray-900",
      icon: "fill-gray-400 group-hover:fill-gray-900",
    },
    Analytics: {
      link: "text-gray-400 hover:text-gray-900",
      icon: "fill-gray-400 group-hover:fill-gray-900",
    },
    Revenue: {
      link: "bg-black-300 text-white",
      icon: "fill-white",
    },
    CRM: {
      link: "text-gray-400 hover:text-gray-900",
      icon: "fill-gray-400 group-hover:fill-gray-900",
    },
    Apps: {
      link: "text-gray-400 hover:text-gray-900",
      icon: "fill-gray-400 group-hover:fill-gray-900",
    },
  };

  const getLinkStyle = (linkName: string) => {
    return linkStyles[linkName as keyof typeof linkStyles];
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsProfileMenuOpen(false);
          setIsMounted(false);
          setIsAnimating(false);
        }, 200);
      }
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setIsAppsExpanded(false);
      }
      if (
        linkInBioMenuRef.current &&
        !linkInBioMenuRef.current.contains(event.target as Node)
      ) {
        setIsLinkInBioAnimating(true);
        setTimeout(() => {
          setIsLinkInBioMenuOpen(false);
          setIsLinkInBioMounted(false);
          setIsLinkInBioAnimating(false);
        }, 200);
      }
    };

    if (isProfileMenuOpen || isAppsExpanded || isLinkInBioMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen, isAppsExpanded, isLinkInBioMenuOpen]);

  const handleProfileMenuToggle = () => {
    if (!isProfileMenuOpen) {
      setIsMounted(true);
      setIsAnimating(true);
      setIsProfileMenuOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(false);
        });
      });
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsProfileMenuOpen(false);
        setIsMounted(false);
        setIsAnimating(false);
      }, 200);
    }
  };

  const handleMenuOptionClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsProfileMenuOpen(false);
      setIsMounted(false);
      setIsAnimating(false);
    }, 200);
  };

  const handleLinkInBioMenuToggle = () => {
    if (!isLinkInBioMenuOpen) {
      setIsLinkInBioMounted(true);
      setIsLinkInBioAnimating(true);
      setIsLinkInBioMenuOpen(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsLinkInBioAnimating(false);
        });
      });
    } else {
      setIsLinkInBioAnimating(true);
      setTimeout(() => {
        setIsLinkInBioMenuOpen(false);
        setIsLinkInBioMounted(false);
        setIsLinkInBioAnimating(false);
      }, 200);
    }
  };

  const handleLinkInBioOptionClick = () => {
    setIsLinkInBioAnimating(true);
    setTimeout(() => {
      setIsLinkInBioMenuOpen(false);
      setIsLinkInBioMounted(false);
      setIsLinkInBioAnimating(false);
    }, 200);
  };

  const handleAppsClick = () => {
    setIsAppsExpanded(true);
    setIsLinkInBioMounted(true);
    setIsLinkInBioAnimating(true);
    setIsLinkInBioMenuOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsLinkInBioAnimating(false);
      });
    });
  };

  return (
    <nav className="w-full h-16 bg-white border-2 border-white rounded-[100px] shadow-[0px_2px_4px_0px_rgba(45,59,67,0.051),0px_2px_6px_0px_rgba(45,59,67,0.059)] flex items-center justify-between p-3">
      <div className="flex items-center">
        <img src={mainstackLogo} alt="Mainstack Logo" className="w-9 h-9" />
      </div>

      <div className="flex items-center gap-6">
        {navLinks.map((link) => {
          if (link.name === "Apps") {
            return (
              <div key={link.name} ref={appsRef} className="relative">
                {isAppsExpanded ? (
                  <div className="relative" ref={linkInBioMenuRef}>
                    <div className="flex items-center bg-black-300 rounded-full overflow-hidden h-10">
                      <button className="flex items-center gap-2 px-4 py-2 h-full text-white transition-colors hover:bg-black-300/90">
                        <AppsIcon className="w-5 h-5 text-white [&>path]:fill-white" />
                        <span className="leading-6">Apps</span>
                      </button>
                      <div className="w-px h-full bg-white/20"></div>
                      <button
                        onClick={handleLinkInBioMenuToggle}
                        className="flex items-center gap-2 px-4 py-2 h-full text-white transition-colors hover:bg-black-300/90"
                      >
                        <span className="leading-6">Link In Bio</span>
                        <ChevronDownIcon className="w-3 h-3 ml-1 text-white [&>path]:fill-white" />
                      </button>
                    </div>
                    {isLinkInBioMounted && (
                      <div
                        className={`absolute right-0 top-[calc(100%+8px)] z-50 w-[360px] bg-white rounded-lg transition-all duration-200 ease-in-out p-2 shadow-[0px_6px_12px_0px_rgba(92,115,131,0.08),0px_4px_8px_0px_rgba(92,115,131,0.08)] ${
                          isLinkInBioAnimating
                            ? isLinkInBioMenuOpen
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 -translate-y-2"
                            : "opacity-100 translate-y-0"
                        }`}
                      >
                        {linkInBioMenuOptions.map((option, index) => {
                          const Icon = option.icon;
                          return (
                            <div
                              key={index}
                              onClick={handleLinkInBioOptionClick}
                              className="flex items-center cursor-pointer rounded-md transition-all p-[14px] gap-3 hover:shadow-sm mb-2 last:mb-0 group"
                            >
                              <div className="w-8 h-8 rounded-md border border-gray-200 flex items-center justify-center">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col flex-1">
                                <span className="font-medium text-sm leading-6 tracking-[-0.4px] text-black-300">
                                  {option.title}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {option.description}
                                </span>
                              </div>
                              <IoChevronForward className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleAppsClick}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full group ${
                      getLinkStyle(link.name).link
                    }`}
                  >
                    <link.icon
                      className={`w-5 h-5 ${getLinkStyle(link.name).icon}`}
                    />
                    <span className="leading-6">{link.name}</span>
                  </button>
                )}
              </div>
            );
          }
          const style = getLinkStyle(link.name);
          return (
            <a
              key={link.name}
              href="#"
              className={`flex items-center gap-2 px-4 py-2 rounded-full group ${style.link}`}
            >
              <link.icon className={`w-5 h-5 ${style.icon}`} />
              <span className="leading-6">{link.name}</span>
            </a>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
          <NotificationsIcon className="w-5 h-5 fill-gray-400" />
        </button>

        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
          <ChatIcon className="w-5 h-5 fill-gray-400" />
        </button>

        {userLoading ? (
          <Skeleton
            width={81}
            height={40}
            variant="rectangular"
            className="rounded-[100px]"
          />
        ) : userData ? (
          <div className="relative" ref={profileMenuRef}>
            <div
              onClick={handleProfileMenuToggle}
              className="w-[81px] bg-profile-bg cursor-pointer rounded-[100px] py-1 px-[5px] flex items-center gap-x-2"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-profile-gradient">
                <span className="text-profile-gradient">
                  {getUserInitials(userData)}
                </span>
              </div>
              <MenuIcon className="w-6 h-6 fill-gray-400" />
            </div>
            {isMounted && (
              <div
                className={`absolute right-0 top-[calc(100%+8px)] z-50 w-[360px] bg-white rounded-lg transition-all duration-200 ease-in-out p-2 shadow-[0px_6px_12px_0px_rgba(92,115,131,0.08),0px_4px_8px_0px_rgba(92,115,131,0.08)] ${
                  isAnimating
                    ? isProfileMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                    : "opacity-100 translate-y-0"
                }`}
              >
                <div className="flex items-center gap-3 p-[14px]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-profile-gradient">
                    <span className="text-profile-gradient">
                      {getUserInitials(userData)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-base leading-6 tracking-[-0.4px] text-black-300">
                      {userData.first_name} {userData.last_name}
                    </span>
                    <span className="text-sm text-gray-400">
                      {userData.email}
                    </span>
                  </div>
                </div>
                {profileMenuOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.name}
                      onClick={handleMenuOptionClick}
                      className="flex items-center cursor-pointer hover:bg-gray-50 rounded-md transition-colors p-[14px] gap-3"
                    >
                      {Icon && <Icon className="w-5 h-5 text-gray-400" />}
                      <span className="font-medium text-sm leading-6 tracking-[-0.4px] text-black-300">
                        {option.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
