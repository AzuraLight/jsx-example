<template>
    <div class="container">
        <div class="input-section">
            <math-field ref="mathFieldRef" @input="onMathInput"
                style="font-size: 1.5rem; padding: 10px; width: 100%; border: 2px solid #4A90E2;"></math-field>
        </div>
        <div id="box" class="jxgbox"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import 'mathlive';
import { compileLatexFunction } from '../utils/latex';
import { useGraphBoard } from '../composables/useGraphBoard';

defineOptions({
    name: 'InputBoard'
});

const mathFieldRef = ref<any>(null);
const { board, initBoard } = useGraphBoard('box', {
    boundingbox: [-10, 10, 10, -10],
    axis: true,
    showCopyright: false
});
let graphCurve: any = null;

const syncGraph = (latex: string) => {
    if (!board.value) return;

    try {
        const f = compileLatexFunction(latex);

        // 테스트
        console.log('Test f(0):', f(0));
        console.log('Test f(1):', f(1));

        if (graphCurve) {
            board.value.removeObject(graphCurve);
            console.log('Removed existing curve');
        }
        graphCurve = board.value.create('functiongraph', [f], {
            strokeWidth: 3,
            strokeColor: '#ff0099'
        });
        console.log('Created new curve:', graphCurve);
        board.value.update();
        console.log('Board updated');
    } catch (e) {
        console.error('Error in syncGraph:', e);
        // 사용자가 입력 중일 때(미완성 수식) 에러 무시
    }
};

const onMathInput = (e: any) => {
    console.log('Input value:', e.target.value);
    syncGraph(e.target.value);
};

onMounted(() => {
    initBoard();
    console.log('Board created:', board.value);
    console.log('MathField ref:', mathFieldRef.value);

    // 초기값이 있다면 그려주기
    if (mathFieldRef.value) {
        const initialValue = mathFieldRef.value.value || '2*x + 4';
        console.log('Initial value:', initialValue);
        syncGraph(initialValue);
    }
});
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}

.input-section {
    width: 100%;
    max-width: 600px;
}

.jxgbox {
    width: 100%;
    height: 500px;
    max-width: 600px;
    position: relative;
    aspect-ratio: 1 / 1;
    border: 1px solid #ddd;
    background-color: #ffffff;
}
</style>