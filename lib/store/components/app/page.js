import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function Home() {
  const { data: reciters } = await supabase
    .from("reciters")
    .select("*")
    .limit(12);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-black text-emerald-500 mb-10">
        مكتبة التلاوات القرآنية
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {reciters?.map((r) => (
          <Link
            key={r.id}
            href={`/reciter/${r.slug}`}
            className="bg-zinc-900 p-5 rounded-2xl text-center hover:bg-zinc-800 transition"
          >
            <div className="w-20 h-20 mx-auto mb-3 bg-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {r.name[0]}
            </div>
            <h3 className="text-white text-sm font-bold">{r.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
