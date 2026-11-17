const skills = [
  "TypeScript 基础类型",
  "Next.js App Router",
  "Tailwind CSS 布局",
  "Git 与 GitHub 推送",
  "Next.js 项目结构",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-20">
        <header className="space-y-4">
          <p className="text-sm font-medium tracking-widest text-cyan-400 uppercase">
            Week 1 · Day 6
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            这是我的第一个全栈项目
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-300">
            目标：用 Next.js + TypeScript 跑通页面，下一步接入数据库和认证。
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-100">本周已掌握</h2>
          <ul className="space-y-2">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-slate-200"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <footer className="border-t border-slate-800 pt-6 text-sm text-slate-500">
          第 6 天完成：页面可改、热更新生效。第 7 天：推上 GitHub。
        </footer>
      </div>
    </main>
  );
}