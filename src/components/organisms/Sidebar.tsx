import { useState } from "react";
import LinkInBioIcon from "../../assets/icons/link-in-bio.svg?react";
import StoreIcon from "../../assets/icons/store.svg?react";
import MediaKitIcon from "../../assets/icons/media-kit.svg?react";
import InvoicingIcon from "../../assets/icons/invoicing.svg?react";

export default function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sidebarItems = [
    { icon: LinkInBioIcon, name: "Link in Bio" },
    { icon: StoreIcon, name: "Store" },
    { icon: MediaKitIcon, name: "Media Kit" },
    { icon: InvoicingIcon, name: "Invoicing" },
  ];

  return (
    <div className="fixed w-12 h-[192px] rounded-[100px] bg-white p-1 flex flex-col justify-between shadow-sidebar top-[310px] left-4">
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        const isHovered = hoveredIndex === index;
        return (
          <div
            key={index}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <button className="w-10 h-10 flex items-center justify-center grayscale hover:grayscale-0 hover:bg-gray-100 rounded-full transition-all cursor-pointer">
            <Icon className="w-6 h-6" />
          </button>
            {isHovered && (
              <div className="absolute left-[52px] top-1/2 -translate-y-1/2 z-50 pointer-events-none">
                <div className="relative bg-black-300 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
                    <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-black-300" />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
