import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 p-0 sm:p-4 font-grotesk">
      <div className="flex items-center justify-center mb-4 sm:mb-0 invisible md:visible">
        <Image src="/logo.svg" alt="Hacker House Logo" width={40} height={40} className="mx-4" />
        <div className="flex-col items-start">
          <p className="m-0 text-xl md:text-3xl font-bold !leading-7">
            <Link href="/">BuidlGuidl Outreach</Link>{" "}
          </p>
          <p className="m-0 mt-1 text-sm md:text-base">
            <a href="https://twitter.com/austingriffith/status/1674444986463719424?s=20"> cohort stream</a>
          </p>
        </div>
      </div>
      <div className="navbar-end flex-grow mr-4 flex justify-center sm:justify-end">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
