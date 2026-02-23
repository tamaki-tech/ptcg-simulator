<script lang="ts">
  let openFaq: number | null = null;

  function toggleFaq(index: number) {
    openFaq = openFaq === index ? null : index;
  }

  const benefits = [
    {
      icon: "⚡",
      title: "セットアップ時間をゼロに",
      desc: "公式デッキコードをそのまま入力。カードを1枚ずつ登録する手間が完全になくなる。",
    },
    {
      icon: "🎯",
      title: "デッキの安定度をすぐ検証",
      desc: "「このデッキ、本当に回るか」を本番前に確認。事故りやすいパターンを体で覚える。",
    },
    {
      icon: "🧠",
      title: "頭で考えた動きを手で確かめる",
      desc: "理論だけの構築を卒業。実際に動かして初めて見えるものがある。",
    },
    {
      icon: "🌐",
      title: "ブラウザだけで完結",
      desc: "ダウンロードもアカウント登録も不要。URLを開いたらすぐ使える。",
    },
  ];

  const features = [
    {
      badge: "最大の差別化",
      title: "デッキコード入力",
      desc: "公式サイトやデッキビルダーで発行したコードをそのまま貼るだけ。カードリストへの手入力は一切不要。デッキが瞬時に展開される。",
      visual: "deck-code",
    },
    {
      title: "ドロー・カード配置",
      desc: "山札からのドロー、バトル場・ベンチへの配置をドラッグ&ドロップで直感的に操作。ターンの流れを実際に体験しながら回せる。",
      visual: "drag-drop",
    },
    {
      badge: "競技勢向け",
      title: "ロストゾーン・トラッシュ管理",
      desc: "トラッシュとロストゾーンを別々に管理。ロスト軸デッキの手順確認に完全対応。",
      visual: "zones",
    },
    {
      badge: "競技勢向け",
      title: "ダメージカウンター操作",
      desc: "ポケモンへのダメカンの増減を画面上で管理。HP計算を頭の中だけで処理する負担をなくす。",
      visual: "damage",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "デッキコードをコピーする",
      desc: "公式ポケモンカードサイトまたはデッキビルダーで発行したデッキコードをコピーする。",
    },
    {
      num: "02",
      title: "コードを入力してデッキを読み込む",
      desc: "入力欄にデッキコードを貼り付けて「デッキを読み込む」を押す。デッキが即座に展開される。",
    },
    {
      num: "03",
      title: "ドローして、盤面を動かす",
      desc: "カードを引き、バトル場やベンチに配置し、本番さながらの手順で1人回しを始める。",
    },
  ];

  const comparison = [
    { feature: "公式デッキコードで即読み込み", sim: true, other: false },
    { feature: "インストール不要（ブラウザのみ）", sim: true, other: null },
    { feature: "アカウント登録不要", sim: true, other: null },
    { feature: "ロストゾーン管理", sim: true, other: false },
    { feature: "ダメージカウンター操作", sim: true, other: false },
    { feature: "完全無料", sim: true, other: null },
  ];

  const testimonials = [
    {
      quote:
        "デッキコードをそのまま貼れるのが革命的。他のツールで毎回手入力していた時間が完全になくなった。",
      name: "競技プレイヤー",
      sub: "シティリーグ参加者",
    },
    {
      quote:
        "ロストゾーンとトラッシュを別管理できるのが、ロスト軸使いには必須。ようやくまともに練習できる。",
      name: "中級者",
      sub: "ロストバレット使用",
    },
    {
      quote:
        "練習のたびにセットアップにかけていた5分が消えた。回す回数が増えると、動きが体に染み込む速度が違う。",
      name: "大会常連",
      sub: "レギュラー調整勢",
    },
  ];

  const faqs = [
    {
      q: "本当に無料ですか？",
      a: "完全無料です。サブスクリプションも機能制限もありません。デッキコードを入力してすぐ使い始められます。",
    },
    {
      q: "アカウント登録は必要ですか？",
      a: "不要です。ブラウザを開いてURLにアクセスするだけで、すぐ使えます。",
    },
    {
      q: "スマートフォンでも使えますか？",
      a: "ブラウザベースのWebアプリのため、スマートフォンからもアクセス可能です。快適な操作にはPCを推奨します。",
    },
    {
      q: "対応しているデッキコードの種類は？",
      a: "公式のポケモンカードゲームサイトおよび対応デッキビルダーで発行したデッキコード形式に対応しています。",
    },
    {
      q: "対戦相手と通信対戦できますか？",
      a: "現在は1人回し（ソロ練習）専用ツールです。デッキの動きを確認・練習することに特化しています。",
    },
    {
      q: "ロストゾーンには対応していますか？",
      a: "はい、ロストゾーンとトラッシュを別々に管理できます。ロスト軸デッキの実践的な練習に対応しています。",
    },
  ];
</script>

<svelte:head>
  <title>PtcgSim — デッキコードで即1人回し | 無料ポケカシミュレーター</title>
  <meta
    name="description"
    content="公式デッキコードをそのまま入力するだけで、すぐにポケモンカードの1人回し練習が始められます。ロストゾーン対応・ダメカン操作・完全無料。"
  />
</svelte:head>

<!-- ========== Hero ========== -->
<section class="bg-slate-950 text-white">
  <div class="max-w-5xl mx-auto px-6 py-28 text-center">
    <span
      class="inline-block text-sm font-medium bg-indigo-600 text-white px-4 py-1.5 rounded-full mb-8"
    >
      完全無料 · アカウント不要 · ブラウザで即利用可能
    </span>
    <h1 class="text-5xl font-bold leading-tight mb-6">
      デッキコードを貼るだけで、<br />今すぐ1人回し。
    </h1>
    <p class="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
      公式デッキコードをそのまま入力するだけ。カードの登録もリスト作り直しも不要。ドロー・バトル場・ロストゾーンを完全再現した、競技プレイヤーのための無料シミュレーター。
    </p>
    <a
      href="/app"
      class="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
    >
      今すぐデッキコードで試す（無料）
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </a>
    <p class="mt-4 text-sm text-slate-400">アカウント不要 · インストール不要</p>
  </div>
</section>

<!-- ========== Benefits ========== -->
<section class="bg-white py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-3">
      毎回のデッキ調整が、もっと速くなる。
    </h2>
    <p class="text-gray-500 text-center mb-14">
      デッキコードに対応しているのは、今のところここだけ。
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each benefits as b}
        <div class="border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div class="text-3xl mb-4">{b.icon}</div>
          <h3 class="font-bold text-gray-900 mb-2">{b.title}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ========== Features ========== -->
<section class="bg-gray-50 py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-16">
      シミュレーターに必要な機能を、すべて入れた。
    </h2>
    <div class="space-y-16">
      {#each features as f, i}
        <div
          class="flex flex-col {i % 2 === 0
            ? 'md:flex-row'
            : 'md:flex-row-reverse'} gap-10 items-center"
        >
          <!-- Text -->
          <div class="flex-1 space-y-4">
            <div class="flex flex-wrap items-center gap-2">
              {#if f.badge}
                <span
                  class="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full"
                  >{f.badge}</span
                >
              {/if}
              <h3 class="text-2xl font-bold text-gray-900">{f.title}</h3>
            </div>
            <p class="text-gray-500 leading-relaxed text-lg">{f.desc}</p>
          </div>

          <!-- Visual placeholder -->
          <div class="flex-1 w-full">
            {#if f.visual === "deck-code"}
              <div
                class="bg-slate-800 rounded-2xl p-6 flex flex-col gap-3 shadow-lg"
              >
                <p class="text-slate-400 text-xs font-mono">デッキコードを入力</p>
                <div
                  class="bg-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm tracking-widest"
                >
                  XXXXXX-XXXXXX-XXXXXX
                </div>
                <div
                  class="bg-indigo-500 rounded-lg py-2.5 text-white text-sm font-semibold text-center"
                >
                  デッキを読み込む
                </div>
                <p class="text-slate-500 text-xs text-center">↓ 即座にデッキが展開されます</p>
                <div class="grid grid-cols-6 gap-1 mt-1">
                  {#each Array(12) as _}
                    <div class="bg-slate-600 rounded aspect-[2/3]"></div>
                  {/each}
                </div>
              </div>
            {:else if f.visual === "drag-drop"}
              <div class="bg-slate-800 rounded-2xl p-6 shadow-lg flex flex-col gap-4">
                <div class="flex gap-3">
                  <div class="flex-1">
                    <p class="text-slate-400 text-xs mb-2">バトル場</p>
                    <div
                      class="bg-slate-700 rounded-xl border-2 border-dashed border-indigo-500 flex items-center justify-center h-20"
                    >
                      <div class="bg-indigo-400 rounded w-12 h-16 shadow-md"></div>
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="text-slate-400 text-xs mb-2">ベンチ</p>
                    <div class="flex gap-1">
                      {#each Array(3) as _, j}
                        <div
                          class="flex-1 bg-slate-700 rounded border border-slate-600 h-16 flex items-center justify-center"
                        >
                          {#if j === 0}
                            <div class="bg-slate-500 rounded w-8 h-12"></div>
                          {/if}
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>
                <div>
                  <p class="text-slate-400 text-xs mb-2">手札</p>
                  <div class="flex gap-1">
                    {#each Array(5) as _}
                      <div class="flex-1 bg-slate-600 rounded aspect-[2/3] hover:bg-indigo-500 transition-colors cursor-pointer"></div>
                    {/each}
                  </div>
                </div>
              </div>
            {:else if f.visual === "zones"}
              <div class="bg-slate-800 rounded-2xl p-6 shadow-lg flex gap-4">
                <div class="flex-1 bg-slate-700 rounded-xl p-4">
                  <p class="text-red-400 text-xs font-semibold mb-3">ロストゾーン</p>
                  <div class="space-y-1.5">
                    {#each Array(4) as _}
                      <div class="bg-red-900 rounded h-2 w-full opacity-60"></div>
                    {/each}
                  </div>
                  <p class="text-red-300 text-xs mt-3 font-mono">4枚</p>
                </div>
                <div class="flex-1 bg-slate-700 rounded-xl p-4">
                  <p class="text-amber-400 text-xs font-semibold mb-3">トラッシュ</p>
                  <div class="space-y-1.5">
                    {#each Array(6) as _}
                      <div class="bg-amber-900 rounded h-2 w-full opacity-60"></div>
                    {/each}
                  </div>
                  <p class="text-amber-300 text-xs mt-3 font-mono">6枚</p>
                </div>
              </div>
            {:else}
              <div class="bg-slate-800 rounded-2xl p-6 shadow-lg">
                <p class="text-slate-400 text-xs mb-3">ダメージカウンター</p>
                <div class="bg-slate-700 rounded-xl p-4 flex items-center gap-4">
                  <div class="w-16 h-24 bg-slate-500 rounded-lg"></div>
                  <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-3">
                      <button
                        class="w-8 h-8 rounded-full bg-slate-600 text-white text-lg font-bold flex items-center justify-center"
                        >−</button
                      >
                      <span class="text-white font-bold font-mono text-xl">130</span>
                      <button
                        class="w-8 h-8 rounded-full bg-indigo-500 text-white text-lg font-bold flex items-center justify-center"
                        >+</button
                      >
                    </div>
                    <p class="text-slate-400 text-xs">× 10ダメージ</p>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ========== Steps ========== -->
<section class="bg-white py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-16">
      始め方は、3ステップだけ。
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      <!-- Connector line (desktop only) -->
      <div
        class="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-indigo-100 z-0"
        style="left: 16.67%; right: 16.67%;"
      ></div>

      {#each steps as s}
        <div class="text-center relative z-10">
          <div
            class="w-16 h-16 rounded-full bg-indigo-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            {s.num}
          </div>
          <h3 class="font-bold text-gray-900 mb-3 text-lg">{s.title}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
        </div>
      {/each}
    </div>
    <div class="text-center mt-14">
      <a
        href="/app"
        class="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
      >
        今すぐデッキを読み込む
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- ========== Comparison ========== -->
<section class="bg-gray-50 py-24 px-6">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-3">
      デッキコード対応は、他にない。
    </h2>
    <p class="text-gray-500 text-center mb-14">
      構築を変えるたびに手入力し直す手間は、練習の集中を削ぐ。PtcgSimはその摩擦を取り除くことだけを考えて作った。
    </p>
    <div class="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-900 text-white">
            <th class="text-left px-6 py-4 font-semibold text-sm">機能</th>
            <th class="text-center px-6 py-4 font-semibold text-indigo-300 text-sm"
              >PtcgSim</th
            >
            <th class="text-center px-6 py-4 font-semibold text-gray-400 text-sm"
              >一般的なシミュレーター</th
            >
          </tr>
        </thead>
        <tbody>
          {#each comparison as row, i}
            <tr class="{i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-t border-gray-100">
              <td class="px-6 py-4 text-gray-700 text-sm">{row.feature}</td>
              <td class="px-6 py-4 text-center">
                <span class="text-green-500 text-lg font-bold">✓</span>
              </td>
              <td class="px-6 py-4 text-center">
                {#if row.other === false}
                  <span class="text-red-400 text-lg font-bold">✗</span>
                {:else if row.other === true}
                  <span class="text-green-500 text-lg font-bold">✓</span>
                {:else}
                  <span class="text-gray-400 text-xs">ツールによる</span>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- ========== Testimonials ========== -->
<section class="bg-white py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-14">
      使っているプレイヤーの声
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each testimonials as t}
        <div
          class="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between gap-4"
        >
          <p class="text-gray-700 leading-relaxed">「{t.quote}」</p>
          <div>
            <p class="font-bold text-gray-900 text-sm">{t.name}</p>
            <p class="text-gray-400 text-xs mt-0.5">{t.sub}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ========== FAQ ========== -->
<section class="bg-gray-50 py-24 px-6">
  <div class="max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-14">よくある質問</h2>
    <div class="space-y-3">
      {#each faqs as faq, i}
        <div class="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          <button
            class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
            on:click={() => toggleFaq(i)}
          >
            <span class="font-semibold text-gray-900">{faq.q}</span>
            <svg
              class="w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 {openFaq ===
              i
                ? 'rotate-180'
                : ''}"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {#if openFaq === i}
            <div class="px-6 pb-5 text-gray-500 leading-relaxed border-t border-gray-100">
              <p class="pt-4">{faq.a}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ========== Final CTA ========== -->
<section class="bg-slate-950 text-white py-24 px-6">
  <div class="max-w-3xl mx-auto text-center">
    <h2 class="text-4xl font-bold mb-5 leading-tight">
      本番で動きを迷わないために、<br />今日から手で覚える。
    </h2>
    <p class="text-slate-300 text-lg mb-10">
      デッキコードを用意して、今すぐ練習を始める。
    </p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="/app"
        class="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
      >
        デッキコードで練習を始める（無料）
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
    <p class="mt-5 text-sm text-slate-500">アカウント不要 · インストール不要 · 完全無料</p>
  </div>
</section>

<!-- ========== Footer ========== -->
<footer class="bg-slate-950 border-t border-slate-800 text-slate-500 py-8 px-6">
  <div class="max-w-5xl mx-auto text-center text-sm">
    <p>PtcgSim — ポケモンカード1人回しシミュレーター</p>
    <p class="mt-1 text-slate-600">
      このツールはポケモンカードゲームの非公式ファンサイトです。
    </p>
  </div>
</footer>
