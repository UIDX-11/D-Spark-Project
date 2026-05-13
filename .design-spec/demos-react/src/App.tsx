import { ConfigProvider } from "@arco-design/web-react";
import truth from "../../config/figma_truth_table.json";
import ComponentStateMatrix from "./ComponentStateMatrix";
import { arcoDocUrl } from "./arcoDocRoutes";

type TruthRow = { display_name: string; figma_node_ids: string[]; figma_urls: string[] };

const rows = truth.rows as Record<string, TruthRow>;

export default function App() {
  const slugs = Object.keys(rows).sort();
  return (
    <ConfigProvider>
      <div className="min-h-screen bg-[var(--semantic-bg-page,#f7f7f7)] p-8 text-[var(--semantic-text-primary,#222)]">
        <header className="mx-auto max-w-5xl">
          <h1 className="text-xl font-semibold">design-spec · demos-react（Arco + tokens）</h1>
          <p className="mt-2 max-w-3xl text-sm text-[var(--semantic-text-secondary,#666)]">
            与静态 HTML 生成器解耦：共用 <code className="rounded bg-white/60 px-1">tokens.css</code> 与{" "}
            <code className="rounded bg-white/60 px-1">figma_truth_table.json</code>。卡片内为{" "}
            <strong>@arco-design/web-react</strong> 小矩阵，用于与{" "}
            <a className="text-[var(--semantic-text-link,#506daf)] underline" href="https://arco.design/react/docs/start" target="_blank" rel="noreferrer">
              官网组件文档
            </a>{" "}
            对照 API 与交互态（见 <code className="rounded bg-white/60 px-1">docs/REQUIREMENTS_AND_PLAN.md</code> §R14）。像素级 1:1 仍以 Figma +{" "}
            <code className="rounded bg-white/60 px-1">.design-spec/demos/components/&lt;slug&gt;.html</code> 为主路径。
          </p>
        </header>
        <main className="mx-auto mt-8 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {slugs.map((slug) => {
            const r = rows[slug];
            const primary = r.figma_urls[0];
            const demoRel = `.design-spec/demos/components/${slug}.html`;
            const arcoHref = arcoDocUrl(slug);
            return (
              <section
                key={slug}
                className="rounded-xl border border-[var(--semantic-border-subtle,#e8e8e8)] bg-[var(--semantic-bg-surface,#fff)] p-4 shadow-sm"
              >
                <div className="text-sm font-semibold">{r.display_name}</div>
                <div className="mt-1 font-mono text-xs text-[var(--semantic-text-secondary,#666)]">{slug}</div>
                <div className="mt-3 flex flex-col gap-2 text-xs">
                  <a className="text-[var(--semantic-text-link,#506daf)] underline" href={arcoHref} target="_blank" rel="noreferrer">
                    Arco Design Web React（文档）
                  </a>
                  {primary ? (
                    <a className="text-[var(--semantic-text-link,#506daf)] underline" href={primary} target="_blank" rel="noreferrer">
                      Figma（primary node）
                    </a>
                  ) : (
                    <span className="text-[var(--semantic-text-secondary,#666)]">Figma 待补（真源表）</span>
                  )}
                  <div className="font-mono text-[var(--semantic-text-secondary,#666)]">
                    静态 demo：<span className="select-all">{demoRel}</span>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-[var(--semantic-border-subtle,#e8e8e8)] bg-[var(--semantic-bg-page,#fafafa)] p-3 text-[var(--semantic-text-primary,#222)]">
                  <ComponentStateMatrix slug={slug} />
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </ConfigProvider>
  );
}
