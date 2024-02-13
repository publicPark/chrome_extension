const storageCache = {
  selectorList: BAD_LIST_DEFAULT,
  text: GOOD_TEXT_DEFAULT,
};
const initStorageCache = chrome.storage.sync.get().then((items) => {
  // Copy the data retrieved from storage into storageCache.
  console.log("test: ", items);
  Object.assign(storageCache, items);
  run();

  setInterval(() => run(), 1000);
});

const run = () => {
  let selectorString = "";
  for (const [i, selector] of storageCache.selectorList.entries()) {
    if (i === storageCache.selectorList.length - 1) {
      selectorString += selector;
    } else {
      selectorString += `${selector}, `;
    }
  }
  // console.log(`selectorString! ${selectorString}`);
  // 일단은 찾는다.
  const ads = document.querySelectorAll(selectorString);
  if (ads) {
    const savedText = storageCache.text;
    for (let i = 0; i < ads.length; i++) {
      const node = ads[i];
      node.id = "asdf_changed"; // id를 바꿔버린다.
      node.style.whiteSpace = "pre-line";
      node.innerHTML = savedText; // 자식들 다 없애고 replace.
      // console.log(node, `changed! to ${savedText}`);
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
