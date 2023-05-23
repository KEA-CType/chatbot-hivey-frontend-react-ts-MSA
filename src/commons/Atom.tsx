import {atom} from "recoil";
import {User, Space} from "./Interface";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

/**
 * 사용자
 */
export const userState = atom<User>({
    key: "user",
    default: {
        id: 0,
        name: ""
    },
    effects: [persistAtom]
});

/**
 * 스페이스
 */
export const spaceState = atom<Space>({
  key: "space",
  default: {
    id: 0,
    name: "",
    img: ""
  }
});

/**
 * 스페이스 멤버 식별 번호
 */
export const memberIdState = atom<number>({
    key: "memberId",
    default: 0,
});

/**
 * 설문 식별 번호
 */
export const formIdState = atom<number>({
    key: "formId",
    default: 0,
});
