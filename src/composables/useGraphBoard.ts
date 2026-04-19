import { ref, onUnmounted } from 'vue';
// @ts-ignore: 타입 정의 에러 방지
import JXG from 'jsxgraph';

export interface GraphBoardOptions {
    boundingbox?: [number, number, number, number];
    axis?: boolean;
    showCopyright?: boolean;
    grid?: boolean;
}

export const useGraphBoard = (
    containerId: string,
    options: GraphBoardOptions = {}
) => {
    const {
        boundingbox = [-10, 10, 10, -10],
        axis = true,
        showCopyright = false,
        grid = false
    } = options;

    const board = ref<any>(null);

    const initBoard = () => {
        // 기존 보드가 있으면 정리
        if (board.value) {
            JXG.JSXGraph.freeBoard(board.value);
        }

        board.value = JXG.JSXGraph.initBoard(containerId, {
            boundingbox,
            axis,
            showCopyright,
            grid
        });
        return board.value;
    };

    onUnmounted(() => {
        if (board.value) {
            JXG.JSXGraph.freeBoard(board.value);
        }
    });

    return {
        board,
        initBoard
    };
};
