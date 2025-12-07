import LinkInBioIcon from "../../assets/icons/link-in-bio.svg?react";
import StoreIcon from "../../assets/icons/store.svg?react";
import MediaKitIcon from "../../assets/icons/media-kit.svg?react";
import InvoicingIcon from "../../assets/icons/invoicing.svg?react";

export default function Sidebar() {
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
        return (
          <button
            key={index}
            className="w-10 h-10 flex items-center justify-center grayscale hover:grayscale-0 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
          >
            <Icon className="w-6 h-6" />
          </button>
        );
      })}
    </div>
  );
}
