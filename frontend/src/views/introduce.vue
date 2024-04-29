<template>
  <div>
    <navigator />
    <div class="intro-container">
      <div class="container-demo">
        <div class="xmtitle">网站简介</div>
        <div class="xmcontant">
          ChainShowU是一个基于区块链技术的数字毕业证书平台，每个SZTUer 的毕业生可以抽取一个专属自己的独一无二的数字毕业证书，每个数字毕业证书会存证到腾讯至信链，达到防篡改、可追溯、数据来源可信任的目的。
        </div>
      </div>
    </div>
    <div>
      <el-divider><i class="el-icon-mobile-phone" style="background-color: #fff;"></i></el-divider>
    </div>
    <!-- 团队成员 -->
    <div class="card-container">
      指导老师 : 姜婧妍 许凡
    </div>
    <div class="card-container">
      团队成员 : 庄洛明、韦东延、周裕博、丁帅、郭晶晶、官瑞阳、叶泳悦、李俊丽
    </div>
    <div class="card-container">
      <i class="el-icon-warning-outline"></i>
      如生成证书有错或空白，请
      <button class="btn btn-primary btn-sm" @click="showMyself">联系我们</button>
    </div>
    <div class="selephoto" v-show="myself">
      <div style="height: 80vh;display: flex;justify-content: center;align-items: center;">
        <img src="../assets/微信二维码.jpg" alt="">
      </div>
      <button class="btn btn-primary" @click="showMyself" style="margin-top: 1rem;">关闭</button>
    </div>
  </div>
</template>
  
<script>
import { } from "vue";
import navigator from "@/components/navigator.vue";

export default {
  name: "introduce",
  data() {
    return {
      myself: false
    };
  },
  components: { navigator },
  methods: {
    showMyself() {
      this.myself = !this.myself
    }
  },
  mounted() {
  }
};
</script>
  
<style scoped>
/* 内容区 */
.main {
  background-color: white;
  display: flex;
  height: 80vh;
  width: 60vw;
  margin: 4vh auto;
}

.intro-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container-demo {
  /* 盒子居中 */
  margin: 1% auto;
  width: 50%;
  height: 100%;
  background: #1c36c7df;
  border-radius: 20px;
  /* 盒子阴影 */
  box-shadow: 0 0 10px grey;
}

.xmtitle {
  text-align: center;
  font-size: 30px;
  color: rgb(255, 255, 255);
  margin-top: 1%;
  padding-top: 1%;
  text-shadow: 0 0 10px #000000;
}

.xmcontant {
  /* 设置左右边距 */
  margin: 2% 5% 2%;
  text-align: center;
  font-size: 20px;
  color: rgb(255, 255, 255);
  /* 设置字体 */
  font-family: "微软雅黑";
}

.card-container {
  /* 居中 */
  background: whitesmoke;
  width: 50%;
  margin: 1% auto;
  padding: 20px;
  border-radius: 10px;
  /* box-shadow: 0px 0px 5px grey; */
}

.selephoto {
  /* display: none; */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

img {
  max-width: 90%;
  max-height: 100%;
}

@media(max-width:768px) {
  .x {
    display: none;
  }

  .container-demo {
    /* 居中 */
    margin: 0 auto;
  }

  .container-demo {
    margin-top: 5%;
    width: 90%;
  }

  .card-container {
    /* 居中 */
    background: whitesmoke;
    width: 90%;
    margin: 1% auto;
    padding: 20px;
  }
}
</style>