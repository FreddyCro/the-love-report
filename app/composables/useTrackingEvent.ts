// 元素可見度
// Label: keyvisual-upper ,keyvisual-lower ,overview ,story ,AI_CH1 ,AI_CH2 ,AI_CH3 ,AI_CH4 ,value ,trust ,busy ,3C ,unrealistic ,question ,editor
function gaSectionView(label: string) {
  sendGA({
    action: 'section_view',
    category: 'term',
    label,
  });
}

// 個案故事－錨點按鈕
// Label: 小莉 ,保羅 ,小B ,Michael ,彥哥 ,紋子
function gaClickAnchor(label: string) {
  sendGA({
    action: 'click_anchor',
    category: 'term',
    label,
  });
}

// 個案故事－展開按鈕: story_小莉打開 ,story_保羅打開 ,story_小B打開 ,story_Michael打開 ,story_彥哥打開 ,story_紋子打開
function gaClickSeries(label: string) {
  sendGA({
    action: 'click_series',
    category: 'term',
    label,
  });
}

// 個案故事－錨點切換按鈕: left_左側按鈕, right_右側按鈕
// 個案故事－關閉按鈕: story_小莉關閉 ,story_保羅關閉 ,story_小B關閉 ,story_Michael關閉 ,story_彥哥關閉 ,story_紋子關閉
// 常見問題－展開按鈕: question_Q1打開, question_Q2打開, question_Q3打開, question_Q4打開, question_Q5打開, question_Q6打開
// 常見問題－關閉按鈕: question_Q1關閉, question_Q2關閉, question_Q3關閉, question_Q4關閉, question_Q5關閉, question_Q6關閉
function gaClickBtn(label: string) {
  sendGA({
    action: 'click_btn',
    category: 'term',
    label,
  });
}

// ref: https://support.google.com/analytics/answer/11150547?hl=zh-Hant
// ref: https://developers.google.com/analytics/devguides/migration/measurement/events?hl=zh-tw#analytics.js-ua
// ref: https://dev.to/zapkub/stop-using-window-as-any-41i1
declare global {
  interface Window {
    ga: any;
    gtag: any;
  }
}

type GAEvent = {
  category: string;
  action: string;
  label: string;
};

function sendGA({ category, action, label }: GAEvent) {
  if (typeof window === 'undefined') {
    return console.error('GA not ready');
  }
  if (!category || !action || !label) {
    return console.error('GA event missing params');
  }

  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      [category]: label,
    });
  }

  if (window.ga) {
    window.ga('send', {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    });
  }
}

export default () => {
  return {
    sendGA,
    gaSectionView,
    gaClickAnchor,
    gaClickSeries,
    gaClickBtn,
  };
};
