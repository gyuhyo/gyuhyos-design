module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // React 17+의 JSX 변환 방식
        importSource: "@emotion/react", // Emotion을 JSX와 함께 사용
      },
    ],
  ],
  plugins: ["@emotion/babel-plugin"], // Emotion 전용 Babel 플러그인
};
