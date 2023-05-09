import { useRef } from 'react';

//hook
function useMoveScroll() {
  const element = useRef(null);
  const onMoveToElement = () => {
    element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // behavior : 애니매이션을 사용할지 말지 선택함
    // block : 클릭할시 어디에 사용자 스크롤을 위치시킬 건지 정함.
    // "start", "center", "end", "nearest"중 하나 선택. 기본값은 "start".
  };
  return { element, onMoveToElement };
}

export default useMoveScroll;
