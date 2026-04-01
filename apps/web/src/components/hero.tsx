import { ChevronRight, Github } from "lucide-react";
import type { Variants } from "motion/react";
import Link from "next/link";
import {
  IconAstro,
  IconBun,
  IconClaude,
  IconClaudeCode,
  IconDocker,
  IconGo,
  IconNextjs,
  IconNodeJs,
  IconPython,
} from "@/assets";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextEffect } from "@/components/ui/text-effect";
import { gitConfig } from "@/lib/layout.shared";
import { Spotlight } from "./ui/spotlight";

const transitionVariants: { item: Variants } = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

const iconCards = [
  {
    label: "Bun",
    Icon: IconBun,
    wrapperClassName: "ml-auto blur-[2px]",
    iconClassName: "size-4",
  },
  {
    label: "NodeJs",
    Icon: IconNodeJs,
    wrapperClassName: "ml-auto",
    iconClassName: "size-4",
  },
  {
    label: "Astro",
    Icon: IconAstro,
    wrapperClassName: "ml-auto blur-[2px]",
    iconClassName: "size-4",
  },
  {
    label: "Claude Code",
    Icon: IconClaudeCode,
    wrapperClassName: "mr-auto",
    iconClassName: "size-4",
  },
  {
    label: "Python",
    Icon: IconPython,
    wrapperClassName: "blur-[2px]",
    iconClassName: "size-3 sm:size-4",
  },
  {
    label: "Next.js",
    Icon: IconNextjs,
    wrapperClassName: "",
    iconClassName: "size-3 sm:size-4",
  },
  {
    label: "Go",
    Icon: IconGo,
    wrapperClassName: "ml-auto blur-[2px]",
    iconClassName: "size-3 sm:size-4",
  },
  {
    label: "Docker",
    Icon: IconDocker,
    wrapperClassName: "",
    iconClassName: "size-3 sm:size-4",
  },
  {
    label: "Claude",
    Icon: IconClaude,
    wrapperClassName: "blur-[2px]",
    iconClassName: "size-3 sm:size-4",
  },
] as const;

export default function HeroSection() {
  const githubUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

  return (
    <>
      <main className="overflow-hidden">
        <section className="bg-background">
          <div className="relative pb-32 pt-44">
            <Spotlight />
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
              <div className="mx-auto mb-16 max-w-xl lg:mb-24">
                <div className="**:fill-foreground grid scale-95 grid-cols-3 gap-12">
                  {iconCards.map(
                    (
                      { label, Icon, wrapperClassName, iconClassName },
                      index,
                    ) => (
                      <AnimatedGroup
                        key={label}
                        className={wrapperClassName}
                        variants={{
                          container: {
                            visible: {
                              transition: {
                                delayChildren: index * 0.08 + 0.1,
                              },
                            },
                          },
                          ...transitionVariants,
                        }}
                      >
                        <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                          <Icon className={iconClassName} />
                          <span className="text-nowrap font-medium max-sm:text-xs">
                            {label}
                          </span>
                        </Card>
                      </AnimatedGroup>
                    ),
                  )}
                </div>
              </div>
              <div className="mx-auto max-w-5xl text-center">
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.4}
                  delay={0.9}
                  as="h1"
                  className="text-balance font-pixel-circle font-medium text-5xl sm:text-6xl"
                >
                  The self-hosted way to run code you did not write.
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={1.95}
                  as="p"
                  className="text-muted-foreground mt-4 text-balance"
                >
                  Opensbx is an local-first sandbox runtime for untrusted or
                  AI-generated code.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          delayChildren: 2.35,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-6 flex justify-center gap-3"
                >
                  <Button
                    className="pr-1.5"
                    render={
                      <Link transitionTypes={["slide-in"]} href="/docs" />
                    }
                    nativeButton={false}
                  >
                    <span className="text-nowrap">Start</span>
                    <ChevronRight className="opacity-50" />
                  </Button>
                  <Button
                    variant="outline"
                    render={
                      <Link
                        transitionTypes={["slide-in"]}
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                      />
                    }
                    nativeButton={false}
                  >
                    <Github className="opacity-70" />
                    <span className="text-nowrap">GitHub</span>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
