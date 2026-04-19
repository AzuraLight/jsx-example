export interface Quiz {
    id: string;
    title: string;
    description: string;
    answerExpression: string; // 정답 수식 (JavaScript 표기법)
    latexExpression?: string; // 정답 LaTeX 수식 (표시용)
    hint?: string;
    graphConfig?: {
        showFunction?: boolean; // 정답 함수 그래프 표시 여부
        showGrid?: boolean;
    };
}

export const quizzes: Quiz[] = [
    {
        id: 'linear-1',
        title: '기본 선형 함수',
        description: '기울기가 2이고 y절편이 4인 직선의 방정식을 입력하세요.',
        answerExpression: '2*x + 4',
        latexExpression: '2x + 4',
        hint: 'y = mx + b 형태를 생각해보세요.',
        graphConfig: {
            showFunction: false
        }
    },
    {
        id: 'quadratic-1',
        title: '이차 함수',
        description: '꼭짓점이 (2, 1)이고 위로 열리는 이차 함수를 입력하세요.',
        answerExpression: '0.5*x^2 - 2*x + 3',
        latexExpression: '0.5x^2 - 2x + 3',
        hint: 'y = a(x-h)² + k 형태를 생각해보세요.',
        graphConfig: {
            showFunction: false
        }
    },
    {
        id: 'sine-1',
        title: '삼각 함수',
        description: '진폭이 2이고 주기가 2π인 사인 함수를 입력하세요.',
        answerExpression: '2*sin(x)',
        latexExpression: '2\\sin(x)',
        hint: 'y = A*sin(Bx) 형태를 생각해보세요.',
        graphConfig: {
            showFunction: false
        }
    }
];
