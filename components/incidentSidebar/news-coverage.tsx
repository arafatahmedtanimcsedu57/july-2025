import React, { memo } from "react";
import { LinkPreview } from "../ui/link-preview";

const NewsCoverage = () => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-medium mb-4">Major News Coverage</h3>
      <ul className="bg-muted/50 p-4 rounded-md flex flex-col gap-2">
        <li>
          <LinkPreview
            url="https://www.bbc.com/news"
            className="text-xs font-mono !text-blue-500"
          >
            BBC: Protests begin at Bangladesh universities{" "}
          </LinkPreview>
        </li>

        <li>
          <LinkPreview
            url="https://www.thedailystar.net"
            className="text-xs font-mono !text-blue-500"
          >
            Daily Star: Students begin protests in Dhaka{" "}
          </LinkPreview>
        </li>

        <li>
          <LinkPreview
            url="https://www.aljazeera.com"
            className="text-xs font-mono !text-blue-500"
          >
            Al Jazeera: First death reported in Bangladesh protests{" "}
          </LinkPreview>
        </li>

        <li>
          <LinkPreview
            url="https://www.reuters.com"
            className="text-xs font-mono !text-blue-500"
          >
            Reuters: Protests spread to Bangladesh's port city{" "}
          </LinkPreview>
        </li>

        <li>
          <LinkPreview
            url="https://www.bbc.com/news"
            className="text-xs font-mono !text-blue-500"
          >
            BBC: Violence erupts in Bangladesh protests{" "}
          </LinkPreview>
        </li>

        <li>
          <LinkPreview
            url="https://www.aljazeera.com"
            className="text-xs font-mono !text-blue-500"
          >
            Al Jazeera: Deadly clashes in Bangladesh{" "}
          </LinkPreview>
        </li>

        <li>
          <LinkPreview
            url="https://www.cnn.com"
            className="text-xs font-mono !text-blue-500"
          >
            CNN: Protests continue for second day{" "}
          </LinkPreview>
        </li>

        <li>
          <LinkPreview
            url="https://www.reuters.com"
            className="text-xs font-mono !text-blue-500"
          >
            Reuters: Vehicle drives through protesters in Dhaka{" "}
          </LinkPreview>
        </li>

        <li>
          <LinkPreview
            url="https://www.theguardian.com"
            className="text-xs font-mono !text-blue-500"
          >
            The Guardian: University campus stormed by security forces{" "}
          </LinkPreview>
        </li>

        <li>
          <LinkPreview
            url="https://www.nytimes.com"
            className="text-xs font-mono !text-blue-500"
          >
            New York Times: Port workers join Bangladesh protests{" "}
          </LinkPreview>
        </li>
      </ul>
    </div>
  );
};

export const MajorNewsCoverage = memo(NewsCoverage);
