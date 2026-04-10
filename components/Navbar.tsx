"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
  Fragment,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { SocialMediaLinks } from "@/components/SocialMediaLinks";

const aboutSubLinks = [
  { href: "/about", label: "About Me" },
  { href: "/blog", label: "Blog/Insights" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
] as const;

const retreatSubLinks = [
  { href: "/retreats/upcoming", label: "Upcoming Retreats" },
  { href: "/retreats/past", label: "Past Retreats" },
] as const;

const supportSubLinks = [
  { href: "/support-groups", label: "Support Groups" },
  {
    href: "/support/virtual-healing-experiences",
    label: "Virtual Healing Experiences",
  },
  { href: "/resources", label: "Resources" },
] as const;

const navHopeHub = { href: "/hopehub", label: "Hope Hub" } as const;

/** Primary header CTA — upcoming retreat (summer). */
const navPrimaryCta = {
  href: "/retreats/upcoming",
  label: "Join our summer retreat",
} as const;

function pathMatchesHref(pathname: string, href: string) {
  const base = href.split("#")[0] ?? href;
  return pathname === base || pathname.startsWith(`${base}/`);
}

function aboutSectionActive(pathname: string) {
  return aboutSubLinks.some(
    ({ href }) => pathname === href || pathname.startsWith(`${href}/`)
  );
}

function retreatSectionActive(pathname: string) {
  if (pathname === "/retreats") return true;
  return retreatSubLinks.some(({ href }) => pathMatchesHref(pathname, href));
}

function supportSectionActive(pathname: string) {
  return supportSubLinks.some(({ href }) => pathMatchesHref(pathname, href));
}

function useHydrated(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      queueMicrotask(onStoreChange);
      return () => {};
    },
    () => true,
    () => false,
  );
}

function linkClass(active: boolean) {
  return [
    "text-[15px] font-medium transition-colors duration-200",
    active ? "text-[#e76fab]" : "text-black hover:text-[#e76fab]",
  ].join(" ");
}

/** Desktop flyout — same base as navbar bar, no tinted glow */
const desktopMenuFlyout =
  "min-w-[13.75rem] overflow-hidden rounded-none rounded-b-2xl border border-[#ebe6df] border-t-0 bg-[#f6f3ee] py-2 shadow-none";

const desktopFlyOpenEase = [0.16, 1, 0.32, 1] as const;

const desktopMenuListVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      y: { duration: 0.3, ease: desktopFlyOpenEase },
      opacity: { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] as const },
      staggerChildren: 0.018,
      delayChildren: 0,
    },
  },
  closed: {
    opacity: 0,
    /* Retract upward into the bar (mirror of entrance) */
    y: -14,
    transition: {
      when: "afterChildren" as const,
      staggerChildren: 0.022,
      staggerDirection: -1,
      y: { duration: 0.28, ease: [0.42, 0, 0.22, 1] as const },
      opacity: { duration: 0.22, ease: [0.45, 0, 0.9, 1] as const },
    },
  },
};

const desktopMenuItemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] as const },
  },
  closed: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.14, ease: [0.42, 0, 0.85, 1] as const },
  },
};

const desktopMenuItemClass =
  "block rounded-lg px-3 py-2.5 text-[15px] transition-[background-color,color] duration-200";

const mobileOverlayEase = [0.22, 1, 0.36, 1] as const;

const mobileOverlayPanel = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.42, ease: mobileOverlayEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.32, ease: mobileOverlayEase },
  },
};

const mobileOverlayContent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const mobileOverlayRow = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: mobileOverlayEase },
  },
};

function mobileNavLinkClass(active: boolean) {
  return [
    "rounded-2xl px-4 py-3.5 text-[1.0625rem] font-medium tracking-tight transition-[background-color,color,transform] duration-200 active:scale-[0.99]",
    active
      ? "bg-white text-[#b84a82]"
      : "text-white hover:bg-[#c2528c] hover:text-white",
  ].join(" ");
}

function mobileNavSubLinkClass(active: boolean) {
  return [
    "block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors duration-200",
    active
      ? "bg-white text-[#b84a82]"
      : "text-white hover:bg-[#c2528c] hover:text-white",
  ].join(" ");
}

function DesktopHoverMenu({
  pathname,
  label,
  menuId,
  ariaLabel,
  links,
  sectionActive,
  menuShellExtra = "",
}: {
  pathname: string;
  label: string;
  menuId: string;
  ariaLabel: string;
  links: readonly { href: string; label: string }[];
  sectionActive: boolean;
  menuShellExtra?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className="relative isolate z-10 flex h-full items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`relative z-20 inline-flex h-full items-center gap-1 bg-[#f6f3ee] px-2 outline-offset-4 ${linkClass(sectionActive)}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 shrink-0 opacity-65 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <div
        className="pointer-events-none absolute left-1/2 top-full z-10 w-max max-w-[min(20rem,calc(100vw-1.5rem))] -translate-x-1/2"
        aria-hidden={!open}
      >
        <AnimatePresence>
          {open ? (
            <motion.ul
              key={menuId}
              id={menuId}
              role="menu"
              aria-label={ariaLabel}
              variants={desktopMenuListVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`pointer-events-auto ${desktopMenuFlyout} ${menuShellExtra}`}
              style={{
                willChange: "transform, opacity",
                transformOrigin: "top center",
              }}
            >
              {links.map(({ href, label: itemLabel }) => {
                const active = pathMatchesHref(pathname, href);
                return (
                  <motion.li
                    key={href}
                    role="none"
                    variants={desktopMenuItemVariants}
                    className="px-1.5"
                  >
                    <Link
                      role="menuitem"
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`${desktopMenuItemClass} ${
                        active
                          ? "bg-white font-semibold text-[#e76fab]"
                          : "text-[#2a2928] hover:bg-[#ebe6df] hover:text-[#e76fab] active:bg-[#e3ddd4]"
                      }`}
                    >
                      {itemLabel}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileRetreatsOpen, setMobileRetreatsOpen] = useState(false);
  const [mobileSupportOpen, setMobileSupportOpen] = useState(false);
  const hydrated = useHydrated();

  const closeMobileNav = useCallback(() => {
    setOpen(false);
    setMobileAboutOpen(false);
    setMobileRetreatsOpen(false);
    setMobileSupportOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileNav();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMobileNav]);

  return (
    <Fragment>
    <header className="sticky top-0 z-50 border-b border-[#ebe6df] bg-[#f6f3ee]">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
        <Link
          href="/"
          className="relative flex shrink-0 items-center gap-2 outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e76fab]"
          aria-label="It's Lifey — Home"
        >
          <Image
            src="/images/itslifeylogo.png"
            alt="It's Lifey"
            width={200}
            height={60}
            className="h-11 w-auto sm:h-[3.25rem]"
            priority
          />
        </Link>

        <nav
          className="hidden items-stretch gap-8 self-stretch lg:flex"
          aria-label="Primary"
        >
          <Link
            href="/"
            className={`flex items-center ${linkClass(pathname === "/")}`}
          >
            Home
          </Link>

          <DesktopHoverMenu
            key={`nav-desktop-about-${pathname}`}
            pathname={pathname}
            label="About"
            menuId="nav-about-menu"
            ariaLabel="About"
            links={aboutSubLinks}
            sectionActive={aboutSectionActive(pathname)}
          />

          <Link
            href={navHopeHub.href}
            className={`flex items-center ${linkClass(pathname === navHopeHub.href)}`}
          >
            {navHopeHub.label}
          </Link>

          <DesktopHoverMenu
            key={`nav-desktop-retreats-${pathname}`}
            pathname={pathname}
            label="Retreats"
            menuId="nav-retreats-menu"
            ariaLabel="Retreats"
            links={retreatSubLinks}
            sectionActive={retreatSectionActive(pathname)}
            menuShellExtra="min-w-[14.5rem]"
          />

          <DesktopHoverMenu
            key={`nav-desktop-support-${pathname}`}
            pathname={pathname}
            label="Support"
            menuId="nav-support-menu"
            ariaLabel="Support"
            links={supportSubLinks}
            sectionActive={supportSectionActive(pathname)}
            menuShellExtra="min-w-[14rem]"
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <SocialMediaLinks
            className="hidden items-center gap-0.5 sm:flex"
            linkClassName="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#666766] transition-[color,background-color] duration-200 hover:bg-[#e76fab]/10 hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] sm:h-10 sm:w-10"
            iconSizeClassName="h-[1.15rem] w-[1.15rem] sm:h-[1.3rem] sm:w-[1.3rem]"
          />
          <Link
            href={navPrimaryCta.href}
            className="hidden rounded-full bg-[#e76fab] px-4 py-2.5 text-[14px] font-semibold leading-snug text-white shadow-sm transition-[background-color,box-shadow] duration-200 hover:bg-[#d85e9a] hover:shadow-md sm:inline-flex sm:px-5 sm:text-[15px] sm:leading-normal"
          >
            {navPrimaryCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ebe6df] bg-white text-black transition-colors hover:bg-neutral-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => (open ? closeMobileNav() : setOpen(true))}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>
    </header>

      {hydrated
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <motion.div
                  key="mobile-nav-overlay"
                  id="mobile-nav"
                  className="fixed inset-0 z-[200] flex min-h-[100dvh] flex-col bg-[#d9669d] lg:hidden"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site menu"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={mobileOverlayPanel}
                >
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#e76fab] via-[#d9669d] to-[#b84a82]"
              aria-hidden
            />
            <div className="relative z-10 flex min-h-[100dvh] flex-1 flex-col">
              <div className="flex h-[4.25rem] shrink-0 items-center justify-between border-b border-white px-4 sm:px-5">
                <Link
                  href="/"
                  className="flex shrink-0 items-center outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/80"
                  aria-label="It's Lifey — Home"
                  onClick={closeMobileNav}
                >
                  <Image
                    src="/images/itslifeylogo.png"
                    alt=""
                    width={200}
                    height={60}
                    className="h-10 w-auto brightness-0 invert sm:h-11"
                  />
                </Link>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-white text-[#b84a82] transition-[background-color,color,transform] duration-200 hover:bg-neutral-100 active:scale-95"
                  aria-label="Close menu"
                  onClick={closeMobileNav}
                >
                  <X className="h-5 w-5" aria-hidden strokeWidth={2} />
                </button>
              </div>

              <nav
                className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-y-contain px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 sm:px-6"
                aria-label="Mobile primary"
              >
                <motion.div
                  className="flex flex-col gap-1"
                  variants={mobileOverlayContent}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={mobileOverlayRow}>
                    <Link
                      href="/"
                      className={`block ${mobileNavLinkClass(pathname === "/")}`}
                      onClick={closeMobileNav}
                    >
                      Home
                    </Link>
                  </motion.div>

                  <motion.div variants={mobileOverlayRow}>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between text-left ${mobileNavLinkClass(aboutSectionActive(pathname))}`}
                      aria-expanded={mobileAboutOpen}
                      onClick={() => setMobileAboutOpen((v) => !v)}
                    >
                      About
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-current opacity-80 transition-transform duration-300 ease-out ${mobileAboutOpen ? "rotate-180" : ""}`}
                        aria-hidden
                        strokeWidth={2}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileAboutOpen ? (
                        <motion.ul
                          role="list"
                          className="mt-1 flex flex-col gap-1 overflow-hidden pl-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.32,
                            ease: mobileOverlayEase,
                          }}
                        >
                          {aboutSubLinks.map(({ href, label }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                className={mobileNavSubLinkClass(
                                  pathMatchesHref(pathname, href)
                                )}
                                onClick={closeMobileNav}
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={mobileOverlayRow}>
                    <Link
                      href={navHopeHub.href}
                      className={`block ${mobileNavLinkClass(pathname === navHopeHub.href)}`}
                      onClick={closeMobileNav}
                    >
                      {navHopeHub.label}
                    </Link>
                  </motion.div>

                  <motion.div variants={mobileOverlayRow}>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between text-left ${mobileNavLinkClass(retreatSectionActive(pathname))}`}
                      aria-expanded={mobileRetreatsOpen}
                      onClick={() => setMobileRetreatsOpen((v) => !v)}
                    >
                      Retreats
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-current opacity-80 transition-transform duration-300 ease-out ${mobileRetreatsOpen ? "rotate-180" : ""}`}
                        aria-hidden
                        strokeWidth={2}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileRetreatsOpen ? (
                        <motion.ul
                          role="list"
                          className="mt-1 flex flex-col gap-1 overflow-hidden pl-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.32,
                            ease: mobileOverlayEase,
                          }}
                        >
                          {retreatSubLinks.map(({ href, label }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                className={mobileNavSubLinkClass(
                                  pathMatchesHref(pathname, href)
                                )}
                                onClick={closeMobileNav}
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={mobileOverlayRow}>
                    <button
                      type="button"
                      className={`flex w-full items-center justify-between text-left ${mobileNavLinkClass(supportSectionActive(pathname))}`}
                      aria-expanded={mobileSupportOpen}
                      onClick={() => setMobileSupportOpen((v) => !v)}
                    >
                      Support
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-current opacity-80 transition-transform duration-300 ease-out ${mobileSupportOpen ? "rotate-180" : ""}`}
                        aria-hidden
                        strokeWidth={2}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileSupportOpen ? (
                        <motion.ul
                          role="list"
                          className="mt-1 flex flex-col gap-1 overflow-hidden pl-1"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.32,
                            ease: mobileOverlayEase,
                          }}
                        >
                          {supportSubLinks.map(({ href, label }) => (
                            <li key={href}>
                              <Link
                                href={href}
                                className={mobileNavSubLinkClass(
                                  pathMatchesHref(pathname, href)
                                )}
                                onClick={closeMobileNav}
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div variants={mobileOverlayRow} className="pt-4">
                    <Link
                      href={navPrimaryCta.href}
                      className="block rounded-full bg-white px-6 py-4 text-center text-[1rem] font-semibold leading-snug text-[#c43d7a] shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-[#fff8fb] hover:shadow-[0_20px_48px_rgba(0,0,0,0.14)] active:scale-[0.99]"
                      onClick={closeMobileNav}
                    >
                      {navPrimaryCta.label}
                    </Link>
                  </motion.div>
                </motion.div>
              </nav>
            </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body
          )
        : null}
    </Fragment>
  );
}
