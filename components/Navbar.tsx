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
  { href: "/resources", label: "Resources" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog/Insights" },
  { href: "/contact", label: "Contact" },
] as const;

const retreatSubLinks = [
  {
    href: "/retreats/winter-widow-wellness",
    label: "Winter Retreat 2026",
  },
  {
    href: "/retreats/spring-retreat-2027",
    label: "Spring Retreat 2027",
  },
  { href: "/retreats/past", label: "Past Retreats" },
] as const;

const eventsSubLinks = [
  {
    href: "/events/widow-wellness-connection-experience",
    label: "Widow Wellness & Connection Experience",
  },
] as const;

const navHopeHub = { href: "/hopehub", label: "Hope Hub" } as const;

/** Primary header CTA — Widow Wellness & Connection Experience. */
const navPrimaryCta = {
  href: "/events/widow-wellness-connection-experience",
  label: "Join Widow Wellness & Connection Experience",
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

function eventsSectionActive(pathname: string) {
  return eventsSubLinks.some(({ href }) => pathMatchesHref(pathname, href));
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
    "text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150",
    active ? "text-[#e76fab]" : "text-[#1a1918] hover:text-[#e76fab]",
  ].join(" ");
}

/** Desktop flyout — sharp, no bottom radius */
const desktopMenuFlyout =
  "min-w-[14rem] overflow-hidden rounded-none border border-[#e3ddd4] border-t-0 bg-[#fffcfa] py-0 shadow-[0_18px_40px_-20px_rgba(26,25,24,0.35)]";

const desktopMenuItemClass =
  "block rounded-none border-b border-[#ebe6df] px-4 py-3.5 text-[14px] font-medium tracking-tight transition-colors duration-150 last:border-b-0";

const dropdownEase = [0.22, 1, 0.36, 1] as const;
const dropdownExitEase = [0.4, 0, 0.2, 1] as const;

const desktopMenuPanelVariants = {
  closed: {
    y: "-100%",
    transition: { duration: 0.22, ease: dropdownExitEase },
  },
  open: {
    y: "0%",
    transition: { duration: 0.32, ease: dropdownEase },
  },
};

const desktopMenuItemVariants = {
  closed: {
    y: -10,
    transition: { duration: 0.12, ease: dropdownExitEase },
  },
  open: {
    y: 0,
    transition: { duration: 0.22, ease: dropdownEase },
  },
};

const desktopMenuListVariants = {
  closed: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
      when: "afterChildren" as const,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.04,
    },
  },
};

const mobileOverlayEase = [0.22, 1, 0.36, 1] as const;

const mobileOverlayPanel = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.28, ease: mobileOverlayEase },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: mobileOverlayEase },
  },
};

const mobileOverlayContent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

const mobileOverlayRow = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: mobileOverlayEase },
  },
};

function mobileNavLinkClass(active: boolean) {
  return [
    "rounded-none px-4 py-3.5 text-[1.0625rem] font-medium tracking-tight transition-colors duration-150",
    active
      ? "bg-white text-[#b84a82]"
      : "text-white hover:bg-[#c2528c] hover:text-white",
  ].join(" ");
}

function mobileNavSubLinkClass(active: boolean) {
  return [
    "block rounded-none px-4 py-3 text-[15px] font-medium transition-colors duration-150",
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
        className={`relative z-20 inline-flex h-full items-center gap-1.5 bg-[#fffcfa] px-1 outline-offset-4 ${linkClass(sectionActive)}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 opacity-55 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
          strokeWidth={2.25}
        />
        <span
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[#e76fab] transition-opacity duration-150 ${
            open || sectionActive ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        />
      </button>
      <div
        className="pointer-events-none absolute left-1/2 top-full z-10 w-max max-w-[min(22rem,calc(100vw-1.5rem))] -translate-x-1/2 overflow-hidden"
        aria-hidden={!open}
      >
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key={`${menuId}-panel`}
              variants={desktopMenuPanelVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="pointer-events-auto will-change-transform"
              style={{ transformOrigin: "top center" }}
            >
              <motion.ul
                id={menuId}
                role="menu"
                aria-label={ariaLabel}
                variants={desktopMenuListVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className={`${desktopMenuFlyout} ${menuShellExtra}`}
              >
                {links.map(({ href, label: itemLabel }) => {
                  const active = pathMatchesHref(pathname, href);
                  return (
                    <motion.li
                      key={href}
                      role="none"
                      variants={desktopMenuItemVariants}
                    >
                      <Link
                        role="menuitem"
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`${desktopMenuItemClass} ${
                          active
                            ? "bg-[#f6f3ee] font-semibold text-[#e76fab]"
                            : "text-[#1a1918] hover:bg-[#f6f3ee] hover:text-[#e76fab]"
                        }`}
                      >
                        {itemLabel}
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
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
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const hydrated = useHydrated();

  const closeMobileNav = useCallback(() => {
    setOpen(false);
    setMobileAboutOpen(false);
    setMobileRetreatsOpen(false);
    setMobileEventsOpen(false);
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
    <header className="sticky top-0 z-50 border-b border-[#e3ddd4] bg-[#fffcfa]">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-3 sm:px-4 lg:px-6">
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
            className="h-11 w-auto sm:h-[3.15rem]"
            priority
          />
        </Link>

        <nav
          className="hidden items-stretch gap-7 self-stretch lg:flex xl:gap-9"
          aria-label="Primary"
        >
          <Link
            href="/"
            className={`relative flex items-center ${linkClass(pathname === "/")}`}
          >
            Home
            {pathname === "/" ? (
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[#e76fab]"
                aria-hidden
              />
            ) : null}
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
            className={`relative flex items-center ${linkClass(pathname === navHopeHub.href)}`}
          >
            {navHopeHub.label}
            {pathname === navHopeHub.href ? (
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[#e76fab]"
                aria-hidden
              />
            ) : null}
          </Link>

          <DesktopHoverMenu
            key={`nav-desktop-retreats-${pathname}`}
            pathname={pathname}
            label="Retreats"
            menuId="nav-retreats-menu"
            ariaLabel="Retreats"
            links={retreatSubLinks}
            sectionActive={retreatSectionActive(pathname)}
            menuShellExtra="min-w-[15rem]"
          />

          <DesktopHoverMenu
            key={`nav-desktop-events-${pathname}`}
            pathname={pathname}
            label="Events"
            menuId="nav-events-menu"
            ariaLabel="Events"
            links={eventsSubLinks}
            sectionActive={eventsSectionActive(pathname)}
            menuShellExtra="min-w-[19rem]"
          />
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <SocialMediaLinks
            className="hidden items-center gap-0.5 sm:flex"
            linkClassName="inline-flex h-9 w-9 items-center justify-center rounded-none text-[#666766] transition-colors duration-150 hover:bg-[#f6f3ee] hover:text-[#e76fab] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76fab] sm:h-10 sm:w-10"
            iconSizeClassName="h-[1.1rem] w-[1.1rem] sm:h-[1.2rem] sm:w-[1.2rem]"
          />
          <Link
            href={navPrimaryCta.href}
            className="il-btn il-btn--solid il-btn--nav hidden sm:inline-flex"
          >
            {navPrimaryCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-none border border-[#e3ddd4] bg-white text-[#1a1918] transition-colors hover:bg-[#f6f3ee] lg:hidden"
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-none border-2 border-white bg-white text-[#b84a82] transition-colors duration-150 hover:bg-neutral-100"
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
                          className="mt-1 flex flex-col gap-0 overflow-hidden border-l-2 border-white/40 pl-2"
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{
                            duration: 0.22,
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
                          className="mt-1 flex flex-col gap-0 overflow-hidden border-l-2 border-white/40 pl-2"
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{
                            duration: 0.22,
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
                      className={`flex w-full items-center justify-between text-left ${mobileNavLinkClass(eventsSectionActive(pathname))}`}
                      aria-expanded={mobileEventsOpen}
                      onClick={() => setMobileEventsOpen((v) => !v)}
                    >
                      Events
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-current opacity-80 transition-transform duration-300 ease-out ${mobileEventsOpen ? "rotate-180" : ""}`}
                        aria-hidden
                        strokeWidth={2}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileEventsOpen ? (
                        <motion.ul
                          role="list"
                          className="mt-1 flex flex-col gap-0 overflow-hidden border-l-2 border-white/40 pl-2"
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{
                            duration: 0.22,
                            ease: mobileOverlayEase,
                          }}
                        >
                          {eventsSubLinks.map(({ href, label }) => (
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
                      className="il-btn il-btn--on-dark"
                      onClick={closeMobileNav}
                    >
                      {navPrimaryCta.label}
                      <span aria-hidden className="il-btn__arrow">
                        →
                      </span>
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
