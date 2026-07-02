"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 2,
    quote:
      "The team did an amazing job building a product website for my brand, which really elevated how we present ourselves to customers. They made the whole process smooth and stress-free.",
    author: "Koyal Kiran",
    role: "CEO, Magniz",
    avatar: "/Koyal.jpg",
  },
  {
    id: 3,
    quote:
      "Whenever we need to deliver, there is no doubt that we can trust the Evlogia team to push as hard as they need to get results on time. They have all the expertise needed to give us the right recommendation for the development of the full stack.",
    author: "Lionel Moh",
    role: "Founder, OceanCharge",
    avatar: "/lionel.png",
    avatarPosition: "top",
  },
  {
    id: 4,
    quote:
      "The team brought a strong blend of technical expertise and practical execution, playing a key role in shaping the foundation of our LMS. What truly stood out was their ability to simplify complex requirements into an efficient, well-structured architecture. Their contributions have had a lasting impact on our product development.",
    author: "Srikar HK",
    role: "Head of Operations, 10 Seconds",
    avatar: "/srikar.jpeg",
  },
  {
    id: 5,
    quote:
      "The team demonstrated exceptional technical expertise in evaluating and enhancing our website strategy. Their ability to quickly understand our business needs and translate them into practical, scalable solutions was impressive. Thanks to their guidance, we significantly refined our online platform and better positioned our services in the market.",
    author: "Muhammed Fasil",
    role: "Center Manager, Edoxi Training",
    avatar: "/fasil.jpeg",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedQuote, setDisplayedQuote] = useState(testimonials[0].quote);
  const [displayedRole, setDisplayedRole] = useState(testimonials[0].role);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (index === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setDisplayedQuote(testimonials[index].quote);
      setDisplayedRole(testimonials[index].role);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 300);
    }, 150);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      {/* Speech-bubble quote panel */}
      <div className="panel-wood pixel-corners max-w-2xl w-full">
        <div className="panel-paper px-6 py-7 md:px-9 md:py-8 relative">
          <span
            className="absolute left-6 -top-1 font-display text-[var(--harvest-deep)] text-4xl select-none pointer-events-none"
            aria-hidden
          >
            &ldquo;
          </span>
          <p
            className={cn(
              "font-sans text-ink text-base md:text-lg text-center leading-relaxed transition-all duration-300",
              isAnimating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
            )}
          >
            {displayedQuote}
          </p>
          <p
            className={cn(
              "font-display text-ink-3 text-[11px] tracking-[0.2em] uppercase text-center mt-4 transition-all duration-300",
              isAnimating ? "opacity-0" : "opacity-100"
            )}
          >
            {displayedRole}
          </p>
        </div>
      </div>

      {/* Avatar selector */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {testimonials.map((testimonial, index) => {
          const isActive = activeIndex === index;
          const isHovered = hoveredIndex === index && !isActive;
          const showName = isActive || isHovered;

          return (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => handleSelect(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-pressed={isActive}
              aria-label={`Show testimonial from ${testimonial.author}, ${testimonial.role}`}
              className={cn(
                "relative flex items-center cursor-pointer transition-all duration-300",
                isActive ? "panel-paper" : "hover:bg-black/5",
                showName ? "pr-3 pl-1.5 py-1.5" : "p-1"
              )}
              style={isActive ? { boxShadow: "inset 0 0 0 2px var(--wood-mid)" } : undefined}
            >
              <span
                className="relative flex-shrink-0 w-8 h-8 overflow-hidden"
                style={{ boxShadow: "inset 0 0 0 2px var(--wood-mid)", padding: "2px", background: "var(--wood-paper)" }}
              >
                <Image
                  src={testimonial.avatar}
                  alt=""
                  width={64}
                  height={64}
                  sizes="32px"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: testimonial.avatarPosition ?? "center" }}
                />
              </span>
              <span
                className={cn(
                  "grid transition-all duration-300",
                  showName ? "grid-cols-[1fr] opacity-100 ml-2" : "grid-cols-[0fr] opacity-0 ml-0"
                )}
              >
                <span className="overflow-hidden">
                  <span className="font-display text-xs whitespace-nowrap block text-ink">
                    {testimonial.author}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
