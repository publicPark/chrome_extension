const ads = document.querySelectorAll("[id^=ad_]");
if (ads) {
  for (let i = 0; i < ads.length; i++) {
    const el = ads[i];
    console.log("el", el);
    el.remove();
    console.log("removed!");
  }
}
