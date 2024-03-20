// 웹 페이지를 바꿔주는 곳

const storageCache = {
  selectorList: BAD_LIST_DEFAULT,
  text: GOOD_TEXT_DEFAULT,
  isOff: false,
};
const initStorageCache = chrome.storage.sync.get().then((items) => {
  // Copy the data retrieved from storage into storageCache.
  // console.log("test: ", items);
  Object.assign(storageCache, items);
  setInterval(() => run(), 1000); // 실시간으로 자꾸 뜨는 아이들이 있음
});

// 싫어하는 것 찾아서 원하는 걸로 바꿔주기
const run = () => {
  if (storageCache.isOff) {
    return;
  }
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
  let count = 0;
  if (ads) {
    const savedText = storageCache.text;
    for (let i = 0; i < ads.length; i++) {
      const node = ads[i];
      if (node.id === CHANGED_ID) return;
      count++;
      node.id = CHANGED_ID; // id를 바꿔버린다.
      node.style.whiteSpace = "pre-line";
      // node.style.backgroundColor = MAIN_COLOR; // 아 눈부셔 미쳐
      // node.style.color = BG_COLOR;
      node.innerHTML = savedText; // 자식들 다 없애고 replace.
    }
  }
  testlog(`${count} running!`);
};

chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    testlog(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
    storageCache[key] = newValue;
    // testlog("storageCache", storageCache);
    if (key === "isOff" && newValue === true) {
      location.reload(); // 새로고침
    }
  }
});
