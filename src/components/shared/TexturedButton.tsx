import React from "react"
import BtnTexture from "@/assets/button_texture.png"
import BtnTextureDark from "@/assets/button_texture_dark.png"
import { cn } from "@/lib/utils"

interface TexturedButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  selected?: boolean
}

const TexturedButton = ({
  className,
  children,
  selected = false,
  onClick,
  ...props
}: TexturedButtonProps) => {
  const [hover, setHover] = React.useState(false)

  const getBackground = () => (hover || selected ? BtnTextureDark : BtnTexture)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.(e as any)
        }
      }}
      className={cn(
        `inline-block px-6 pt-2 pb-3 font-bold items-center cursor-pointer focus:outline-none ${
          selected || hover ? "text-white" : "text-darkorange"
        }`,
        className
      )}
      style={{
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {children}
    </div>
  )
}

export default TexturedButton
