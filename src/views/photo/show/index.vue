<template>
  <div class="showAera">
    <div class="content-container">
      <div class="portfolio-content">
        <div class="portfolio-page">
          <div class="portfolio-group">
            <img
              src="http://demo.qfpffmp.cn/cssthemes6/templatemo_413_flip_turn/images/1-large.jpg"
            >
          </div>
          <div class="portfolio-group">
            <img
              src="http://demo.qfpffmp.cn/cssthemes6/templatemo_413_flip_turn/images/2-large.jpg"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PhotoShow'
}
</script>
<style lang="scss">
.content-container {
  box-sizing: border-box;
  max-width: 1170px;
  width: 100%;
  margin: 0 auto;
  padding: 15px;
}
.portfolio-content {
  margin: 0 auto;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}
.portfolio-group {
  display: inline-block;
  width: 250px;
  height: 250px;
  position: relative;
  margin: 15px 10px;
  img {
    width: 100%;
    height: 100%;
  }
}
.showAera {
  max-width: 80%;
  margin: 1% auto;
  background: white;
  box-shadow: 0 0 5px rgba(107, 110, 112, 0.4);
}
</style>
