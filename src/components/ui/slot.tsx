"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SlotProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (!React.isValidElement(children)) {
      return <>{children}</>
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const child = children as React.ReactElement<any>
    const childProps = child.props

    const mergedProps = {
      ...props,
      ...childProps,
      className: cn(className, childProps.className),
      ref,
    }

    // Remove data-slot from merged props when going to a non-button element
    // to avoid hydration mismatches with Next.js Link
    return React.cloneElement(child, mergedProps)
  }
)
Slot.displayName = "Slot"

export { Slot }
