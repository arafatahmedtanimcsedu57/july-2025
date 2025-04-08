import React from "react";

import FemaleIcon from "@/public/female.png";
import MaleIcon from "@/public/male.png";

import { CASUALTY_ITEMS_COLOR_ELEMENTS } from "../../../constant/casualty-types";
import type { CasualtyPerson } from "@/types/data";
import type { StaticImageData } from "next/image";
import { GENDERS } from "@/constant/gender-types";
import Image from "next/image";
import { useIncidentStore } from "@/lib/incident-store";
import { Separator } from "@/components/ui/separator";
import { Calendar1Icon, MapPinIcon } from "lucide-react";
import { formatDate } from "date-fns";

const Casualty = ({ person }: { person: CasualtyPerson }) => {
  const { selectedIncident, setSelectedIncident } = useIncidentStore();

  const { gender, date, location } = person;
  let genderIcon: StaticImageData | string = "";
  if (gender && gender.toLowerCase() === GENDERS.MALE) genderIcon = MaleIcon;
  if (gender && gender.toLowerCase() === GENDERS.FEMALE)
    genderIcon = FemaleIcon;

  return (
    <>
      <div className="flex gap-2">
        {genderIcon ? (
          <div>
            <Image
              src={genderIcon || "/placeholder.svg"}
              alt={gender || "gender"}
              width={24}
              height={24}
              className="min-w-4 rounded border"
            />
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-col">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex items-center gap-2 font-medium text-xs">
              {person.name || "Unknown"}
            </div>

            {person.type && CASUALTY_ITEMS_COLOR_ELEMENTS[person.type]
              ? CASUALTY_ITEMS_COLOR_ELEMENTS[person.type]()
              : null}
          </div>

          <div className="text-xs text-muted-foreground flex flex-col">
            {person.occupation ? <span>{person.occupation}</span> : <></>}
            {person.age ? <span>{person.age} years</span> : <></>}
          </div>
        </div>
      </div>
      {selectedIncident?.id === person.id ? (
        <>
          <Separator className="my-4 bg-background" />

          <div className="text-xs flex flex-col">
            {location ? (
              <span className="text-xs text-blue-500 flex items-center gap-2">
                <MapPinIcon size={12} className="min-w-4" /> {location}
              </span>
            ) : (
              <></>
            )}
            {date ? (
              <span className="text-xs flex items-center gap-2">
                <Calendar1Icon size={12} className="min-w-4" />
                {formatDate(new Date(date), "do LLL")}
              </span>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export const SingleCasualty = React.memo(Casualty);
