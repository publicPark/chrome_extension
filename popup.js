// 익스텐션 팝업 화면 기능

const template = document.getElementById("li_template");
const saveSelectorButton = document.querySelector("#save-selector-btn");
const initSelectorButton = document.querySelector("#init-selector-btn");
const saveButton = document.querySelector("#save-btn");
const input_text = document.querySelector("#text");

// import { BAD_LIST_DEFAULT, GOOD_TEXT_DEFAULT } from "./scripts/_global.js";
// 아쉽게도 모듈화 불가. 코드가 좀 보기 불편하게 되겠습니다.

// store
const storageCache = {
  selectorList: BAD_LIST_DEFAULT,
  text: GOOD_TEXT_DEFAULT,
};

const initStorageCache = chrome.storage.sync.get().then((items) => {
  // console.log("initStorageCache: ", items);
  Object.assign(storageCache, items);

  // text
  input_text.value = storageCache.text;
  hideOrShowButton();

  // list
  const elements = new Set();
  for (const selector of storageCache.selectorList) {
    const element = template.content.firstElementChild.cloneNode(true);
    element.querySelector(".hate").value = selector;
    if (selector === "[id^=" + CHANGED_ID + "]") {
      element.querySelector(".hate").disabled = true;
    }
    elements.add(element);
  }
  document.querySelector("ul").append(...elements);
});

// 버튼
saveSelectorButton.addEventListener("click", () => {
  const list = document.getElementsByClassName("hate");
  const selectorList = [];
  for (const x of list) {
    selectorList.push(x.value);
  }
  chrome.storage.sync.set({ selectorList }).then(() => {
    storageCache.selectorList = selectorList;
  });
});
initSelectorButton.addEventListener("click", () => {
  const selectorList = BAD_LIST_DEFAULT;
  // list
  const elements = new Set();
  for (const selector of selectorList) {
    const element = template.content.firstElementChild.cloneNode(true);
    element.querySelector(".hate").value = selector;
    if (selector === CHANGED_ID_QUERY) {
      element.querySelector(".hate").disabled = true;
    }
    elements.add(element);
  }
  document.querySelector("ul").innerHTML = "";
  document.querySelector("ul").append(...elements);

  chrome.storage.sync.set({ selectorList }).then(() => {
    storageCache.selectorList = selectorList;
  });
});

// save 버튼 관련
const hideOrShowButton = () => {
  if (input_text.value === storageCache.text) {
    saveButton.style.display = "none";
  } else {
    saveButton.style.display = "block";
  }
};
saveButton.addEventListener("click", () => {
  const savedText = input_text.value;
  chrome.storage.sync.set({ text: savedText }).then(() => {
    testlog(`${savedText} is set`);
    storageCache.text = savedText;
    hideOrShowButton();
  });
});

input_text.addEventListener("input", () => {
  hideOrShowButton();
});
