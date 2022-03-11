<template>
  <div>
    <div>
      <p>1.validBtn指令：按钮级别权限的控制</p>
      <button v-valid-btn="'viewBtn'">查看按钮</button>
      <br />
      <!-- 通过ajax获取的用户按钮权限数组里面没有editBtn,所以编辑按钮被移除 -->
      <button v-valid-btn="'editBtn'">编辑按钮</button>
    </div>

    <div>
      <p>2.waves指令：按钮的波纹动态效果</p>
      <button v-waves>点击有波纹效果的按钮</button>
    </div>

    <div>
      <p>3.copy指令：一键copy的功能</p>
      <button v-copy="'copyText'">点击一键复制</button>
    </div>

    <div>
      <p>4.focus指令：输入框自动聚焦</p>
      <input type="text" v-focus />
    </div>

    <div>
      <p>5.clickoutside指令：下拉菜单，点击下拉菜单以外的地方时隐藏下拉菜单</p>
      <div class="main" v-clickoutside="handleClose">
        <button @click="showDrop =!showDrop">点击显示下拉菜单</button>
        <div class="dropdown" v-show="showDrop">
          <p>我是下拉框的内容，点击外部区域可以关闭</p>
        </div>
      </div>
    </div>

    <div>
      <p>7.time指令：时间转换，比如朋友圈发布动态后的相对时间，比如刚刚、两分钟前等等</p>
      <div v-time="timeNow"></div>
    </div>

    <div>
      <p>8.checkNum指令：输入框的最小值和最大值限制</p>
      <label>数量:</label>
      <input :value="myNum" v-check-num="{key:'myNum',maxval:1000,minval:100}"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "directiveCom",
  data: () => {
    return {
      showDrop: false,
      myNum: "",
      timeNow: new Date().getTime()
    };
  },
  methods: {
    handleClose() {
      this.showDrop = false;
    }
  },
  directives: {
    //输入框的最小值和最大值限制
    checkNum: {
      //指令第一次绑定在元素上时调用，只调用一次
      bind: function(el, binding, vnode) {
        el._handler_ = function() {
          let value = el.value;
          if (!Number(value)) {
            el.value = "";
            return false;
          }
          value = Number(value);
          if (binding.value.maxval && value > binding.value.maxval) {
            el.value = binding.value.maxval;
          }
          if (binding.value.minval && value < binding.value.minval) {
            el.value = binding.value.minval;
          }
          vnode["context"][binding.value.key] = el.value;
        };
        el.addEventListener("change", el._handler_);
      },
      //被绑定的元素插入父节点时调用
      inserted: function() {},
      //被绑定的元素所在的模板发送更新时，比如style或者内容改变的时候调用
      update: function() {},
      //所在的模板完成一次更新后调用
      componentUpdated: function() {},
      //指令与元素解绑的时候调用
      unbind: function(el) {
        delete el._handler_;
      }
    },
    //按钮级别权限的控制
    validBtn: {
      inserted: function(el, binding) {
        function isValidBtn(value) {
          //此处模拟的是ajax获取的用户权限按钮
          const btnArr = ["viewBtn"];
          for (var item of btnArr) {
            if (item === value) {
              return true;
            }
          }
          //如果用户没有此按钮权限，则移除此按钮
          el.parentNode.removeChild(el);
          return false;
        }

        isValidBtn(binding.value);
      }
    },
    focus: {
      inserted: function(el) {
        el.focus();
      }
    },
    clickoutside: {
      bind: function(el, binding) {
        function documentHandler(e) {
          //如果点击的是当前的下拉框元素 则不做处理
          if (el.contains(e.target)) {
            return false;
          }
          //如果v-clickoutside后面有表达式 则执行后面的函数 此例子中执行handleClose函数
          if (binding.expression) {
            binding.value(e);
          }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  }
};
</script> 

<style>
button {
  margin-bottom: 10px;
}
</style>