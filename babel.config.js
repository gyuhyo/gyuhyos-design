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
  plugins: [
    "@emotion/babel-plugin",
    [
      "@emotion",
      {
        // sourceMap is on by default but source maps are dead code eliminated in production
        sourceMap: true,
        autoLabel: "dev-only",
        labelFormat: "[local]",
      },
    ],
  ], // Emotion 전용 Babel 플러그인
};
