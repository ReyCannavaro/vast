import Image from "next/image";
import Link from "next/link";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Interactive Map", href: "/regions" },
      { label: "Cultural Identity", href: "/gallery" },
      { label: "Mini Game", href: "/game" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Traditional Cuisine", href: "/gallery" },
      { label: "Iconic Destinations", href: "/regions" },
      { label: "Local Traditions", href: "/gallery" },
    ],
  },
  {
    title: "Journey",
    links: [
      { label: "Travel Inspiration", href: "/regions" },
      { label: "Privacy Policy", href: "/" },
      { label: "Cookies Policy", href: "/" },
    ],
  },
];

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <rect width="18" height="18" x="3" y="3" rx="5" fill="currentColor" />
      <circle cx="12" cy="12" r="3.25" fill="#050505" />
      <circle cx="17.2" cy="6.8" r="1.25" fill="#050505" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <rect width="18" height="18" x="3" y="3" rx="4" fill="currentColor" />
      <path
        d="M13.28 19v-6.08h2.05l.31-2.37h-2.36V9.04c0-.69.19-1.16 1.18-1.16h1.26V5.76c-.22-.03-.97-.09-1.84-.09-1.82 0-3.07 1.11-3.07 3.16v1.72H8.75v2.37h2.06V19h2.47Z"
        fill="#050505"
      />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5">
      <path
        d="M21.08 6.76c-.66.29-1.36.49-2.1.58a3.62 3.62 0 0 0 1.6-2.01 7.28 7.28 0 0 1-2.31.88 3.62 3.62 0 0 0-6.27 2.48c0 .28.03.56.09.82A10.28 10.28 0 0 1 4.61 5.7a3.6 3.6 0 0 0-.49 1.82c0 1.25.64 2.36 1.61 3.01a3.62 3.62 0 0 1-1.64-.45v.05a3.63 3.63 0 0 0 2.91 3.56 3.78 3.78 0 0 1-1.63.06 3.64 3.64 0 0 0 3.39 2.52 7.28 7.28 0 0 1-4.51 1.55c-.29 0-.58-.02-.86-.05a10.27 10.27 0 0 0 15.82-8.66v-.47a7.33 7.33 0 0 0 1.87-1.88Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: "/",
    icon: <InstagramIcon />,
    className: "text-[#c98a50]",
  },
  { label: "Facebook", href: "/", icon: <FacebookIcon />, className: "text-white" },
  { label: "Twitter", href: "/", icon: <TwitterIcon />, className: "text-white" },
];

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-[#030303] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-6 py-12 sm:px-10 lg:min-h-[512px] lg:gap-0 lg:px-[clamp(48px,5.14vw,74px)] lg:pb-[39px] lg:pt-[42px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(300px,430px)_minmax(0,1fr)] lg:gap-x-[clamp(86px,12.2vw,176px)]">
          <div>
            <h2 className="max-w-[330px] text-[32px] font-semibold leading-[1.52] text-white">
              Discover East Java&apos;s Stories
            </h2>

            <div className="mt-[50px]">
              <Link href="/" className="relative block h-[39px] w-[230px] max-w-full">
                <Image
                  src="/logo-putih.png"
                  alt="VAST - Java East Cultural Explorer"
                  fill
                  sizes="230px"
                  className="object-contain object-left"
                  priority={false}
                />
              </Link>
            </div>

            <p className="mt-[34px] max-w-[365px] text-[14px] font-normal leading-[2.28] text-white">
              Preserving East Java&apos;s Cultural Heritage Through Interactive
              Exploration, Visual Storytelling, And Immersive Digital Experiences.
            </p>
          </div>

          <div className="min-w-0 lg:pt-3">
            <div>
              <p className="max-w-[380px] text-[14px] font-semibold leading-[1.15] text-white">
                Preserving East Java&apos;s Heritage Through Digital Exploration
              </p>
              <Link
                href="/gallery"
                className="mt-[29px] inline-flex h-[35px] w-[109px] items-center justify-center rounded-full bg-[#9d5b23] text-[12px] font-medium text-white transition-colors hover:bg-[#b16a2c]"
              >
                Subscribe
              </Link>
            </div>

            <nav className="mt-[88px] grid min-w-0 gap-8 sm:grid-cols-3 lg:grid-cols-[minmax(132px,170px)_minmax(150px,190px)_minmax(130px,160px)] lg:gap-[clamp(36px,5.97vw,86px)]">
              {footerColumns.map((column) => (
                <div key={column.title} className="min-w-0">
                  <p className="text-[14px] font-semibold leading-none text-white/55">
                    {column.title}
                  </p>
                  <div className="mt-[19px] grid gap-[11px] text-[14px] font-semibold leading-[1.3] text-white">
                    {column.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="break-words transition-colors hover:text-[#c98a50]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-auto grid gap-8 lg:grid-cols-[minmax(300px,430px)_minmax(0,1fr)] lg:gap-x-[clamp(86px,12.2vw,176px)]">
          <div className="flex items-center gap-[26px]">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className={`${item.className} inline-flex size-5 shrink-0 items-center justify-center transition-opacity hover:opacity-75`}
              >
                {item.icon}
              </Link>
            ))}
          </div>

          <div className="text-[14px] font-semibold leading-none text-white lg:justify-self-end">
            © Copyright 2026, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
