"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { useBooks } from "@/context/BooksContext";

const colors = ["#3B82F6", "#54C1A0", "#F0BA47", "#EC8552", "#E5301F"];

type TriangleBarProps = {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

// বারের ত্রিভুজের মতো আকারের SVG path
const getPath = (x: number, y: number, width: number, height: number) =>
  `M${x},${y + height}
   C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2},${y}
   C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
   Z`;

function TriangleBar({ fill, x = 0, y = 0, width = 0, height = 0 }: TriangleBarProps) {
  return <path d={getPath(x, y, width, height)} fill={fill} stroke="none" />;
}

export default function PagesToReadPage() {
  const { readBooks } = useBooks();

  const data = readBooks.map((book) => ({
    name: book.bookName,
    pages: book.totalPages,
  }));

  if (data.length === 0) {
    return (
      <p className="text-center text-gray-500 py-24">
        No read books yet. Mark some books as Read to see the chart.
      </p>
    );
  }

  return (
    <div className="bg-[#F8F8F8] rounded-3xl my-8 p-6 h-[450px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Bar
            dataKey="pages"
            shape={(props: unknown) => (
              <TriangleBar {...(props as TriangleBarProps)} />
            )}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index % colors.length]} />
            ))}
            <LabelList dataKey="pages" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}