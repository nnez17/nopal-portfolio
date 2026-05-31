"use client";

import { Calendar, Code2, Cpu, Monitor, Timer } from "lucide-react";
import type { WakaTimeData } from "@/lib/wakatime";
import AnimatedSection from "@/components/animations/AnimatedSection";

type Props = {
  stats: WakaTimeData | null;
};

const barColors = [
  "from-blue-500 to-blue-400",
  "from-cyan-500 to-cyan-400",
  "from-purple-500 to-purple-400",
  "from-emerald-500 to-emerald-400",
  "from-amber-500 to-amber-400",
  "from-rose-500 to-rose-400",
  "from-indigo-500 to-indigo-400",
  "from-teal-500 to-teal-400",
];

export default function WakatimeSection({ stats }: Props) {
  if (!stats) return null;

  const { stats: weekStats, allTime } = stats;
  const topLanguages = weekStats.languages
    .slice(0, 8)
    .filter((l) => l.percent > 0);
  const topEditors = weekStats.editors
    .slice(0, 3)
    .filter((e) => e.percent > 0);
  const topOs = weekStats.operating_systems
    .slice(0, 3)
    .filter((o) => o.percent > 0);
  const topCategories = weekStats.categories
    .slice(0, 4)
    .filter((c) => c.percent > 0);

  if (topLanguages.length === 0) return null;

  return (
    <section id="wakatime" className="relative overflow-hidden py-24">
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full acrylic-light px-4 py-1.5 text-sm font-medium text-accent-cyan">
              <Code2 size={16} />
              Coding Activity
            </span>
            <h2 className="mb-4 text-4xl font-bold text-theme-primary md:text-5xl">
              WakaTime <span className="text-gradient">Stats</span>
            </h2>
            <p className="mx-auto max-w-2xl text-theme-tertiary">
              Live from my editor — automatically tracked coding activity
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" stagger={0.12} selector=".stat-item">
          <div className="stat-row mb-16 grid grid-cols-3 items-center justify-center">
            <div className="stat-item text-center">
              <div className="text-3xl font-bold text-theme-primary md:text-4xl">
                {allTime.text}
              </div>
              <div className="mt-1 text-sm text-theme-muted">All Time</div>
            </div>

            <div className="flex justify-center">
              <div className="h-12 w-px bg-theme-muted/30" />
            </div>

            <div className="stat-item text-center">
              <div className="text-3xl font-bold text-theme-primary md:text-4xl">
                {weekStats.human_readable_total}
              </div>
              <div className="mt-1 text-sm text-theme-muted">
                Last {weekStats.days_minus} Days
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-12 w-px bg-theme-muted/30" />
            </div>

            <div className="stat-item text-center">
              <div className="text-3xl font-bold text-theme-primary md:text-4xl">
                {weekStats.human_readable_daily_average}
              </div>
              <div className="mt-1 text-sm text-theme-muted">Daily Average</div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid gap-10 lg:grid-cols-5">
          <AnimatedSection
            animation="fadeUp"
            stagger={0.08}
            selector=".lang-item"
            className="lg:col-span-3"
          >
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="mb-8 flex items-center gap-2 text-theme-secondary">
                <Timer size={18} className="text-accent-cyan" />
                <span className="text-lg font-medium">Top Languages</span>
              </div>

              <div className="space-y-5">
                {topLanguages.map((lang, i) => (
                  <div key={lang.name} className="lang-item space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-theme-primary">
                          {lang.name}
                        </span>
                        <span className="text-xs text-theme-muted tabular-nums">
                          {lang.text}
                        </span>
                      </div>
                      <span className="text-theme-muted tabular-nums">
                        {lang.percent.toFixed(1)}%
                      </span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-theme-muted/15">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${barColors[i % barColors.length]} transition-all duration-700`}
                        style={{ width: `${Math.max(lang.percent, 1)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection
            animation="fadeUp"
            stagger={0.1}
            selector=".breakdown-item"
            className="lg:col-span-2"
          >
            <div className="mx-auto max-w-sm space-y-10 lg:mx-0 lg:max-w-none">
              {topEditors.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-2 text-theme-secondary">
                    <Code2 size={16} className="text-accent-cyan" />
                    <span className="text-sm font-medium">Editors</span>
                  </div>
                  <div className="space-y-3">
                    {topEditors.map((editor, i) => (
                      <div key={editor.name} className="breakdown-item">
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="text-theme-primary">
                            {editor.name}
                          </span>
                          <span className="text-theme-muted tabular-nums">
                            {editor.percent.toFixed(0)}%
                          </span>
                        </div>
                        <div className="relative h-1.5 overflow-hidden rounded-full bg-theme-muted/15">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${barColors[(i + 3) % barColors.length]}`}
                            style={{ width: `${Math.max(editor.percent, 2)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {topOs.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-2 text-theme-secondary">
                    <Monitor size={16} className="text-accent-cyan" />
                    <span className="text-sm font-medium">Operating Systems</span>
                  </div>
                  <div className="space-y-3">
                    {topOs.map((os, i) => (
                      <div key={os.name} className="breakdown-item">
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="text-theme-primary">{os.name}</span>
                          <span className="text-theme-muted tabular-nums">
                            {os.percent.toFixed(0)}%
                          </span>
                        </div>
                        <div className="relative h-1.5 overflow-hidden rounded-full bg-theme-muted/15">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${barColors[(i + 5) % barColors.length]}`}
                            style={{ width: `${Math.max(os.percent, 2)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {topCategories.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-2 text-theme-secondary">
                    <Cpu size={16} className="text-accent-cyan" />
                    <span className="text-sm font-medium">Activity</span>
                  </div>
                  <div className="space-y-3">
                    {topCategories.map((cat, i) => (
                      <div key={cat.name} className="breakdown-item">
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="capitalize text-theme-primary">
                            {cat.name}
                          </span>
                          <span className="text-theme-muted tabular-nums">
                            {cat.percent.toFixed(0)}%
                          </span>
                        </div>
                        <div className="relative h-1.5 overflow-hidden rounded-full bg-theme-muted/15">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${barColors[(i + 7) % barColors.length]}`}
                            style={{ width: `${Math.max(cat.percent, 2)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {allTime.is_including_today && (
          <AnimatedSection animation="fadeUp">
            <div className="mt-14 flex items-center justify-center gap-2 text-sm text-theme-muted">
              <Calendar size={14} />
              <span>Includes today&apos;s activity</span>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
