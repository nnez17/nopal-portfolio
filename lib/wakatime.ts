export type WakaTimeItem = {
  name: string;
  total_seconds: number;
  percent: number;
  digital: string;
  decimal: string;
  text: string;
  hours: number;
  minutes: number;
};

export type WakaTimeStats = {
  total_seconds: number;
  human_readable_total: string;
  human_readable_daily_average: string;
  days_minus: number;
  languages: WakaTimeItem[];
  editors: WakaTimeItem[];
  operating_systems: WakaTimeItem[];
  categories: WakaTimeItem[];
};

export type WakaTimeAllTime = {
  text: string;
  total_seconds: number;
  is_including_today: boolean;
};

export type WakaTimeData = {
  stats: WakaTimeStats;
  allTime: WakaTimeAllTime;
};

type WakaTimeStatsResponse = {
  data: WakaTimeStats;
};

type WakaTimeAllTimeResponse = {
  data: WakaTimeAllTime;
};

function getBase64Credentials(): string {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) throw new Error("WAKATIME_API_KEY is not set");
  return Buffer.from(apiKey).toString("base64");
}

export async function fetchWakatimeStats(): Promise<WakaTimeData | null> {
  try {
    const credentials = getBase64Credentials();
    const authHeader = `Basic ${credentials}`;
    const headers: HeadersInit = {
      Authorization: authHeader,
      Accept: "application/json",
    };

    const [statsRes, allTimeRes] = await Promise.all([
      fetch(
        "https://wakatime.com/api/v1/users/current/stats/last_7_days",
        { headers, next: { revalidate: 3600 } },
      ),
      fetch(
        "https://wakatime.com/api/v1/users/current/all_time_since_today",
        { headers, next: { revalidate: 3600 } },
      ),
    ]);

    if (!statsRes.ok) {
      console.error(`WakaTime stats API error: ${statsRes.status}`);
      return null;
    }
    if (!allTimeRes.ok) {
      console.error(`WakaTime all_time API error: ${allTimeRes.status}`);
      return null;
    }

    const statsData =
      (await statsRes.json()) as WakaTimeStatsResponse;
    const allTimeData =
      (await allTimeRes.json()) as WakaTimeAllTimeResponse;

    return {
      stats: statsData.data,
      allTime: allTimeData.data,
    };
  } catch (error) {
    console.error("WakaTime fetch error:", error);
    return null;
  }
}
