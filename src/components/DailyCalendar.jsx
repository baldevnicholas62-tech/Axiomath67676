const DAYS = 180;
const COLS = Math.ceil(DAYS / 7);
const DAY_SIZE = 12;
const GAP = 3;

const LEVELS = [
  "#e5e5e5",        // 0 problems
  "#17171725",      // 1-2
  "#17171755",      // 3-5
  "#171717aa",      // 6-9
  "#171717",        // 10+
];

function getLevel(count) {
  if (!count || count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function toDateStr(d) {
  return d.toISOString().split("T")[0];
}

function buildGrid() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Walk back to the most recent Sunday to align the grid
  const endDay = new Date(today);
  const startDay = new Date(today);
  startDay.setDate(startDay.getDate() - DAYS + 1);

  // Align to start of week (Sunday)
  const dayOfWeek = startDay.getDay();
  startDay.setDate(startDay.getDate() - dayOfWeek);

  const cells = [];
  const cursor = new Date(startDay);
  while (cursor <= endDay) {
    cells.push({
      date: toDateStr(cursor),
      col: Math.floor(cells.length / 7),
      row: cells.length % 7,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return cells;
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["Sun", "", "Tue", "", "Thu", "", "Sat"];

export default function DailyCalendar({ data = {} }) {
  const cells = buildGrid();
  const totalCols = cells.length > 0 ? cells[cells.length - 1].col + 1 : 0;
  const width = totalCols * (DAY_SIZE + GAP) + 30;
  const height = 7 * (DAY_SIZE + GAP) + 20;

  // Month labels
  const months = [];
  let lastMonth = -1;
  for (const cell of cells) {
    if (cell.row === 0) {
      const m = new Date(cell.date).getMonth();
      if (m !== lastMonth) {
        months.push({ col: cell.col, label: MONTH_NAMES[m] });
        lastMonth = m;
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <svg width={width} height={height} className="block">
          {/* Day of week labels */}
          {DAY_LABELS.map((label, i) =>
            label ? (
              <text
                key={i}
                x={0}
                y={20 + i * (DAY_SIZE + GAP) + DAY_SIZE / 2}
                fill="#737373"
                fontSize="9"
                dominantBaseline="middle"
                opacity="0.5"
              >
                {label}
              </text>
            ) : null,
          )}

          {/* Month labels */}
          {months.map((m, i) => (
            <text
              key={i}
              x={30 + m.col * (DAY_SIZE + GAP)}
              y={10}
              fill="#737373"
              fontSize="9"
              opacity="0.5"
            >
              {m.label}
            </text>
          ))}

          {/* Cells */}
          {cells.map((cell) => {
            const count = data[cell.date] ?? 0;
            const level = getLevel(count);
            const x = 30 + cell.col * (DAY_SIZE + GAP);
            const y = 20 + cell.row * (DAY_SIZE + GAP);
            return (
              <g key={cell.date}>
                <rect
                  x={x}
                  y={y}
                  width={DAY_SIZE}
                  height={DAY_SIZE}
                  rx={2}
                  fill={LEVELS[level]}
                  stroke={level > 0 ? "#17171715" : "transparent"}
                  strokeWidth="0.5"
                  className="transition-colors duration-200"
                >
                  <title>
                    {cell.date}: {count} problem{count !== 1 ? "s" : ""}
                  </title>
                </rect>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 text-[10px] text-text-muted/50">
        <span>Less</span>
        {LEVELS.map((color, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
