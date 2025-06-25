import Link from "next/link";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import classNames from "classnames";
import { ChevronUp } from "lucide-react";
import { useMediaQuery } from "react-responsive";

import Methodology from "@/app/methodology";
import {
  DonutCharts,
  TabularData,
  TotalCasualties,
} from "@/features/country-view/components/stats/overall";

interface StatsProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function Stats({ show, setShow }: StatsProps) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" });

  const [showDrawer, setShowDrawer] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(isTabletOrMobile);

  useEffect(() => {
    setIsMobileScreen(isTabletOrMobile);
    setShowDrawer(!isTabletOrMobile);
  }, [isTabletOrMobile]);

  return (
    <div
      className={classNames(
        "fixed bottom-0 left-2 flex flex-col size-fit w-[260px] xs:min-w-[320px] sm:min-w-[430px] bg-foreground rounded-t-3xl border shadow-lg dark:text-white text-slate-700 transition-all duration-500 ease-in-out",
        {
          // On mobile: open state → full height minus topbar
          "h-[calc(100%-120px)] translate-y-0 ": isMobileScreen && showDrawer,

          // On mobile: closed state → 150px visible
          "h-[150px] translate-y-[calc(100%-150px)]":
            isMobileScreen && !showDrawer,

          // On desktop: always full height minus topbar
          "h-[calc(100%-120px)] translate-y-0": !isMobileScreen,
        }
      )}
    >
      {isMobileScreen && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center bg-white h-8 w-8 shadow-xl rounded-full z-10">
          <button onClick={() => setShowDrawer(!showDrawer)}>
            {showDrawer ? (
              <ChevronUp className="text-slate-800 rotate-180" />
            ) : (
              <ChevronUp className="text-slate-800" />
            )}
          </button>
        </div>
      )}
      <TotalCasualties />
      <Tabs defaultValue={"country-view"} className="p-6 sm:p-10">
        <TabsList className="grid grid-cols-2 mb-4 sm:w-[250px] m-0">
          <TabsTrigger value="country-view" asChild>
            <Link href="/country-view">Country View</Link>
          </TabsTrigger>
          <TabsTrigger value="hospital-view" asChild>
            <Link href="/hospital-view" className="text-slate-900">
              Hospital View
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex-1 min-h-0 flex flex-col p-6 sm:p-10">
        <div className="flex flex-wrap gap-10 mb-10">
          <DonutCharts />
        </div>

        <div className="flex-1 min-h-0 overflow-auto">
          <TabularData />
        </div>
      </div>
      <div className="absolute right-0 top-10 translate-x-[100%]">
        <Methodology />
      </div>
    </div>
  );
}
