<style scoped>
</style>
<template>
    <Menu mode="horizontal" theme="dark" :active-name="selectNum"  @on-select="onSelect">
        <div class="layout-nav">
            <MenuItem name="1"><Icon type="ios-navigate"></Icon>用户信息</MenuItem>
            <MenuItem name="2"><Icon type="ios-navigate"></Icon>用户分布</MenuItem>
						<MenuItem name="3"><Icon type="ios-navigate"></Icon>日榜和期帮</MenuItem>
						<MenuItem name="4"><Icon type="ios-navigate"></Icon>总榜</MenuItem>
        </div>
    </Menu>
</template>
<script>
export default {
  props: ['selectNum'],
  data () {
    return {}
  },
  methods: {
    onSelect (name) {
      switch (name) {
        case '1':
          this.$router.replace('/Home/')
          break
        case '2':
          this.$router.replace('/UserScatter/')
          break
        case '3':
          this.$router.replace('/Ranking/')
          break
				 case '4':
          this.$router.replace('/allRank/')
          break
      }
    }
  }
}
</script>
