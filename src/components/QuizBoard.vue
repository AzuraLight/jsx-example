<template>
    <div class="quiz-container">
        <div class="quiz-selector">
            <h2>퀴즈 선택</h2>
            <select v-model="selectedQuizId" @change="onQuizChange">
                <option value="">퀴즈를 선택하세요</option>
                <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
                    {{ quiz.title }}
                </option>
            </select>
        </div>

        <div v-if="currentQuiz" class="quiz-content">
            <div class="quiz-info">
                <h3>{{ currentQuiz.title }}</h3>
                <p>{{ currentQuiz.description }}</p>
                <p v-if="currentQuiz.hint" class="hint">💡 힌트: {{ currentQuiz.hint }}</p>
            </div>

            <div class="input-section">
                <math-field ref="mathFieldRef" @input="onMathInput"
                    style="font-size: 1.5rem; padding: 10px; width: 100%; border: 2px solid #4A90E2;"></math-field>
            </div>

            <div class="result-section">
                <div v-if="answerResult !== null" :class="['result', answerResult ? 'correct' : 'incorrect']">
                    {{ answerResult ? '✅ 정답입니다!' : '❌ 틀렸습니다. 다시 시도해보세요.' }}
                </div>
            </div>

            <div id="box" class="jxgbox"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import 'mathlive';
import { compileLatexFunction } from '../utils/latex';
import { useGraphBoard } from '../composables/useGraphBoard';
import { quizzes } from '../data/quizzes';
import { compareLatexExpressions } from '../utils/mathCompare';

defineOptions({
    name: 'QuizBoard'
});

const mathFieldRef = ref<any>(null);
const selectedQuizId = ref<string>('');
const answerResult = ref<boolean | null>(null);

const { board, initBoard } = useGraphBoard('box', {
    boundingbox: [-10, 10, 10, -10],
    axis: true,
    showCopyright: false
});

let graphCurve: any = null;

const currentQuiz = computed(() => {
    return quizzes.find(q => q.id === selectedQuizId.value) || null;
});

const checkAnswer = (userExpression: string): boolean => {
    if (!currentQuiz.value) return false;

    console.log('User expression:', userExpression);
    console.log('Answer expression:', currentQuiz.value.answerExpression);

    const isCorrect = compareLatexExpressions(userExpression, currentQuiz.value.answerExpression);
    console.log('Is correct:', isCorrect);

    answerResult.value = isCorrect;
    return isCorrect;
};

const syncGraph = (latex: string) => {
    console.log('syncGraph called with:', latex);

    if (!board.value) {
        console.log('Board not ready');
        return;
    }

    try {
        const f = compileLatexFunction(latex);
        console.log('Function compiled successfully');

        // 정답 확인
        checkAnswer(latex);

        if (graphCurve) {
            board.value.removeObject(graphCurve);
        }
        graphCurve = board.value.create('functiongraph', [f], {
            strokeWidth: 3,
            strokeColor: '#ff0099'
        });
        board.value.update();
    } catch (e) {
        console.error('Error in syncGraph:', e);
        // 사용자가 입력 중일 때(미완성 수식) 에러 무시
    }
};

const onMathInput = (e: any) => {
    console.log('onMathInput event:', e);
    console.log('onMathInput value:', e.target.value);
    syncGraph(e.target.value);
};

const onQuizChange = async () => {
    answerResult.value = null;
    if (graphCurve && board.value) {
        board.value.removeObject(graphCurve);
        graphCurve = null;
    }
    if (mathFieldRef.value) {
        mathFieldRef.value.value = '';
    }

    // 퀴즈 선택 시 보드 초기화
    if (selectedQuizId.value && !board.value) {
        await nextTick();
        initBoard();
    }
};

onMounted(() => {
    // 퀴즈가 선택되면 onQuizChange에서 초기화
});
</script>

<style scoped>
.quiz-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.quiz-selector {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.quiz-selector select {
    padding: 10px;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 4px;
}

.quiz-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.quiz-info h3 {
    margin: 0 0 10px 0;
    color: #333;
}

.quiz-info p {
    margin: 5px 0;
    color: #666;
}

.hint {
    color: #ff6b6b;
    font-style: italic;
}

.input-section {
    width: 100%;
}

.result-section {
    min-height: 30px;
}

.result {
    padding: 10px;
    border-radius: 4px;
    font-weight: bold;
    text-align: center;
}

.result.correct {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.result.incorrect {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
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
