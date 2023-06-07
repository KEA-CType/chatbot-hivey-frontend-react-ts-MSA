import {atom} from "recoil";
import {User, Space} from "./interfaces/commonInterface";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist();

/**
 * 사용자
 */
export const userState = atom<User>({
    key: "user",
    default: {
        id: 0,
        name: "",
        email: "",
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

/**
 * 설문 식별 번호
 */
export const selectedFormIdState = atom<number>({
    key: "selectedFormId",
    default: 0,
});

/**
 * 챗봇을 띄우는 것과 관련된 전역 변수
 *
 * <floatingType>
 * - 0: 챗봇을 아예 띄우지 않는 상태
 * - 1: 챗봇만 띄우는 상태
 * - 2: 챗봇과 스페이스 생성 버튼까지 같이 띄우는 상태
 */
export const floatingTypeWithChatbotState = atom<number>({
    key: "floatingType",
    default: 2,
});
