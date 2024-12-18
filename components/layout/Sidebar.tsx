"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileCard from "../dashboard/ProfileCard";
import { RiHomeLine } from "react-icons/ri";
import { signOut } from "next-auth/react";
import { modes } from "@/app/lib/content/modes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useMode } from "@/store/useMode";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { setSelectedMode } = useMode();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <aside className="flex flex-col gap-6 h-full px-3">
      <div className="flex w-full justify-between items-center h-[60px]">
        <span className="text-2xl font-semibold text-white uppercase">
          flui.ai
        </span>
        <button
          onClick={handleSignOut}
          className="rounded-full p-2 bg-dark-gray hover:bg-gray-three"
        >
          <RiHomeLine className="text-gray-three hover:text-dark-gray" />
        </button>
      </div>

      {/* Updated Mode List with Accordion */}
      <div className="flex flex-col gap-2 rounded-3xl bg-dark-gray p-4 overflow-hidden">
        <p className="text-sm font-semibold uppercase text-gray-three">Modes</p>

        <ScrollArea className="flex-grow">
          <Accordion type="single" collapsible className="w-full">
            {modes.map((mode) => (
              <AccordionItem
                key={mode.title}
                value={mode.title}
                className="border-none mb-1"
              >
                <AccordionTrigger className="hover:no-underline py-2 px-4 bg-dark-gray-two hover:bg-gray-four rounded-3xl">
                  <div className="flex items-center gap-3">
                    {mode.icon && (
                      <span className="text-white text-xl">{mode.icon}</span>
                    )}
                    <span className="text-lg text-white font-semibold">
                      {mode.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pt-2">
                  <div className="text-sm text-gray-three mb-3">
                    {mode.description}
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-main-green transition-all duration-300"
                    onClick={() => {
                      setSelectedMode(mode);
                    }}
                  >
                    Start Mode
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </div>

      {/* Profile Card */}
      <ProfileCard
        name="FLUI"
        description="I'm your language learning tutor! With me, we'll get you speaking fluently in no time!"
      />
    </aside>
  );
};

export default Sidebar;
