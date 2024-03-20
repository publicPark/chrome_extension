const CHANGED_ID = "asdf_changed"; // asdf 몰라 대충 지어 ㅋㅋㅋ
const CHANGED_ID_QUERY = `[id^=${CHANGED_ID}]`;
const BAD_LIST_DEFAULT = [
  `[id*=ad_], [id^=adngin], [id*='google_ads_'], [class^=ads]`,
  CHANGED_ID_QUERY,
]; // 배열은 나중에 ㅋㅋㅋ 삭제하고 추가하는 기능을 만들어야해서
const GOOD_TEXT_DEFAULT = "🐢 지금 거북목이신가요 스트레칭 하세요! 🐢";

const MAIN_COLOR = "#ff0092";
const BG_COLOR = "#ffffff";

const isOn = true;

function testlog(text, ...args) {
  console.log(
    `%c지윤:%c${text}
`,
    `color: ${MAIN_COLOR}; background-color: ${BG_COLOR};`,
    `color: ${BG_COLOR}; background-color: ${MAIN_COLOR};`,
    ...args
  );
}
