<template>
  <!-- <div>
    <div class="headers_black"></div>
    <Particles/>
  </div> -->

  <div class="app">
    <div class="headers">
      <div class="header_title"><div>XLong的博客</div></div>
      <div class="icon_box" @click="bannerFlag = !bannerFlag">
        <i style="color: #fff" class="iconfont icon-xuanxiang-copy"></i>
      </div>
      <div class="footer_text"><div>追风赶路莫停留,平芜尽处是春山。</div></div>
    </div>
    <transition name="slide-fade">
      <div class="cart_list" v-if="bannerFlag">
        <div class="menu">
          <ul>
            <li
              :class="{ active: item.active == route.name }"
              v-for="(item, index) in routerList"
              :key="index"
            >
              <a :href="'#' + item.active">
                <i class="post-meta-item-icon" :class="item.icon"></i
                >{{ item.name }} {{ item.active }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- <Particles></Particles> -->
    <div class="bkpro-login-canvas">
      <Particles
        id="tsparticles"
        class="login-particles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="options"
      />
    </div>

    <div class="content-wrap common-layout">
      <el-container class="contai">
        <el-container>
          <el-aside>
            <HeaderView class="hidden-md-and-down"></HeaderView>
            <NavView />
          </el-aside>
          <el-container>
            <el-main>
              <router-view />
            </el-main>
            <el-footer>
              <!-- <p>
          © 2019 — 2021
          <el-divider direction="vertical"></el-divider>
          <i class="fa fa-user"></i>
          记昨日书
        </p>
        <p>
          <span class="SiteRunningTime">本站已运行了： {{ 2123 }}</span>
        </p>
        <p>
          ❤️感谢
            <span id="busuanzi_container_site_pv">
              <span id="busuanzi_value_site_pv"></span>
            </span>
            小伙伴的
            <span id="busuanzi_container_site_uv">
              <span id="busuanzi_value_site_uv"></span>
            </span>
            次光临！❤️
          <el-divider direction="vertical"></el-divider>
          <a href="https://beian.miit.gov.cn" target="_blank"
            >京ICP备2021014015号-1</a
          >
        </p> -->
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
    <!-- <div class="rights"><live2d></live2d></div> -->
  </div>
</template>

<script lang="ts" setup>
import NavView from '@/layout/NavView.vue';
import HeaderView from './header.vue';
// import live2d from 'vue-live2d';

import { loadFull } from 'tsparticles';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();

const particlesInit = async (engine: any) => {
  await loadFull(engine);
};

const particlesLoaded = async (container: any) => {
  console.log('Particles container loaded', container);
};

const options = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#DBDDDF',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#AFB1B2',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 4,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#AFB1B2',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2.5,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 100,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'Window',
    events: {
      onhover: {
        enable: true,
        mode: 'grab',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

interface NavList {
  name: string;
  icon: string;
  active?: string;
}

let routerList: NavList[] = [
  { name: '首页', icon: 'iconfont icon-shouye', active: 'Home' },
  {
    name: '关于',
    icon: 'iconfont  icon-jurassic_user',
    active: 'About',
  },

  { name: '标签', icon: 'iconfont icon-24gf-tags3', active: 'Tags' },
  { name: '分类', icon: 'iconfont icon-yingyongzhongxin', active: 'Th' },
  {
    name: '归档',
    icon: 'iconfont  icon-tidangan',
    active: 'Archive',
  },
  {
    name: '绘画留言板',
    icon: 'menu-item-icon fa fa-fw fa-dashboard',
    active: 'MessageBoard',
  },
  {
    name: '相册',
    icon: 'iconfont icon-xiangce',
    active: 'xc',
  },
];

let bannerFlag = ref(false);
</script>

<style lang="scss" scoped>
.rights {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2;
}
.site-brand-wrapper {
  height: 112px;
  background: #222;
  color: white;
  padding: 20px 0;
  box-sizing: border-box;
}

.site-title {
  display: inline-block;
  vertical-align: top;
  line-height: 36px;
  font-size: 20px;
  font-weight: normal;
  color: white;
}

.site-brand-wrapper p {
  font-size: 13px;
  color: #ddd;
  margin: 10px 10px 0 10px;
}

.sidebar {
  position: sticky;
  top: 0;
}

.menu {
  padding: 20px 0;
  margin-bottom: 20px;
}

.menu li {
  line-height: 2;
  text-align: left;
}

.menu li:hover,
.menu li.active {
  background: #f9f9f9;
}

.menu li a {
  display: block;
  font-size: 13px;
  position: relative;
  box-sizing: border-box;
  padding: 5px 20px;
  text-align: left;
  line-height: inherit;
  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  color: #555555;
  text-decoration: none;
}

.menu li.active a:after {
  content: ' ';
  position: absolute;
  top: 50%;
  margin-top: -3px;
  right: 15px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #bbb;
}

.sidebar-inner {
  background: #fff;
  padding: 20px 10px;
}

.slide-fade-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.login {
  height: 100%;
  width: 100%;
  position: fixed;
}

.headers_black {
  position: fixed;
  top: 0;
  height: 3px;
  background: #222;
  position: fixed;
  width: 100%;
  z-index: 2;
}

.content-wrap {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.el-footer {
  margin-top: 30px;
  text-align: center;
}

.el-main {
  padding: 0;
  overflow: hidden;
  min-height: auto;
}

// @media screen and (min-width: 0px) and (max-width: 820px){
//   .headers{
//     display: block;
//     height: 80px;
//    width: 100%;
//    background-color:red;
//   }
// }
.headers {
  height: 120px;
  width: 100%;
  background: #222;
  display: none;
  box-sizing: border-box;
  .header_title {
    width: 100%;
    color: #fff;
    font-size: 20px;
    display: flex;
    justify-content: center;
    padding-top: 15px;
  }
  .icon_box {
    padding-bottom: 10px;
    position: absolute;
    top: 31px;
    left: 10px;
  }
  .footer_text {
    font-size: 14px;
    color: #ddd;
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
}
.cart_list {
  position: relative;
  z-index: 33;
  display: none;
}

@media screen and (min-width: 0px) and (max-width: 820px) {
  .el-aside {
    display: none;
  }
  .headers {
    display: block;
    height: 80px;
    width: 100%;
    background: #222;
    box-sizing: border-box;
    position: relative;
    z-index: 33;
  }
  .cart_list {
    display: block;
  }
}
.el-aside {
  overflow: hidden;
}

.el-footer {
  height: auto !important;
  padding-bottom: 20px;
}
</style>
