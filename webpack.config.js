const JavaScriptObfuscator = require("webpack-obfuscator");

module.exports = {
  // 기존 설정 유지
  mode: "production", // 난독화는 보통 프로덕션 빌드에서만 수행
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true, // 변수 이름 축약
          compress: true, // 불필요한 코드 제거
        },
      }),
    ],
  },
  plugins: [
    // 기존 플러그인들...
    new JavaScriptObfuscator(
      {
        rotateStringArray: true,
        stringArray: true,
        stringArrayThreshold: 0.75,
      },
      ["excluded_file_name.js"] // 제외할 파일
    ),
  ],
};
