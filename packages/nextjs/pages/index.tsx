import React, { useEffect, useState } from "react";
import Head from "next/head";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Contributions } from "~~/components/Contributions";
import { HackerStreams } from "~~/components/HackerStreams";
import { StreamContract } from "~~/components/StreamContract";
import { useScaffoldContractRead, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

type BuilderData = {
  cap: BigNumber;
  unlockedAmount: BigNumber;
  builderAddress: string;
};

const Home: NextPage = () => {
  const { address } = useAccount();

  const [builderList, setBuilderList] = useState<string[]>([]);

  const { data: allBuildersData, isLoading: isLoadingBuilderData } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "allBuildersData",
    args: [builderList],
  });

  const { data: withdrawEvents, isLoading: isLoadingWithdrawEvents } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "Withdraw",
    fromBlock: Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) || 0,
    blockData: true,
  });

  const { data: addBuilderEvents, isLoading: isLoadingBuilderEvents } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "AddBuilder",
    fromBlock: Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) || 0,
  });

  useEffect(() => {
    if (addBuilderEvents && addBuilderEvents.length > 0) {
      const fetchedBuilderList = addBuilderEvents.map((event: any) => event.args.to);
      // remove duplicates
      const uniqueBuilderList = [...new Set(fetchedBuilderList)];
      setBuilderList(uniqueBuilderList);
    }
  }, [addBuilderEvents]);

  const amIAStreamedBuilder = allBuildersData?.some(
    (builderData: BuilderData) => builderData.builderAddress === address,
  );

  return (
    <>
      <Head>
        <title>BuidlGuidl Outreach</title>
        <meta
          name="description"
          content="We're running an experiment to fund open-source ethereum community builders by providing a monthly ETH reward for their ongoing contributions to the ecosystem."
        />
        <meta property="og:title" content="BuidlGuidl Outreach" />
        <meta
          property="og:description"
          content="We're running an experiment to fund open-source ethereum community builders by providing a monthly ETH reward for their ongoing contributions to the ecosystem."
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_VERCEL_URL || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10 mb-20 mx-auto font-grotesk gap-5">
        <h1 className="font-bold text-4xl pb-8 visible md:hidden">Your Hacker House</h1>
        <div className="max-w-[42rem] m-auto w-[90%] bg-secondary px-8 py-4 rounded-2xl">
          <p>
            We're running an experiment to fund open-source ethereum community builders by providing a monthly ETH
            reward for their ongoing contributions to the ecosystem.
          </p>
          <p>
            We are specifically looking for high-impact, under-funded, and edge-case community builders. Visit{" "}
            <a href="https://buidlguidl.com">BuidlGuidl.com</a> to learn more.
          </p>
          <p>
            Community builders submit their contributions (stored in a Smart Contract), automatically claim grant
            streams, and showcase their work to the public.
          </p>
        </div>

        <div className="max-w-[42rem] m-auto w-[90%] bg-secondary rounded-2xl">
          <h2 className="font-bold text-2xl px-8 py-4 border-b-2">Community Builder Streams</h2>
          <div>
            <HackerStreams
              allBuildersData={allBuildersData}
              withdrawEvents={withdrawEvents}
              isLoadingBuilderData={isLoadingBuilderData}
              isLoadingBuilderEvents={isLoadingBuilderEvents}
            />
          </div>
          <h2 className="font-bold text-2xl px-8 py-4 border-b-2 bg-accent">Contract Details</h2>
          <div className="p-0 bg-accent rounded-b-2xl">
            <StreamContract amIAStreamedBuilder={amIAStreamedBuilder} />
          </div>
        </div>

        <div className="max-w-[42rem] m-auto w-[90%] bg-secondary rounded-2xl">
          <h2 className="font-bold text-2xl px-8 py-4 border-b-2">Contributions</h2>
          <div className="p-0">
            <Contributions withdrawEvents={withdrawEvents} isLoadingWithdrawEvents={isLoadingWithdrawEvents} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
