import type { Directive } from 'vue';
/**
 * img标签出现在可视区时才加载图片
 */
const lazy: Directive<HTMLImageElement, string> = {
  mounted(el) {
    // el 接收到参数 就是 标签的属性 可以拿到src
    const imgSrc = el.src;
    el.src =  'http://cdn.xlong.tech/loading.gif';
    // 观察图片是否被加载 observer 观察者模式
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      console.log(observer,'observerobserver')
      if (isIntersecting) {
        el.src = imgSrc;
        // 当图片加载之后关闭观察
        observer.unobserve(el);
      }
    });
    observer.observe(el);
  },
};

export default lazy;
