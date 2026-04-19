import * as math from 'mathjs';

/**
 * 두 수식이 동등한지 확인
 * 여러 테스트 포인트에서 값을 비교하여 동등성 판단
 */
export const compareExpressions = (expr1: string, expr2: string): boolean => {
    try {
        const f1 = math.compile(expr1);
        const f2 = math.compile(expr2);

        // 여러 테스트 포인트에서 비교
        const testPoints = [-5, -2, -1, 0, 1, 2, 5];
        const tolerance = 0.0001;

        for (const x of testPoints) {
            const val1 = f1.evaluate({ x });
            const val2 = f2.evaluate({ x });

            // 두 값이 모두 유효한 숫자인지 확인
            if (typeof val1 !== 'number' || typeof val2 !== 'number') {
                return false;
            }

            // NaN이나 무한대 처리
            if (!isFinite(val1) || !isFinite(val2)) {
                return false;
            }

            // 값 비교 (허용 오차 내)
            if (Math.abs(val1 - val2) > tolerance) {
                return false;
            }
        }

        return true;
    } catch (e) {
        return false;
    }
};

/**
 * LaTeX 수식을 JavaScript 수식으로 변환 후 비교
 */
export const compareLatexExpressions = (latex1: string, latex2: string): boolean => {
    const convertLatex = (latex: string): string => {
        const result = latex
            .replace(/\\frac{([^}]*)}{([^}]*)}/g, '($1)/($2)')
            .replace(/\\left|\\right/g, '')
            .replace(/{/g, '(').replace(/}/g, ')')
            .replace(/\\cdot|\\times/g, '*')
            .replace(/\^/g, '^') // 제곱 기호 유지 (mathjs는 ^ 사용)
            .replace(/\s/g, '') // 공백 제거
            .replace(/([0-9])([a-zA-Z])/g, '$1*$2')
            .replace(/([a-zA-Z])([0-9])/g, '$1*$2')
            .replace(/\\/g, '');
        console.log('convertLatex:', latex, '->', result);
        return result;
    };

    const expr1 = convertLatex(latex1);
    const expr2 = convertLatex(latex2);

    console.log('Comparing:', expr1, 'vs', expr2);

    return compareExpressions(expr1, expr2);
};
