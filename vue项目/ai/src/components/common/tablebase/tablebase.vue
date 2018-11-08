<template>
    <el-table
        class="element-reset-table"
        stripe
        :data="tableData"
        ref="tableMethods"
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.5)"
        :height="height"
        :header-row-class-name="thClassName"
        :row-class-name="rowClassName"
        :row-style="{height: '44px'}"
        @select="select"
        @select-all="selectAll"
        style="width: 100%;border: 1px solid #e6eaee;border-radius: 3px;">
        <el-table-column
                v-if="hasSelection"
                type="selection"
                width="40"
                >
        </el-table-column>
        <el-table-column
                v-if="hasNumber"
                label="序号"
                width="60"
                fixed
                >
            <template slot-scope="scope">
                {{ scope.$index+1 }}
            </template>
        </el-table-column>
        <template v-for="(item , index) in tableKey">
            <el-table-column
                    v-if = item.operations
                    :item="item"
                    :index="index"
                    :key="index"
                    :prop="item.key"
                    :label="item.name"
                    :width="item.width"
                    :formatter="item.formatter?item.formatter:formatterData"
                    >
                    <template slot-scope="scope">
                        <el-button
                            v-for="(operate , i ) in item.operations"
                            :key="i"
                            size="mini"
                            :type="operate.type"
                            @click="operate.func(scope.row, scope.$index)"
                            >{{operate.label}}</el-button>
                    </template>
            </el-table-column>
            <el-table-column
                v-else
                :item="item"
                :index="index"
                :key="index"
                :prop="item.key"
                :label="item.name"
                :width="item.width"
                :formatter="item.formatter?item.formatter:formatterData"
                >
            </el-table-column>
        </template>
    </el-table>
</template>

<script>
export default {
    props: {
        tableData: { type: Array },
        loading: {type: Boolean , default: false },
        tableKey: { type: Array },
        thClassName: { type: String , default: 'th-row-classname'},
        thCellClassName: { type: String },
        rowClassName: { type: String , default: 'row-classname'},
        cellClassName: {type: String },
        hasSelection: {type: Boolean , default: false },
        hasNumber: {type: Boolean , default: false},
        height: {type: String | Number , default: 572},
        options: {
            height: {type: String | Number},
            maxheight: {type: String | Number}
        },
        event: {
            select: { type: Function },
            selectAll: { type: Function },
            selectionChange: {type: Function },
            rowClick: {type: Function },
            sortChange: {type: Function}
        }
    },
    data() {
        return {
            tableMethods: {}
        };
    },
    methods: {
        formatterData(row, column, cellValue) {
            return cellValue;
        },
        select(selection , row ) {
            if (this.event.select) {
                this.event.select(selection , row);
            }
        },
        selectAll(selection) {
            if (this.event.selectAll) {
                this.event.selectAll(selection);
            }
        },
        selectionChange(selection) {
            if (this.event.selectionChange) {
                this.event.selectionChange(selection);
            }
        },
        rowClick(row , event , column ) {
            if (this.event.rowClick) {
                this.event.rowClick(row , event , column );
            }
        },
        sortChange(row, expandedRows) {
            if (this.event.sortChange) {
                this.event.sortChange(row, expandedRows);
            }
        }
    },
    mounted() {
        this.tableMethods = this.$refs.tableMethods;
    }
};
</script>

<style lang="less" >
.th-row-classname {
    height: 44px;
    background-color: #f5f8fa;
}
.row-classname {
    height: 44px;
}

</style>


