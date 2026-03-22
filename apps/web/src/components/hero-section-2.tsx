import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Claude } from "@/components/ui/svgs/claude";
import { ClerkIconLight as Clerk } from "@/components/ui/svgs/clerk";
import { Figma } from "@/components/ui/svgs/figma";
import { Firebase } from "@/components/ui/svgs/firebase";
import { Linear } from "@/components/ui/svgs/linear";
import { Slack } from "@/components/ui/svgs/slack";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Twilio } from "@/components/ui/svgs/twilio";
import { Vercel } from "@/components/ui/svgs/vercel";
import { HeroHeader } from "./header";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section className="bg-background">
          <div className="relative pb-32 pt-44">
            <div className="mask-radial-from-45% mask-radial-to-75% mask-radial-at-top mask-radial-[75%_100%] md:aspect-9/4 absolute inset-0 aspect-square opacity-65 dark:opacity-5">
              <Image
                src="/bg.avif"
                alt="hero background"
                width={2102}
                height={1694}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
              <div className="mx-auto mb-16 max-w-xl lg:mb-24">
                <div className="**:fill-foreground grid scale-95 grid-cols-3 gap-12">
                  <div className="ml-auto blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <Supabase className="size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Supabase
                      </span>
                    </Card>
                  </div>
                  <div className="ml-auto">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <Slack className="size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Slack
                      </span>
                    </Card>
                  </div>
                  <div className="ml-auto blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <Figma className="size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Figma
                      </span>
                    </Card>
                  </div>
                  <div className="mr-auto">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <Vercel className="size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Vercel
                      </span>
                    </Card>
                  </div>
                  <div className="blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <Firebase className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Firebase
                      </span>
                    </Card>
                  </div>
                  <div>
                    <Card className="shadow-foreground/10 mx-a flex h-10 h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <Linear className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Linear
                      </span>
                    </Card>
                  </div>
                  <div className="ml-auto blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <Twilio className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Twilio
                      </span>
                    </Card>
                  </div>
                  <div>
                    <Card className="shadow-foreground/10 mx-a flex h-10 h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <Claude className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Claude AI
                      </span>
                    </Card>
                  </div>
                  <div className="blur-[2px]">
                    <Card className="shadow-foreground/10 flex h-8 w-fit items-center gap-2 rounded-xl px-3 sm:h-10 sm:px-4">
                      <Clerk className="size-3 sm:size-4" />
                      <span className="text-nowrap font-medium max-sm:text-xs">
                        Clerk{" "}
                      </span>
                    </Card>
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-7xl text-center">
                <h1 className="text-balance font-pixel-circle text-4xl sm:text-7xl">
                  Ship faster. Integrate smarter.
                </h1>
                <p className="text-muted-foreground mt-4 text-balance">
                  Veil is your all-in-one engine for adding seamless
                  integrations to your app.
                </p>

                <Button
                  className="mt-6 pr-1.5"
                  render={<Link href="#link" />}
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
    </>
  );
}
