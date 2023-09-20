const saveButton = document.querySelector("#save-btn");

// text
const storageCache = { text: "" };
const initStorageCache = chrome.storage.sync.get().then((items) => {
  // Copy the data retrieved from storage into storageCache.
  console.log("test: ", items);
  Object.assign(storageCache, items);
  input_text.value = storageCache.text;
});

const input_text = document.querySelector("#text");
saveButton.addEventListener("click", () => {
  const savedText = input_text.value;
  console.log("save", savedText);
  chrome.storage.sync.set({ text: savedText }).then(() => {
    console.log(`${savedText} is set`);
  });
  saveButton.style.display = "none";
});

input_text.addEventListener("input", () => {
  if (input_text.value === storageCache.text) {
    saveButton.style.display = "none";
  } else {
    saveButton.style.display = "block";
  }
});
