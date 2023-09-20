const storageCache = { text: "" };
const initStorageCache = chrome.storage.sync.get().then((items) => {
  // Copy the data retrieved from storage into storageCache.
  console.log("test: ", items);
  Object.assign(storageCache, items);
  run();
});

const run = () => {
  // 일단은 찾는다.
  const ads = document.querySelectorAll("[id^=ad_], [id^=adngin], [id^=asdf]");
  if (ads) {
    const savedText = storageCache.text;
    for (let i = 0; i < ads.length; i++) {
      const node = ads[i];
      node.id = "asdf"; // id를 바꿔버린다.
      // node.style.background = "#333";
      node.innerHTML = savedText; // 자식들 다 없애고 replace.
      console.log(node, `changed! to ${savedText}`);
    }
  }
};

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
    storageCache[key] = newValue;
    console.log("storageCache", storageCache);
  }
  run();
});
