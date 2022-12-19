<template>
  <!-- <div>
    <div class="headers_black"></div>
    <Particles/>
  </div> -->
  <div class="app">
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
  </div>
</template>

<script lang="ts" setup>
import NavView from '@/layout/NavView.vue';
import HeaderView from './header.vue';

import { loadFull } from 'tsparticles';

const particlesInit = async (engine:any) => {
  await loadFull(engine);
};

const particlesLoaded = async (container:any) => {
  console.log('Particles container loaded', container);
};


  const options = {
    "particles": {
        "number": {
            "value": 60,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#DBDDDF"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#AFB1B2"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 4,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#AFB1B2",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2.5,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 100,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "Window",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
}

</script>

<style lang="scss" scoped>
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

@media screen and (min-width: 0px) and (max-width: 820px) {
  .el-aside {
    display: none;
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
