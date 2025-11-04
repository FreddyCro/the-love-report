function gaLandingSectionView(label: string) {
  sendGA({
    action: 'section_view',
    category: 'landing',
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
    gaLandingSectionView,
  };
};
