import axios from "axios";

export const getprice = async () => {
  try {
    let url =
      "https://api.nomics.com/v1/currencies/ticker?key=e5406b3591f78da1197f74ac8d4a210cb7300964&ids=BTC,ETH&interval=1m&convert=USD&per-page=2&page=1";
    const resp = await axios.get(url);
    // console.log(resp)
    return {
      error: false,
      data: { BTC: resp.data[0].price, ETH: resp.data[1].price },
    };
  } catch (error) {
     return { error: true };
  }
}