import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t px-4 lg:px-48 bg-subtle-gray">
      <div className=" flex flex-col gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <Link href="#" className="font-medium underline underline-offset-4">
              Odin Labs
            </Link>
            . 2024 All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
