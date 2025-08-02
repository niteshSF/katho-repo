import React from "react"
import BtnTexture from "@/assets/button_texture.png"
import BtnTextureDark from "@/assets/button_texture_dark.png"
import { cn } from "@/lib/utils"

interface AdhyayaTexturedButtonProps {
  className?: string
  children?: React.ReactNode
  selected?: boolean
  disabled?: boolean
}

const AdhyayaTexturedButton = ({
  className,
  children,
  selected = false,
}: AdhyayaTexturedButtonProps) => {

  const getBackground = () => (selected ? BtnTextureDark : BtnTexture)  // when we select the valli's then only it works

  return (
    <div
      className={cn(
        `inline-block px-6 pt-2 pb-3 font-bold items-center focus:outline-none ${
          selected ? "text-white" : "text-darkorange"
        } cursor-default`,
        className
      )}
      style={{
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  )
}

export default AdhyayaTexturedButton
