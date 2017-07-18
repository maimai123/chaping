<template>
  <div class="comments-page">
    <mt-header fixed title="">
      <mt-button icon="back" @click="goback" slot="left"></mt-button>
    </mt-header>
    <div class="content-box">
        <div class="article">
          <div class="text">
            <div class="title">{{obj.title}}</div>
            <img :src="obj.img" class="imgUrl" alt="pic"/>
          </div>
          <div class="author">
            <img :src="obj.authorImg" alt="pic"> <span> {{ obj.author }} </span>
             <span class="time"> {{obj.time}}发布</span>
             <div class="refresh">{{obj.num}}条评论<i class="iconfont icon-table-refresh"></i></div>
          </div>
        </div>
        <div class="comments">
          <div v-if="comments.length == 0" class="empty" @click="changeVisible">暂无评论，我来发表第一篇评论!</div>
          <div class="comment" v-else v-for="(item,index) in comments" :key="index" >
            <div class="auth">
              <img class="authorImg" :src="item.img" alt="author"/>
              <span class="authorTitle"> {{item.author}} </span>
              <span> {{item.time}} </span>
            </div>
            <div class="comm"  @click="changeCommenter(item.author,index)">{{item.comments}}</div>
              <div v-if="item.reply.length>0" class="pdl10">
                <div class="reply" v-for="(reply,ii) in item.reply">
                  <div class="auth">
                    <img class="authorImg" :src="reply.img" alt="author"/>
                    <span class="authorTitle">  {{ reply.responder}} 回复 {{reply.reviewers}}</span>
                    <span> {{reply.time}} </span>
                  </div>
                  <div class="comm" @click="changeCommenter(reply.responder,index)">{{reply.comments}}</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="addComment" @click="changeVisible(true)">
        <div class="commentbtn"><i class="iconfont icon-pinglun3"></i> <span>来一发</span></div>
      </div>
      <transition name="slide-fade" >
        <div class="popup" v-show="showComment">
          <div class="pop-head">
            <div class="close"  @click="changeVisible"><i class="iconfont icon-close"></i></div>
            <span>添加评论</span>
          </div>
          <textarea maxlength="200" class="input-content" @input="changeNum" placeholder="说点什么？？" v-model="content"></textarea>
          <div class="leftNum">你还可以输入<span :class="left == 0 ? 'red' : ''">{{left}}</span>个字</div>
          <div class="btn-submit" @click="submitComment">发 送</div>
        </div>
      </transition >
  </div>
</template>
<script>
import { Header,Toast } from 'mint-ui';
import axios from 'axios';
export default {
  name: 'comments',
  data () {
    return {
      obj:{},
      comments:[],
      showComment:false,
      content:'', //评论内容
      left:200,
      mine:'麦麦',
      oldComment:null,
      type: 0,                //0为评论作者1为评论别人的评论
      chosedIndex: -1,        //被选中的评论的index
      commenter: "麦麦",   //评论人
      commenterImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg'
    }
  },
  components:{
  },
  methods:{
    getData(){ //获取数据
      let id = this.$route.query.id;
      let data={
        id:9,
        title:'新北市立鶯歌陶瓷博物馆推出的"壁咚" 椒 盐罐 ​(@一个阿呆仔) ',
        img:'http://img2.chouti.com/CHOUTI_14E004D62DD6445AA92F445D6768BC0B_W700H756=C60x60.jpg',
        like:6,
        comments:11,
        num:1,
        author:'一个阿呆仔',
        authorImg:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
        time:'7分钟前'
      };
      this.obj = data;
      let comments = [
        {
          img:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
          author:'一个阿呆仔',
          time:'2分钟前',
          comments:'铠甲勇士~',
          reply:[
            {
              img:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              responder:'ss个阿呆仔',
              reviewers:'一个阿呆仔',
              time:'1分钟前',
              comments:'哈哈！',
            },
            {
              img:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
              responder:'er个阿呆仔',
              reviewers:'ss个阿呆仔',
              time:'1分钟前',
              comments:'哈哈！',
            },
          ]
        },
        {
          img:'http://img2.chouti.com/CHOUTI_6A62E3B96168484A92CAEB9465CAD598_W180H180=15x15.jpg',
          author:'xiaoyang',
          time:'2分钟前',
          comments:'愚蠢的人类~',
          reply:[]
        }
      ];
      this.comments = comments;
      // axios.post('/getArticle', {
      //   id: id
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    },
    goback(){ //返回
      this.$router.go(-1);
    },
    changeVisible(isexit){ //评论面板
      this.showComment = !this.showComment;
      this.content = '';
      if(isexit){
        this.type = 0;
      }else{
        this.type = 1;
      }
    },
    changeCommenter(responder,index){ //回复
			this.chosedIndex = index;
			this.type = 1;
      this.changeVisible();
      console.log(this.chosedIndex+","+this.type)
      this.oldComment = responder;
    },
    submitComment(){ //提交评论
      let self = this;
      //格式化时间
      function getTime() {
      	var now = new Date();
      	var year = now.getFullYear();
      	var month = now.getMonth()+1;
      	var day = now.getDate();
      	month.length < 2 ?  "0" + month : month;
      	day.length < 2 ?  "0" + day : day;
      	return year+"-"+month+"-"+day;
      }
      if(this.content.length == 0){
        Toast({
          message: '还没写东西呢！兄弟',
          position: 'bottom',
          duration: 1000
        });
      }else{
        if(this.type == 0) { //评论作者
  				self.comments.push({
  					author: self.commenter,
  					img: self.commenterImg,
            time:getTime(),
  					comments: self.content,
  					reply: []
  				});
  			}else if(this.type == 1 ){
  				this.comments[this.chosedIndex].reply.push({
  					img: self.commenterImg,
            time:getTime(),
  					comments: self.content,
            responder: self.commenter,
            reviewers:self.oldComment,
  				});
  				this.type = 0;
  			}
        this.changeVisible();
        // axios.post('/getArticle', {
        //   id: id
        // })
        // .then(function (response) {
        //   console.log(response);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
      }
    },
    changeNum(){ //检查剩余字数
      let len = this.content.length;
      if(200 - len >= 0){
        this.left = 200 - len;
      }else{
        this.left = 0;
      }
    }
  },
  created(){
    this.getData();
  },
  mounted(){
  }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_5k8r2kzat8s62yb9.css';
/*展示动画*/
.slide-fade-enter-active {
  transition: all .3s linear;
}
.slide-fade-leave-active {
  transition: all .3s linear;
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateY(100vh);
  opacity: 0;
}
.pdl10{
  padding-left: .8rem;
}
.empty{
  text-align: center;
  padding: .5rem;
  font-size: 16px;
}
.red{
  color:red;
}
.leftNum{
  text-align: right;
  padding-right: .2rem;
  color:#a09898;
}
.refresh{
  position: absolute;
  right:.2rem;
}
.comments{
  border-top:1px solid #6b6b6b;
  .comment{
    padding: .2rem 0;
    border-bottom: 1px solid #363232;
    box-shadow: 0px .5px 0px 0px #565656;
  }
  .comm{
    padding-left: .8rem;
    font-size: .45rem;
  }
}
.author,.auth{
  margin:0;
  display: flex;
  align-items:center;
  margin:.2rem 0 .2rem 0 ;
  img{
    width:.5rem;
    height: .5rem;
    border-radius: 50%;
    margin-right: .2rem;
  }
  span{
    padding: 0 .1rem;
    font-size: .3rem;
    color:#f2f2f2;
  }
}
.auth span{
  color:#aaa;
}
.article,.comments{
  width:94%;
  margin:.1rem 3%;
}
.text{
  .title{
    width: 77%;
    float: left;
    font-size: .45rem;
    word-break: break-all;
  }
  .imgUrl{
    width: 20%;
    float: right;
  }
}
.text:after{
  content:'';
  display: block;
  clear: both;
}
.comments-page{
  width:100%;
  height:100vh;
  color:#f2f2f2;
}
.mint-header{
  background-color:#1a1f29;
  height: 1rem;
}
.content-box{
  padding: 1rem 0;
}
.addComment{
  position:fixed;
  bottom:0;
  width:100%;
  z-index:999;
}
.commentbtn{
  width:98%;
  height: .8rem;
  margin:.1rem 1%;
  border: 1px solid #cfcfcf;
  background-color: #cfcfcf;
  text-align: center;
  line-height: .8rem;
  color: #1a1f29;
}
.popup{
  width:100vw;
  height:100vh;
  background-color:#f2f2f2;
  position:fixed;
  top:0;
  z-index:999;
  .pop-head{
    position:relative;
    top:0;
    height:1rem;
    line-height: 1rem;
    background-color: #dbdbdb;
    text-align: center;
    span{
      font-size: 16px;
      color:#8c8c8c;
    }
  }
  .close{
    position:absolute;
    left:.3rem;
    color:#8c8c8c;
    i{
      font-size:20px;
    }
  }
  textarea{
    width:100%;
    border:none;
    height:200px;
    padding: .2rem;
    font-size: 14px;
    outline: none;
  }
  .btn-submit{
    width:9.6rem;
    margin:.2rem auto;
    height: 1rem;
    line-height: 1rem;
    color:white;
    background-color: #42a726;
    text-align: center;
    font-size: 16px;
    letter-spacing: 4px;
    border-radius: 5px;
  }
}
</style>
