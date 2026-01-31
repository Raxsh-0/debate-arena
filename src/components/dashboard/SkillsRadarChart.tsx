import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface SkillsData {
  persuasion: number;
  vocabulary: number;
  logic: number;
  speed: number;
  rebuttal: number;
}

interface SkillsRadarChartProps {
  data: SkillsData;
}

export function SkillsRadarChart({ data }: SkillsRadarChartProps) {
  const chartData = [
    { skill: "Persuasion", value: data.persuasion, fullMark: 100 },
    { skill: "Vocabulary", value: data.vocabulary, fullMark: 100 },
    { skill: "Logic", value: data.logic, fullMark: 100 },
    { skill: "Speed", value: data.speed, fullMark: 100 },
    { skill: "Rebuttal", value: data.rebuttal, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData}>
        <PolarGrid 
          stroke="hsl(var(--border))" 
          strokeOpacity={0.5}
        />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={{ 
            fill: "hsl(var(--muted-foreground))", 
            fontSize: 12,
            fontWeight: 500 
          }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}