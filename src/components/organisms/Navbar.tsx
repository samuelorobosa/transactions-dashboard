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
import { CiSettings, CiLogout } from "react-icons/ci";
import { GoBug } from "react-icons/go";
import { MdSwitchAccount, MdCardGiftcard, MdExtension } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { useUser } from "../../queries/revenue.queries";
import { getUserInitials } from "../../utils";
import Skeleton from "../atoms/Skeleton";

export default function Navbar() {
  const { data: userData, isLoading: userLoading } = useUser();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const profileMenuOptions = [
    { name: "Settings", icon: CiSettings },
    { name: "Purchase History", icon: IoReceiptOutline },
    { name: "Refer and Earn", icon: MdCardGiftcard },
    { name: "Integrations", icon: MdExtension },
    { name: "Report Bug", icon: GoBug },
    { name: "Switch Account", icon: MdSwitchAccount },
    { name: "Sign Out", icon: CiLogout },
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
    };

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileMenuOpen]);

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

  const handleMenuOptionClick = (option: string) => {
    console.log(`Clicked: ${option}`);
    setIsAnimating(true);
    setTimeout(() => {
      setIsProfileMenuOpen(false);
      setIsMounted(false);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <nav className="w-full h-16 bg-white border-2 border-white rounded-[100px] shadow-[0px_2px_4px_0px_rgba(45,59,67,0.051),0px_2px_6px_0px_rgba(45,59,67,0.059)] flex items-center justify-between p-3">
      {/* Brand Logo */}
      <div className="flex items-center">
        <img src={mainstackLogo} alt="Mainstack Logo" className="w-9 h-9" />
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) => {
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

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon */}
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
          <NotificationsIcon className="w-5 h-5 fill-gray-400" />
        </button>

        {/* Chat Icon */}
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full">
          <ChatIcon className="w-5 h-5 fill-gray-400" />
        </button>

        {/* Profile Menu with Initials */}
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
                className={`absolute right-0 z-50 w-[240px] bg-white rounded-lg transition-all duration-200 ease-in-out ${
                  isAnimating
                    ? isProfileMenuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                    : "opacity-100 translate-y-0"
                }`}
                style={{
                  top: "calc(100% + 8px)",
                  boxShadow:
                    "0px 6px 12px 0px rgba(92, 115, 131, 0.08), 0px 4px 8px 0px rgba(92, 115, 131, 0.08)",
                  padding: "8px",
                }}
              >
                {profileMenuOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <div
                      key={option.name}
                      onClick={() => handleMenuOptionClick(option.name)}
                      className="flex items-center cursor-pointer hover:bg-gray-50 rounded-md transition-colors p-[14px] gap-3"
                    >
                      {Icon && <Icon className="w-5 h-5 text-gray-400" />}
                      <span className="font-semibold text-base leading-6 tracking-[-0.4px] text-black-300">
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
