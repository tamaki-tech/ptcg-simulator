<script lang="ts">
  import Coin from "$lib/images/coin.png";
  import CoinUra from "$lib/images/coin_ura.png";
  import { addToast } from "../../../toast";

  let reverse = false;
  let interval = 200; // 開始間隔（ミリ秒）
  let increase = 1; // どれだけ間隔を増やすか（ミリ秒）

  const toggleCoin = () => {
    reverse = Math.random() >= 0.5;

    if (interval < 50) {
      setTimeout(toggleCoin, interval);
      interval += increase;
    } else {
      addToast(`コイントスの結果は${reverse ? "裏" : "表"}です`);
      interval = 10;
    }
  };
</script>

<button on:click={toggleCoin}>
  <img src={reverse ? CoinUra : Coin} alt="coin_ura" />
</button>
