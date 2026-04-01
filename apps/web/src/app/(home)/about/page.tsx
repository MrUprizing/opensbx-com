import { ArrowRight, Gauge, Shield, Sparkles, Terminal } from "lucide-react";
import type { Variants } from "motion/react";
import Link from "next/link";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextEffect } from "@/components/ui/text-effect";

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
        bounce: 0.2,
        duration: 1.2,
      },
    },
  },
};

const principles = [
  {
    title: "Secure by Default",
    description:
      "Run untrusted and AI-generated code in isolated sandboxes without compromising your host.",
    Icon: Shield,
  },
  {
    title: "Fast Local Loops",
    description:
      "Local-first execution keeps feedback instant so teams can ship faster with less friction.",
    Icon: Gauge,
  },
  {
    title: "Built for Builders",
    description:
      "Simple primitives, clean APIs, and practical defaults designed for engineering teams.",
    Icon: Terminal,
  },
] as const;

const timeline = [
  {
    step: "01",
    title: "The Problem",
    description:
      "AI can write code quickly, but running that code safely in production workflows is still hard.",
  },
  {
    step: "02",
    title: "The Approach",
    description:
      "Opensbx makes execution isolated, predictable, and local-first so unsafe code never leaks into your host.",
  },
  {
    step: "03",
    title: "The Goal",
    description:
      "Give teams confidence to evaluate, test, and ship generated code at scale with clear boundaries.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative pb-20 pt-40">
        <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.4}
            as="p"
            className="text-muted-foreground mb-4 font-medium"
          >
            About Opensbx
          </TextEffect>
          <TextEffect
            preset="fade-in-blur"
            speedSegment={0.35}
            delay={0.1}
            as="h1"
            className="max-w-3xl text-balance font-pixel-circle text-5xl font-medium sm:text-6xl"
          >
            We help teams run unknown code with known boundaries.
          </TextEffect>
          <TextEffect
            per="line"
            preset="fade-in-blur"
            speedSegment={0.3}
            delay={0.25}
            as="p"
            className="text-muted-foreground mt-6 max-w-2xl text-balance"
          >
            Opensbx is a local-first sandbox runtime for untrusted code. It is
            designed for modern teams shipping with AI, where safety and speed
            must coexist.
          </TextEffect>
        </div>
      </section>

      <section className="pb-10">
        <div className="mx-auto grid w-full max-w-5xl gap-3 px-6 md:grid-cols-3">
          {principles.map(({ title, description, Icon }, index) => (
            <AnimatedGroup
              key={title}
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: index * 0.08 + 0.2,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <Card variant="outline" className="h-full p-6">
                <Icon className="text-foreground/80 mb-5 size-5" />
                <h2 className="font-pixel-square text-lg">{title}</h2>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {description}
                </p>
              </Card>
            </AnimatedGroup>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-full max-w-5xl px-6">
          <Card variant="outline" className="p-6 sm:p-8">
            <div className="mb-8 max-w-xl space-y-2">
              <h2 className="font-pixel-circle text-3xl">Why we exist</h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                We are building the execution layer for the AI-native software
                workflow.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 md:gap-4">
              {timeline.map((item) => (
                <div key={item.step} className="space-y-3">
                  <span className="text-muted-foreground text-xs tracking-[0.2em]">
                    {item.step}
                  </span>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  <Sparkles className="size-3.5" />
                  Ready to explore?
                </div>
                <h2 className="max-w-xl font-pixel-circle text-3xl leading-tight">
                  Start building with safer execution defaults.
                </h2>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  render={<Link transitionTypes={["slide-in"]} href="/" />}
                  nativeButton={false}
                >
                  <span>Back Home</span>
                </Button>
                <Button
                  render={<Link transitionTypes={["slide-in"]} href="/docs" />}
                  nativeButton={false}
                  className="pr-1.5"
                >
                  <span>Read Docs</span>
                  <ArrowRight className="opacity-60" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
