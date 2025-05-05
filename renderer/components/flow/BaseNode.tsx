import { forwardRef, HTMLAttributes } from "react";

import clsx from "clsx";
import { motion } from "motion/react";

export const BaseNode = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { selected?: boolean }
>(({ className, selected, ...props }, ref) => (
  <div
    ref={ref}
    className={clsx(
      "relative rounded-md p-5",
      className,
      selected ? "shadow-lg" : "",
      "hover:ring-1",
    )}
    tabIndex={0}
    {...props}
  />
));

BaseNode.displayName = "BaseNode";
