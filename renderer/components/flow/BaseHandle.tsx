import { forwardRef } from "react";
import { Handle, HandleProps } from "@xyflow/react";

import cn from "clsx";

export type BaseHandleProps = HandleProps;

export const BaseHandle = forwardRef<HTMLDivElement, BaseHandleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Handle
        ref={ref}
        {...props}
        className={cn(
          "opacity-0",
          className,
        )}
        {...props}
      >
        {children}
      </Handle>
    );
  },
);

BaseHandle.displayName = "BaseHandle";
