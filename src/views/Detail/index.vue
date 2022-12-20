<template>
  <div>

    <v-md-preview :text="str"></v-md-preview>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

let str  = '# vue 单元测试  \n\n## 安装依赖\n```javascript\nnpm install --save-dev @vue/test-utils karma karma-chrome-launcher karma-mocha karma-sourcemap-loader karma-spec-reporter karma-webpack mocha\n```\n## 在package.json层创建karma.conf.js 内容如下\n\n\n\n```javascript\nvar webpackConfig =  require(&amp;amp;quot;@vue/cli-service/webpack.config.js&amp;amp;quot;)\nmodule.exports = function (config) {\n    config.set({\n        frameworks: [&amp;amp;quot;mocha&amp;amp;quot;],\n        files: [\n            &amp;amp;quot;tests/**/*.spec.js&amp;amp;quot;   //tests目录下，所有.spce.js结尾的测试文件\n        ],\n        preprocessors: {\n            &amp;amp;quot;**/*.spec.js&amp;amp;quot;: [&amp;amp;quot;webpack&amp;amp;quot;, &amp;amp;quot;sourcemap&amp;amp;quot;]\n        },\n        webpack: webpackConfig,\n        reporters: [&amp;amp;quot;spec&amp;amp;quot;],\n        browsers: [&amp;amp;quot;ChromeHeadless&amp;amp;quot;]\n    })\n}\n```\npackage.json内增加script命令\n\n```javascript\n&amp;amp;quot;test&amp;amp;quot;: &amp;amp;quot;karma start&amp;amp;quot;\n```\n\n## 引入断言模块chai应用\n\n\n```javascript\n//tests/unit 下创建 HellpWorld.spec.js\nimport Vue from &amp;amp;quot;vue&amp;amp;quot;\nimport { shallowMount } from &amp;amp;quot;@vue/test-utils&amp;amp;quot;;\nimport HelloWorld from &amp;amp;quot;@/components/HelloWorld.vue&amp;amp;quot;;\n\ndescribe(&amp;amp;quot;HelloWorld.vue&amp;amp;quot;, () =&amp;amp;gt; {\n  it(&amp;amp;quot;简单测试1 是否等于 true&amp;amp;quot;, () =&amp;amp;gt; {\n    expect(1).to.equal(true);\n  });\n});\n\n/******************其他用法*********************/\ndescribe(&amp;amp;quot;异步测试Callback&amp;amp;quot;, function () {\n  it(&amp;amp;quot;Done用例&amp;amp;quot;, function () {\n    \n  })\n})\n\ndescribe(&amp;amp;quot;异步测试Callback&amp;amp;quot;, function () {\n  it(&amp;amp;quot;Done用例&amp;amp;quot;, function (done) {\n    setTimeout(() =&amp;amp;gt; {\n      done()\n    }, 1000)\n  })\n})\n \n// promise\ndescribe(&amp;amp;quot;异步测试Promise&amp;amp;quot;, function () {\n  it(&amp;amp;quot;Promise用例&amp;amp;quot;, function () {\n    return new Promise((resolve, reject) =&amp;amp;gt; {\n      resolve(true)\n    })\n  })\n})\n \n// async\ndescribe(&amp;amp;quot;异步测试Async&amp;amp;quot;, function () {\n  it(&amp;amp;quot;Async用例&amp;amp;quot;, async function () {\n    return await Promise.resolve()\n  })\n})\n```\n\n&amp;amp;gt; 最后执行 npm run test\n&amp;amp;gt; 完结撒花❀❀❀'


</script>

<style lang="scss" scoped>

</style>