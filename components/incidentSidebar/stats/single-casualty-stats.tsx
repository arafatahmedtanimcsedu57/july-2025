import React from "react";

import { Card, CardContent } from "@/components/ui/card";

const CasualtyStats = ({ totals }: { totals: Record<string, number> }) => (
  <>
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col text-xs text-muted-foreground">
            Total
            <div className="font-bold">
              {(totals["Death"] || 0) + (totals["Injury"] || 0)}
            </div>
          </div>

          <div className="flex gap-2 items-baseline">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {totals["Death"] || 0}
              </div>
              <div className="text-xs">Deaths</div>
            </div>

            <div>
              <div className="text-base font-bold text-orange-600">
                {totals["Injury"] || 0}
              </div>
              <div className="text-xs">Injuries</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
);

export const SingleCasualtyStats = React.memo(CasualtyStats);
