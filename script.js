// ===== おみくじ候補データ =====
const fortunes = [
    {
      title: "重ね合わせ大吉",
      tag: "SUPERPOSITION",
      message: "いくつもの可能性が同時に存在中。やりたいことを絞らず、まずは手をつけてみて。",
      detail:
        "量子の世界では、観測するまで状態が『重ね合わせ』になっていて、いろんな可能性が同時にありえます。あなたの未来も、まだ決まりきっていない重ね合わせ状態。今はたくさんの選択肢を残しておくのが吉。"
    },
    {
      title: "観測次第吉",
      tag: "MEASUREMENT",
      message: "行動した瞬間に運勢が決まります。気になることは『とりあえずやってみる』が吉。",
      detail:
        "量子は『観測』された瞬間に状態が決まると言われています。見ているだけではなにも変わりません。今日のあなたの運勢も、実際に動き出した瞬間から変化していきます。"
    },
    {
      title: "エンタングル大吉",
      tag: "ENTANGLEMENT",
      message: "あなたの行動が、思わぬところで誰かを動かします。チーム活動やコラボに積極的になると運気UP。",
      detail:
        "エンタングルメント（量子もつれ）は、離れた粒子同士が不思議な相関を持つ現象です。人間関係も、見えないところでつながっているもの。誰かへのちょっとした一言や行動が、別の場所で大きな変化を生むかもしれません。"
    },
    {
      title: "トンネル効果小吉",
      tag: "TUNNELING",
      message: "『無理そう』に見える壁も、意外とすり抜けられるかも。いつもと違うやり方を1つ試してみて。",
      detail:
        "量子の世界では、本来こえられないはずの壁をすり抜ける『トンネル効果』が起こります。現実でも、真正面からぶつかるだけが正解じゃないことも。視点を変えたり、ルートを変えたりしてみると道が開けるかもしれません。"
    },
    {
      title: "デコヒーレンス注意",
      tag: "DECOHERENCE",
      message: "頭の中がごちゃごちゃしがち。情報を一度ノートに書き出して整理すると◎",
      detail:
        "デコヒーレンスは、まわりの影響で量子の状態が保てなくなり、『普通の世界』っぽくなってしまう現象です。情報や予定に振り回されすぎると、自分の本心が見えにくくなります。今日は一度ノイズを減らして、落ち着いて整理してみましょう。"
    },
    {
      title: "ゼロポイント安定",
      tag: "ZERO-POINT",
      message: "特別大きなラッキーはないかも。でも、足元はかなり安定。今日は『準備』と『インプット』の日。",
      detail:
        "絶対零度でも、量子は完全には止まりません。それを『ゼロポイントエネルギー』と呼びます。一見動きがないように見えても、内側では次の変化のタネが育っています。あせらず、静かな前進を大事にしてみてください。"
    }
  ];
  
  // ===== DOM取得 =====
  const statusEl = document.getElementById("status");
  const quantumLoadingEl = document.getElementById("quantumLoading");
  const resultEl = document.getElementById("result");
  const resultTagEl = document.getElementById("resultTag");
  const resultTitleEl = document.getElementById("resultTitle");
  const resultMessageEl = document.getElementById("resultMessage");
  const resultDetailEl = document.getElementById("resultDetail");
  const ticketEls = document.querySelectorAll(".omikuji-card");
  const startButton = document.getElementById("startButton");
  
  // ローディング中かどうかのフラグ
  let isLoading = false;
  
  // ===== ステップ2：スタートボタン押下 → 札選択モードへ =====
  if (startButton) {
    startButton.addEventListener("click", () => {
      // 札選択モードに切り替え
      document.body.classList.add("mode-pick");
      statusEl.textContent = "気になる恋みくじをひとつ選んでください。";
  
      // もし以前の結果が出ていたら見え方をリセット
      resultEl.style.display = "none";
    });
  }
  
  // ===== ステップ3→4：札クリック → ロード → 結果 =====
  function drawFortune(clickedTicket) {
    if (isLoading) return;
    isLoading = true;
  
    // 札の選択状態を更新
    ticketEls.forEach((t) => {
      t.classList.remove("active");
      t.classList.add("disabled");
    });
    clickedTicket.classList.add("active");
  
    // ステータス & ロードアニメON
    statusEl.textContent = "選んだ恋みくじの量子状態を観測中…";
    quantumLoadingEl.style.display = "flex";
    resultEl.style.display = "none";
  
    // ちょっと待ってから結果を“観測”
    setTimeout(() => {
      quantumLoadingEl.style.display = "none";
  
      const index = Math.floor(Math.random() * fortunes.length);
      const f = fortunes[index];
  
      // アニメをリセット
      resultEl.classList.remove("pop-in");
  
      resultTagEl.textContent = f.tag;
      resultTitleEl.textContent = f.title;
      resultMessageEl.textContent = f.message;
      resultDetailEl.textContent = f.detail;
  
      resultEl.style.display = "block";
      resultEl.classList.add("pop-in"); // “パッ”と出る
  
      statusEl.textContent = "観測が完了しました。";
  
      // 結果画面モードに切り替え（タイトル側の見え方が変わる）
      document.body.classList.add("mode-result");
  
      // ローディング終了、札再びクリック可能に
      ticketEls.forEach((t) => t.classList.remove("disabled"));
      isLoading = false;
    }, 800); // 0.8秒くらい“量子ぴょこぴょこ”させる
  }
  
  // ===== 札クリックのイベント登録 =====
  ticketEls.forEach((ticket) => {
    ticket.addEventListener("click", () => {
      // スタートボタンを押していない場合は無視（安全のため）
      if (!document.body.classList.contains("mode-pick") && !document.body.classList.contains("mode-result")) {
        return;
      }
      drawFortune(ticket);
    });
  });
  
