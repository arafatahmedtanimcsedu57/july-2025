"use client";

import DigitalContentForm from "@/features/content-collection/digital-content-collection";

export default function Home() {
  return (
    <>
      <div className="flex-1 h-full overflow-auto">
        <DigitalContentForm />{" "}
      </div>
    </>
  );
}
