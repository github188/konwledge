<template>
    <svg xmlns='http://www.w3.org/2000/svg' version='1.1' ref="svgComponent">
        <path style="fill:none;stroke:#55f0fe;stroke-width:2;stroke-dasharray:5 5;stroke-dashoffset: 90;animation: dash 5s linear infinite;transition: all .3s ease-out;">
        </path>
    </svg>
    <!-- <canvas ref="canvasComponent" width="180" height="150"></canvas> -->
</template>
    <!--<script>
export default {
    mounted() {
        const can = this.$refs.canvasComponent;
        const ctx = can.getContext('2d');
        let offset = 0;

        setInterval(()=>{
            ctx.clearRect(0,0,180,150);
            ctx.setLineDash([6,4]);
            ctx.strokeStyle = '#55f0fe';
            ctx.lineWidth = 1;
            ctx.lineDashOffset = -offset;
            ctx.moveTo(90,150);
            ctx.lineTo(90,108);
            ctx.lineTo(1,108);
            ctx.lineTo(1,42);
            ctx.lineTo(90,42);
            ctx.lineTo(90,0);
            ctx.moveTo(90,108);
            ctx.lineTo(179,108);
            ctx.lineTo(179,42);
            ctx.lineTo(90,42);
            ctx.stroke();//绘制边框
            offset++;
        }, 50);
    }
};
</script>-->
<script>
export default {
    mounted() {
        const _this = this;

        setTimeout(()=>{
            _this.resizeLine();
        },500);
    },
    methods: {
        resizeLine() {
            const svg = this.$refs.svgComponent;

            const svgWidth = svg.width.baseVal.value;

            svg.firstChild.setAttribute('d','M' + svgWidth / 2 + ' 150 L' + svgWidth / 2 + ' 108 L1 108 L1 42 L' + svgWidth / 2 + ' 42  L' + svgWidth / 2
            + ' 0  M' + svgWidth / 2 + ' 108  L' + (svgWidth - 3) + ' 108  L' + svgWidth + ' 42  L' + svgWidth / 2 + ' 42');
        }
    }
};
</script>
<style>
@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
