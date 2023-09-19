const IMG_URL = "images/icon-16.png";
// 일단은 광고일듯한걸 찾는다.
const ads = document.querySelectorAll("[id^=ad_], [id^=adngin]");
if (ads) {
  for (let i = 0; i < ads.length; i++) {
    const node = ads[i];
    node.id = "asdf";
    node.innerHTML = "✨띠용✨";
    console.log(`${node} changed!`);
  }
}
