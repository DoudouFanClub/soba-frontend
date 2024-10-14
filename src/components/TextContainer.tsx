import React, { useEffect, useRef, useState } from 'react';
import { ApiMessage } from "../api/ServerActionApi";
import { TextBlock } from "./TextBlock";
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import "./TextContainer.css";

// Component Props
interface TextContainerProps {
  // List of all Messages within a Conversation
  conversation: ApiMessage[];
}

// Text Container Component - Renders Text Blocks on
// the Left or Right within a Div
export const TextContainer = ({ conversation }: TextContainerProps) => {
  const [itemHeights, setItemHeights] = useState<number[]>(Array(conversation.length).fill(100)); // Default height
  const measuredRefs = useRef<(HTMLDivElement | null)[]>(Array(conversation.length).fill(null));

  // Function to measure the height of each TextBlock
  const measureHeight = (index: number) => {
    if (measuredRefs.current[index]) {
      const height = measuredRefs.current[index]?.getBoundingClientRect().height || 100; // Default height
      setItemHeights((prev) => {
        const newHeights = [...prev];
        newHeights[index] = height;
        return newHeights;
      });
    }
  };

  useEffect(() => {
    // Measure heights after the first render
    conversation.forEach((_, index) => {
      measureHeight(index);
    });
    console.log(itemHeights)
  }, [conversation]);

  const getItemSize = (index: number): number => {
    return itemHeights[index] || 100; // Fallback height if not measured yet
  };

   // Row component that renders each conversation message
   const Row: React.FC<{ index: number, style: React.CSSProperties }> = ({ index, style }) => {
    return (
      <div ref={(el) => (measuredRefs.current[index] = el)}>
        <TextBlock 
          key={index} 
          text={conversation[index].content} 
          side={index % 2 === 1 ? "left" : "right"} 
        />
      </div>
    );
  };

  return (
    <div style={{height: "70vh"}}>
      <AutoSizer>
          {({ height, width }) => (
            <List
            height={height}               // Height of the scrollable container
            itemCount={conversation.length} // Number of messages
            itemSize={getItemSize}         // Function that returns the height of each item
            width={width}                 // Full width of the container
            >
              {Row}
            </List>
          )}
      </AutoSizer>
    </div>
  );
};
