import { ChevronRight } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Features from "./features-1";
import { HeroHeader } from "./header";
import { Spotlight } from "./ui/spotlight";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section className="bg-background">
          <div className="relative pb-32 pt-44">
            <Spotlight />
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
              <div className="mx-auto mb-16 max-w-xl lg:mb-24">
                <div className="**:fill-foreground grid scale-95 grid-cols-3 gap-12">
                  <div className="ml-auto blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <IconBun className="size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Bun
                      </span>
                    </Card>
                  </div>
                  <div className="ml-auto">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <IconNodeJs className="size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        NodeJs
                      </span>
                    </Card>
                  </div>
                  <div className="ml-auto blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <IconAstro className="size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Astro
                      </span>
                    </Card>
                  </div>
                  <div className="mr-auto">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <IconClaudeCode className="size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Claude Code
                      </span>
                    </Card>
                  </div>
                  <div className="blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <IconPython className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Python
                      </span>
                    </Card>
                  </div>
                  <div>
                    <Card className="shadow-foreground/10 mx-a flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <IconNextjs className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Next.js
                      </span>
                    </Card>
                  </div>
                  <div className="ml-auto blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <IconGo className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Go
                      </span>
                    </Card>
                  </div>
                  <div>
                    <Card className="shadow-foreground/10 mx-a flex h-10 h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <IconDocker className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Docker
                      </span>
                    </Card>
                  </div>
                  <div className="blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <IconClaude className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Claude
                      </span>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-5xl text-center">
                <h1 className="text-balance font-pixel-circle font-medium text-5xl sm:text-6xl">
                  The self-hosted way to run code you did not write.
                </h1>
                <p className="text-muted-foreground mt-4 text-balance">
                  Opensbx is an local-first sandbox runtime for untrusted or
                  AI-generated code.
                </p>

                <Button
                  className="mt-6 pr-1.5"
                  render={<Link href="/docs" />}
                  nativeButton={false}
                >
                  <span className="text-nowrap">Start Building</span>
                  <ChevronRight className="opacity-50" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Features />
    </>
  );
}
