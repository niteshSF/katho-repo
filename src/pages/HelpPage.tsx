import Header from "@/components/shared/Header"
import BaseLayout from "@/layouts/BaseLayout"

// Import images
import meity from "@/assets/goi.png"
import uoh from "@/assets/uoh.png"
import sf from "@/assets/sf.png"

export default function HelpPage() {
  return (
    <BaseLayout>
      <Header />
      <h1 className="mt-5 text-center font-bold text-4xl pb-4 text-amber-900 underline capitalize tracking-wide font-serif">
        Contact Us
      </h1>

      {/* 3-columns image with its content */}
      <div className="relative bg-gradient-to-br py-4 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Each card */}
          {[
            {
              link: "https://www.meity.gov.in/",
              image: meity,
              alt: "meitY",
              title: "Ministry of Electronics and Information Technology",
              email: "moeit@gov.in",
              details: [
                "Ministry of Electronics and Information",
                "Technology, Government of India,",
                "Electronics Niketan, 6,",
                "CGO Complex, Lodhi Road,",
                "New Delhi – 110003",
                "Phone : +91-11-24369191 , +91-11-24362626",
                "Fax : +91-11-24366070",
              ],
            },
            {
              link: "https://sanskrit.uohyd.ac.in/",
              image: uoh,
              alt: "University of Hyderabad",
              title: "University of Hyderabad",
              email: "apksh@uohyd.ernet.in",
              details: [
                "Amba Kulkarni",
                "Professor",
                "Dept. of Sanskrit Studies",
                "School of Humanities, UoH",
                "Prof. C.R. Rao Road",
                "Gatchibowli",
                "Hyderabad – 500046",
                "Phone : (040) 2313 3802 , (040) 2313 3800",
                "Fax : (040) 2301 0356",
              ],
            },
            {
              link: "https://samskritifoundation.org/",
              image: sf,
              alt: "Samskriti Foundation",
              title: "Samskriti Foundation",
              email: "info@samskritifoundation.org",
              details: [
                "Administrative Office:",
                "1283/1, 3rd Cross, Krishnamurthypuram,",
                "Mysuru – 570004, Karnataka",
                "Phone : 0821-4289674",
                "Academic Research Centre:",
                "Sri Vivekollasini Sabha, Raja Street,",
                "Melkote – 571431,",
                "Mandya, Karnataka",
                "Phone : +91-9900161271 , 08236-200164",
              ],
            },
          ].map((org, i) => (
            <div
              key={i}
              className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl"
            >
              <a
                href={org.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-100 p-6 flex justify-center items-center"
              >
                <img
                  src={org.image}
                  alt={org.alt}
                  className="h-28 md:h-32 object-contain transition-transform duration-300 hover:scale-105"
                />
              </a>
              <div className="p-6">
                <h3 className="text-xl font-bold text-center text-indigo-800 mb-3">
                  {org.title}
                </h3>
                <ul className="text-sm text-gray-700 leading-relaxed space-y-1 mb-4">
                  {org.details.map((line, j) => (
                    <li key={j}>
                      {line === "Administrative Office:" ||
                      line === "Academic Research Centre:" ||
                      line === "Amba Kulkarni" ? (
                        <strong>{line}</strong>
                      ) : (
                        line
                      )}
                    </li>
                  ))}
                </ul>
                <p className="text-center text-sm font-medium text-indigo-600">
                  <strong>Email : </strong> {org.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}
