<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                111
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
* {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        *:before,
        *:after {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
.container{
    width: 1200px;
    height: 600px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: blue;
}
.row{
    height: 600px;
    margin-left: -10px;
    margin-right: -10px;
    background-color: yellow;
}
.col-md-12{
    height: 600px;
    position: relative;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    background-color: red;
}
</style>
