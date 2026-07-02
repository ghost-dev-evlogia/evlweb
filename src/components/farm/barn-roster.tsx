"use client";

import { useState } from "react";
import Image from "next/image";
import { TEAM } from "@/content/site";
import { PixelSprite } from "./pixel-sprite";
import { TypeLine } from "./type-line";
import { T, type TileRef } from "@/farm/tiles.ts";

/* The barn — the team as a game roster, not a card grid. Four farmhands
   stand on the barn floor, each with the prop they'd actually be holding;
   pick one and the social menu opens underneath, Stardew style. Every
   farmhand + bio + link also lives in the DOM as sr-only for no-JS/AT. */

const PROPS: Record<string, { tile: TileRef; scale: number }> = {
  Arjun: { tile: T.chest, scale: 1 },
  Aneesh: { tile: T.biome.sunflower, scale: 2 },
  Ethan: { tile: T.crop.wheatBag, scale: 2 },
  Karthik: { tile: T.tools.hammer, scale: 2 },
};

export function BarnRoster() {
  const [sel, setSel] = useState(0);
  const active = TEAM[sel];

  return (
    <div className="max-w-4xl mx-auto">
      {/* the barn interior */}
      <div className="panel-wood pixel-corners">
        <div className="barn-wall relative px-3 pt-8 pb-0 md:px-8 md:pt-10">
          {/* roof beam */}
          <div
            aria-hidden
            className="absolute top-0 inset-x-0"
            style={{ height: "calc(var(--px) * 4)", background: "var(--wood-shadow)" }}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
            {TEAM.map(({ name, role, photo }, i) => {
              const prop = PROPS[name];
              const isSel = i === sel;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setSel(i)}
                  aria-pressed={isSel}
                  aria-label={`${name}, ${role} — open their card`}
                  className="group relative flex flex-col items-center pt-2 focus:outline-none"
                >
                  <span
                    className="stand-bob relative transition-transform duration-150 group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
                    style={{ animationDelay: `${i * 0.6}s` }}
                  >
                    <Image
                      src={photo}
                      alt=""
                      width={96}
                      height={96}
                      className="pixelated"
                      style={{ imageRendering: "pixelated" }}
                    />
                    {prop && (
                      <span className="absolute -right-4 bottom-1" aria-hidden>
                        <PixelSprite tile={prop.tile} scale={prop.scale} />
                      </span>
                    )}
                  </span>
                  <span
                    className="pixel-chip mt-2 mb-3 transition-colors group-focus-visible:outline-2 group-focus-visible:outline-ink"
                    style={{
                      fontSize: "12px",
                      ...(isSel
                        ? { background: "var(--harvest-pale)", boxShadow: "inset 0 0 0 2px var(--harvest-deep)" }
                        : {}),
                    }}
                  >
                    {name}
                  </span>
                </button>
              );
            })}
          </div>
          {/* barn floor */}
          <div className="band-dirt -mx-3 md:-mx-8" style={{ height: "calc(var(--px) * 10)" }} aria-hidden />
        </div>

        {/* the social menu */}
        <div className="panel-paper px-5 py-5 md:px-7 md:py-6">
          <div className="flex items-start gap-4 md:gap-5">
            <div
              className="hidden sm:block panel-paper pixel-corners p-1.5 shrink-0"
              style={{ boxShadow: "inset 0 0 0 2px var(--wood-mid)" }}
              aria-hidden
            >
              <Image
                src={active.photo}
                alt=""
                width={72}
                height={72}
                style={{ imageRendering: "pixelated" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-ink text-xl leading-tight">{active.name}</h3>
                <p className="font-sans text-ink-3 text-xs tracking-[0.14em] uppercase">{active.role}</p>
              </div>
              <div className="min-h-[52px] mt-1.5 flex flex-col">
                <TypeLine key={active.name} text={active.bio} />
              </div>
              <a
                href={active.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-chip inline-flex mt-3"
                style={{ fontSize: "12px" }}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* the whole roster, always in the DOM for no-JS and screen readers */}
      <ul className="sr-only">
        {TEAM.map(({ name, role, bio, linkedin }) => (
          <li key={name}>
            {name}, {role}. {bio}{" "}
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              {name} on LinkedIn
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
