<style scoped>
.layout-nav{
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.ivu-layout-content{
  margin:20px auto;
}
.ivu-card-body .content{
  height: calc(100vh - 270px);
}
.totals{
  float: right;
}
.totals .number{
  color: #333;
  font-size: 22px;
  font-style: normal;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
              <HeaderTop selectNum='3'></HeaderTop>
            </Header>
            <Content :style="{padding: '0 50px'}">
              <div class="search">
                <Tabs value="name1" @on-click="tabs">
                  <TabPane label="日榜" name="name1"></TabPane>
                  <TabPane label="期榜" name="name2"></TabPane>
                </Tabs>
              </div>
              <!-- 日榜 -->
              <div v-if="tabValue=='name1'">
                <div style="margin-bottom:15px;">
                  <DatePicker :value="time" @on-change="showtime" type="date" placeholder="请选择日期" style="width: 200px"></DatePicker>
                  <Button type="primary" icon="ios-search" @click="searchDate(0)">搜索</Button>
                  <span class="totals">参与总人数：<em class="number">{{totals}}</em></span>
                 </div>
                <Card>
                    <div class="content" ref="table" @scroll="loadMore">
                      <Table :loading="loading" class="ivu-table-auto" border :height="wh" :columns="columns" :data="allData" @scroll="loadMore"></Table>
                    </div>
                </Card>
              </div>

              <!-- 期榜 -->
              <div v-if="tabValue=='name2'">
                <div style="margin-bottom:15px;">
                  <Input v-model="batch" placeholder="请输入第几期，如1，代表第一期" style="width: 200px"></Input>
                  <Button type="primary" icon="ios-search" @click="searchBatch">搜索</Button>
                </div>
                <Card>
                    <div class="content" ref="table">
                      <Table class="ivu-table-auto" border :height="wh" :columns="batchColumns" :data="batchData"></Table>
                    </div>
                </Card>
              </div>
            </Content>
        </Layout>
    </div>
</template>
<script>
import XHR from '../api'
import HeaderTop from '../components/header-top'
export default {
  data () {
    return {
      columns: [
        {
          title: '索引',
          type: 'index'
        },
        {
          title: '昵称',
          key: 'nickname'
        },
        {
          title: '得分',
          key: 'score'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '省份',
          key: 'province'
        }
      ], // table数据内容
      batchColumns: [
        {
          title: '索引',
          type: 'index'
        },
        {
          title: '昵称',
          key: 'nickname'
        },
        {
          title: '得分',
          key: 'total'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '省份',
          key: 'province'
        }
      ], // table数据内容
      allData: [],
      batchData: [],
      wh: 400,
      value1: '',
      tabValue: 'name1',
      time: '',
      batch: '',
      page: 0,
      loading: false,
      loamore: false,
      totals: 0
    }
  },
  components: {
    HeaderTop
  },
  created () {
  },
  mounted () {
    this.wh = this.$refs.table.offsetHeight
  },
  methods: {
    showtime (e) {
      this.time = e
    },
    searchDate (pages) {
      if (!pages) {
        this.page = 0
      }
      let json = {
        size: 50,
        page: this.page,
        date: this.time,
        time: +new Date()
      }
      XHR.getDayRank(json).then(res => {
        let {status, data, total} = res.data
        if (!status) {
          if (!pages) {
            this.loamore = false
            this.allData = this.picting(data)
            setTimeout(() => {
              let tables = document.querySelector('.ivu-table-overflowY')
              tables.scrollTop = 0
            }, 100)
          } else {
            if (data.length) {
              this.loamore = false
              this.allData = [...this.allData, ...this.picting(data)]
            } else {
              this.loamore = true
            }
          }
          this.loading = false
          this.totals = total
          this.$nextTick(() => {
            setTimeout(() => {
              let tables = document.querySelector('.ivu-table-overflowY')
              tables.addEventListener('scroll', e => {
                if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight && !this.loamore) {
                  this.loading = true
                  this.loamore = true
                  this.page++
                  this.searchDate(1)
                }
              })
            }, 200)
          })
        }
      })
    },
    searchBatch (datas) {
      let json = {
        project: 'king_of_answer',
        page: 0,
        batch: 1,
        size: 100,
        batchNum: this.batch,
        time: +new Date()
      }
      XHR.getTop(json).then(res => {
        let {status, data} = res.data
        if (!status) {
          this.batchData = this.picting(data)
        }
      })
    },
    picting (data) {
      if (data && data.length) {
        data = data.filter(item => item.phone)
        // data.forEach((element,index) => {
        //   if(!element.phone){
        //     data.splice(index,1)
        //   }
        // })
      }
      return data
    },
    loadMore (e) {
      console.log(e)
    },
    tabs (name) {
      this.tabValue = name
    }
  }
}
</script>
