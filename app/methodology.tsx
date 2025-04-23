import React from "react";
import { InfoIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

function Methodology() {
  return (
    <div>
      {" "}
      <Popover modal={false} defaultOpen={false}>
        <PopoverTrigger asChild className="shadow-xl z-[100]">
          <Button
            variant="default"
            className={`
            shadow-lg 
            rounded-e-full
            
            w-[48px]
            aspect-square
            inline-flex
            items-center
            justify-center
            gap-4
            text-lg
            font-semibold
            bg-gradient-to-tr

            from-pink-400
            to-blue-400
            
            group
            hover:w-[172px]
            transition-all
            duration-100
            ease-in-out
           `}
          >
            <span className="hidden group-hover:inline-block opacity-0 group-hover:opacity-100 transition-opacity">
              Methodology
            </span>{" "}
            <InfoIcon className="text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="text-slate-700 rounded-3xl w-80 h-[300px] shadow-xl scrollbar-hide overflow-auto p-6  bg-gradient-to-tr from-blue-300 to-pink-300 z-[10000]"
        >
          <h1 className="text-sm mb-4 font-semibold">Methodology</h1>

          <section className="text-xs flex flex-col gap-4">
            <p>
              The Monsoon Revolution Archive, created by the Tech Global
              Institute, is a digital memorial honoring victims of the July
              Revolution in Bangladesh. This interactive map visualizes the
              revolution's spread and impact using Ministry of Health (MoH)
              data, eyewitness footage, and digital forensics to ensure the
              integrity and accessibility of victim information.
            </p>

            <p>We divided our map into three sections:</p>

            <ol className="flex flex-col gap-2">
              <li>
                <strong> Quick View: Organized by Districts </strong>
                <br />
                In the Quick Look section, the total casualties including deaths
                and injuries are displayed as dots on the map, organized by
                district. The red colour indicates the dead, while Orange
                denotes the injured.
              </li>

              <li>
                <strong>Hospital View: Organized by Hospitals</strong>
                <br />
                In the Hospital view section, the total casualties, including
                deaths and injuries, are organized by hospitals, which displays
                a more comprehensive casualty distribution across the country.
              </li>

              <li>
                <strong> Incidents: Analyzed Incidents</strong>
                <br />
                In the Incident section, viewers can see the victims' names,
                along with their gender, occupation, Incident location, a
                description of the incident, and other relevant information by
                clicking each dot on the map. Each entry or incident is manually
                verified and analyzed by TGI's forensics team.
              </li>
            </ol>

            <p>
              Families and volunteers are requested to share information and
              digital evidence of the victim with informed consent. Sensitive
              details will be anonymized upon request to protect privacy. This
              archive features a submission form, allowing for continuous
              additions, updates and corrections, all of which are reviewed to
              ensure the accuracy and appropriateness of information about the
              victims.
            </p>
          </section>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Methodology;
