"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  type Chart,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import SectionReveal from "@/components/animations/SectionReveal";
import type { WakaTimeData } from "@/lib/wakatime";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);
const PALETTE = [
  "#3b82f6",
  "#06b6d4",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#f43f5e",
  "#14b8a6",
];

function useIsDark() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const el = document.documentElement;
    setIsDark(el.getAttribute("data-theme") !== "light");
    const obs = new MutationObserver(() =>
      setIsDark(el.getAttribute("data-theme") !== "light"),
    );
    obs.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

export default function WakaTimeSection() {
  const [data, setData] = useState<WakaTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const isDark = useIsDark();

  useEffect(() => {
    fetch("/api/wakatime")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: WakaTimeData | null) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="wakatime" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-(--color-border) border-t-blue-500" />
          </div>
        </div>
      </section>
    );
  }

  const stats = data?.stats ?? null;
  const allTime = data?.allTime ?? null;

  const topLangs = (stats?.languages ?? []).slice(0, 8);
  const otherPct =
    topLangs.length > 0 ? 100 - topLangs.reduce((s, l) => s + l.percent, 0) : 0;
  const otherSecs =
    topLangs.length > 0
      ? (stats?.total_seconds ?? 0) -
        topLangs.reduce((s, l) => s + l.total_seconds, 0)
      : 0;
  const langLabels = [
    ...topLangs.map((l) => l.name),
    otherPct > 0 ? "Other" : "",
  ].filter(Boolean);
  const langValues = [
    ...topLangs.map((l) => l.percent),
    otherPct > 0 ? otherPct : 0,
  ].filter((v) => v > 0);

  const fmtTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.round((secs % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };
  const langTimes = [
    ...topLangs.map((l) => fmtTime(l.total_seconds)),
    ...(otherPct > 0 ? [fmtTime(otherSecs)] : []),
  ].slice(0, langLabels.length);

  const hasLangs = langLabels.length > 0;
  const hasEditors = (stats?.editors ?? []).length > 0;
  const hasOS = (stats?.operating_systems ?? []).length > 0;
  const hasCategories = (stats?.categories ?? []).length > 0;

  const toPercent = (items: { percent: number }[]) =>
    items.map((e) => +e.percent.toFixed(1));

  const tooltipBg = isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.9)";
  const tickColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "#1e293b" : "#e2e8f0";
  const tooltipBorder = isDark ? "#334155" : "#cbd5e1";

  const baseChartOpts = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800, easing: "easeOutQuart" as const },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: isDark ? "#f8fafc" : "#0f172a",
        bodyColor: tickColor,
        borderColor: tooltipBorder,
        borderWidth: 1,
        padding: 10,
        cornerRadius: 8,
      },
    },
  };

  const barChartOpts = {
    ...baseChartOpts,
    plugins: {
      ...baseChartOpts.plugins,
      tooltip: {
        ...baseChartOpts.plugins.tooltip,
        callbacks: {
          label: (ctx: { parsed: { x: number | null } }) =>
            `${ctx.parsed.x ?? 0}%`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: tickColor,
          font: { size: 11 },
          callback: (v: unknown) => `${v}%`,
        },
        grid: { display: false },
      },
      y: {
        ticks: { color: tickColor, font: { size: 11 } },
        grid: { display: false },
      },
    },
  };

  const pieData = {
    labels: langLabels,
    datasets: [
      {
        data: langValues.length > 0 ? langValues : [1],
        backgroundColor: langValues.length > 0 ? PALETTE : [gridColor],
        borderColor: isDark ? "#0f172a" : "#fff",
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };

  const pieLabelsPlugin = {
    id: "pieLabels",
    afterDraw(chart: Chart) {
      const tooltip = (chart as Chart & { tooltip?: { opacity: number } })
        .tooltip;
      if (tooltip && tooltip.opacity > 0) return;

      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      const dataset = chart.data.datasets[0];

      for (let i = 0; i < meta.data.length; i++) {
        const raw = dataset.data[i];
        const pct = typeof raw === "number" ? raw : 0;
        if (pct < 5) continue;

        const arc = meta.data[i] as unknown as {
          x: number;
          y: number;
          startAngle: number;
          endAngle: number;
          innerRadius: number;
          outerRadius: number;
        };
        const midAngle = (arc.startAngle + arc.endAngle) / 2;
        const r = (arc.innerRadius + arc.outerRadius) / 2;
        const x = arc.x + Math.cos(midAngle) * r * 0.7;
        const y = arc.y + Math.sin(midAngle) * r * 0.7;
        const label = String(chart.data.labels?.[i] ?? "");

        ctx.save();
        ctx.fillStyle = "#fff";
        ctx.font = `bold ${pct > 15 ? 12 : 10}px Inter, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 3;
        ctx.fillText(label, x, y);
        ctx.restore();
      }
    },
  };

  const mkBarData = (labels: string[], values: number[]) => ({
    labels,
    datasets: [
      {
        data: values.length > 0 ? values : [0],
        backgroundColor: PALETTE.slice(0, Math.max(labels.length, 1)),
        borderRadius: 4,
        borderSkipped: false,
        barThickness: 28,
        maxBarThickness: 28,
      },
    ],
  });

  const catData = mkBarData(
    (stats?.categories ?? []).map((c) => c.name),
    hasCategories ? toPercent(stats?.categories ?? []) : [0],
  );
  const editorsData = mkBarData(
    (stats?.editors ?? []).map((e) => e.name),
    hasEditors ? toPercent(stats?.editors ?? []) : [0],
  );
  const osData = mkBarData(
    (stats?.operating_systems ?? []).map((o) => o.name),
    hasOS ? toPercent(stats?.operating_systems ?? []) : [0],
  );

  return (
    <section id="wakatime" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 block text-xs tracking-widest uppercase text-(--color-text-muted)">
              Stats
            </span>
            <h2 className="mb-2 text-4xl font-bold tracking-tight text-(--color-foreground) sm:text-5xl">
              My <span className="text-gradient">Coding Activity</span>
            </h2>
            {allTime && (
              <p className="text-sm text-(--color-text-muted)">
                {allTime.text} tracked
              </p>
            )}
          </div>
        </SectionReveal>

        <SectionReveal animation="fadeUp" delay={0.05}>
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {[
                {
                  label: "Last 7 Days",
                  value: stats?.human_readable_total ?? "—",
                },
                {
                  label: "Daily Average",
                  value: stats?.human_readable_daily_average ?? "—",
                },
                { label: "Languages", value: stats?.languages.length ?? "—" },
              ].map((item) => (
                <div key={item.label} className="px-5 py-7 text-center">
                  <p className="text-2xl font-bold text-(--color-foreground) sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-(--color-text-muted)">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <div className="mb-16">
          {hasLangs ? (
            <SectionReveal animation="fadeUp" delay={0.1}>
              <div className="mx-auto max-w-3xl">
                <div className="mb-8 text-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-foreground)">
                    Languages
                  </h3>
                </div>
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-center sm:gap-12">
                  <div className="h-56 w-56 shrink-0 sm:h-64 sm:w-64">
                    <Pie
                      data={pieData}
                      plugins={[pieLabelsPlugin]}
                      options={{
                        ...baseChartOpts,
                        plugins: {
                          ...baseChartOpts.plugins,
                          legend: { display: false },
                          tooltip: {
                            ...baseChartOpts.plugins.tooltip,
                            callbacks: {
                              label: (ctx: {
                                label?: string;
                                parsed: number;
                                dataIndex: number;
                              }) =>
                                `${ctx.label} – ${langTimes[ctx.dataIndex] ?? ""} (${ctx.parsed?.toFixed(2) ?? 0}%)`,
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="space-y-2.5">
                    {langLabels.map((label, i) => (
                      <div
                        key={label}
                        className="flex items-center gap-2.5 text-sm"
                      >
                        <span
                          className="inline-block size-3 shrink-0 rounded-sm"
                          style={{
                            backgroundColor: PALETTE[i % PALETTE.length],
                          }}
                        />
                        <span className="text-(--color-text-secondary)">
                          {label} – {langTimes[i]} ({langValues[i]?.toFixed(2)}
                          %)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          ) : (
            <div className="flex h-72 items-center justify-center rounded-xl border border-dashed border-(--color-border)">
              <p className="text-sm text-(--color-text-muted)">
                No language data yet
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-14 md:grid-cols-3">
          <SectionReveal animation="fadeUp" delay={0.15}>
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-cyan-500" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-foreground)">
                  Categories
                </h3>
              </div>
              {hasCategories ? (
                <div className="h-40 sm:h-52">
                  <Bar
                    data={catData}
                    options={{
                      ...barChartOpts,
                      indexAxis: "y",
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-40 sm:h-52 items-center justify-center rounded-xl border border-dashed border-(--color-border)">
                  <p className="text-sm text-(--color-text-muted)">No data</p>
                </div>
              )}
            </div>
          </SectionReveal>

          <SectionReveal animation="fadeUp" delay={0.2}>
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-purple-500" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-foreground)">
                  Editors
                </h3>
              </div>
              {hasEditors ? (
                <div className="h-40 sm:h-52">
                  <Bar
                    data={editorsData}
                    options={{
                      ...barChartOpts,
                      indexAxis: "y",
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-40 sm:h-52 items-center justify-center rounded-xl border border-dashed border-(--color-border)">
                  <p className="text-sm text-(--color-text-muted)">No data</p>
                </div>
              )}
            </div>
          </SectionReveal>

          <SectionReveal animation="fadeUp" delay={0.25}>
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-(--color-foreground)">
                  OS
                </h3>
              </div>
              {hasOS ? (
                <div className="h-40 sm:h-52">
                  <Bar
                    data={osData}
                    options={{
                      ...barChartOpts,
                      indexAxis: "y",
                    }}
                  />
                </div>
              ) : (
                <div className="flex h-40 sm:h-52 items-center justify-center rounded-xl border border-dashed border-(--color-border)">
                  <p className="text-sm text-(--color-text-muted)">No data</p>
                </div>
              )}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
