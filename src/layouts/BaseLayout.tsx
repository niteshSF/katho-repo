import BackgroungImage from "@/assets/BackGroundImage.png"

interface BaseLayoutProps {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="relative min-h-screen">
      {/* Full-Screen Fixed Background Image */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BackgroungImage})` }}
      ></div>

      {/* Main Container with Semi-transparent Background to Show Image */}
      <div className="relative min-h-screen z-10">
        {/* Page Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}

export default BaseLayout
