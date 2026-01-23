export const CANDLE = {
  title: 'הדליקו נר לזכרו של בן',
  subtitle: 'לחצו על הנר כדי להדליק',
  thanksTitle: 'תודה שהדלקת נר לזכרו של בן',
  thanksText: 'זכרו ימשיך להאיר בליבנו לעד',
  counterText: 'נרות הודלקו עד כה',

  // timing (ms)
  thanksDelay: 1000,
  thanksVisibleMs: 3500,
  thanksFadeMs: 500,

  // keys/paths
  localStorageKey: 'candle_last_lit',
  firebaseCounterPath: 'counters/candles',
};
