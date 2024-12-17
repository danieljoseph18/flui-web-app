import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight } from "lucide-react";
import ProfileCard from "../dashboard/ProfileCard";
import { RiHomeLine } from "react-icons/ri";
import Link from "next/link";
import { scenarios } from "@/app/lib/content/scenarios";

const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-6 h-full px-3">
      <div className="flex w-full justify-between items-center h-[60px]">
        <span className="text-2xl font-semibold text-white">flui.ai</span>
        <Link
          href="/"
          className="rounded-full p-2 bg-dark-gray hover:bg-gray-three"
        >
          <RiHomeLine className="text-gray-three hover:text-dark-gray" />
        </Link>
      </div>

      {/* Scenarios List */}

      <div className="flex flex-col gap-2 rounded-3xl bg-dark-gray p-4 overflow-hidden">
        <div className="flex items-center justify-between w-full py-2">
          <span className="text-sm font-semibold uppercase text-gray-three">
            Scenarios
          </span>
          <Link
            href="/"
            className="rounded-full p-2 bg-dark-gray-two hover:bg-gray-three"
          >
            <ArrowUpRight className="text-gray-three hover:text-dark-gray" />
          </Link>
        </div>
        <ScrollArea className="flex-grow">
          <div className="w-full">
            {scenarios.map((scenario) => (
              <Link href="#" key={scenario.title} className="">
                <div className="flex flex-col py-2 gap-1 bg-dark-gray-two hover:bg-gray-four rounded-3xl px-4 mb-1">
                  <div className="text-lg text-white font-semibold">
                    {scenario.title}
                  </div>
                  <div className="text-sm text-gray-three">
                    {scenario.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Profile Card */}

      <ProfileCard
        name="FLUI"
        description="I'm your language learning tutor! With me, we'll get you speaking fluently in no time!"
        avatar="/placeholder.svg?height=128&width=128"
      />
    </aside>
  );
};

export default Sidebar;
