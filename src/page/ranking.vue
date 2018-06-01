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
  height: calc(100vh - 250px);
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
                  <Button type="primary" icon="ios-search" @click="searchDate">搜索</Button>
                 </div>
                <Card>
                    <div class="content" ref="table">
                      <Table class="ivu-table-auto" border :height="wh" :columns="columns" :data="allData"></Table>
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
      batch: ''
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
    searchDate () {
      let json = {
        size: 50,
        page: 0,
        date: this.time,
        time:+new Date()
      }
      XHR.getDayRank(json).then(res => {
        let {status, data} = res.data
        if (!status) {
          this.allData = this.picting(data)
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
        time:+new Date()
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
        data = data.filter(item=>{
          return item.phone
        })
        // data.forEach((element,index) => {
        //   if(!element.phone){
        //     data.splice(index,1)
        //   }
        // })
      }
      return data
    },
    tabs (name) {
      this.tabValue = name
    }
  }
}
</script>
