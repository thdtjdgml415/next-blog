import ReactGA from "react-ga4";

const initializeGA = () => {
  // 여러분의 Measurement ID로 교체해주세요
  // 가능하다면 환경 변수에서 가져와야 합니다
  ReactGA.initialize(`${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`);
  // 작업이 끝난 후에는 console.log() 문을 제거하는 것을 잊지 마세요
  console.log("GA가 초기화되었습니다");
};

const trackGAEvent = (category: any, action: any, label: any) => {
  console.log("GA 이벤트:", category, ":", action, ":", label);
  // GA4 이벤트 발송
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export default initializeGA;
export { initializeGA, trackGAEvent };
