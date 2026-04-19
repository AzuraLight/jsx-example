import * as math from 'mathjs';

/**
 * LaTeX 수식을 JavaScript 수식으로 변환
 * 예: 2x -> 2*x, \frac{a}{b} -> (a)/(b), x^2 -> x^2 (mathjs는 ^ 사용)
 */
export const convertLatex = (latex: string): string => {
    return latex
        .replace(/\\frac{([^}]*)}{([^}]*)}/g, '($1)/($2)')
        .replace(/\\left|\\right/g, '')
        .replace(/{/g, '(').replace(/}/g, ')')
        .replace(/\\cdot|\\times/g, '*')
        .replace(/\^/g, '^') // 제곱 기호 유지 (mathjs는 ^ 사용)
        .replace(/\s/g, '') // 공백 제거
        .replace(/([0-9])([a-zA-Z])/g, '$1*$2') // 숫자 뒤에 문자 오면 곱셈 추가
        .replace(/([a-zA-Z])([0-9])/g, '$1*$2')
        .replace(/\\/g, '');
};

/**
 * LaTeX 수식을 평가 함수로 변환
 */
export const compileLatexFunction = (latex: string): ((x: number) => number) => {
    const cleanExpr = convertLatex(latex);
    console.log('compileLatexFunction:', latex, '->', cleanExpr);
    const node = math.parse(cleanExpr);
    const code = node.compile();

    return (x: number) => {
        const result = code.evaluate({ x });
        return typeof result === 'number' ? result : NaN;
    };
};
