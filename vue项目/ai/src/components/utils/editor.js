export default class Editor {
    constructor({
        canvas,
        tools,
        config: {
            actionEditable = true,
            rectEditable = true,
            circleEditable = true,
            polygon4Editable = true,
            pointEditable = true,
            polygonEditable = true
        }
    }) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.paintType = 0; // 图形格式：0代表操作模式 1代表矩形 2代表圆形 3代表四边形 4代表点 5代表多边形
        this.startPoint = {
            x: 0,
            y: 0
        };

        this.textFontSize = 20;

        this.isPainting = false; // 绘图状态
        this.isDragging = false; // 拖动状态
        this.isSizeChanging = false; // 矩形或圆形处于变形状态
        this.isPositionChanging = false; // 拖动图形中
        this.selectedShape = null; // 被选中形状
        this.shapes = []; // 图形数据
        this.scaleSize = 1; // 当前缩放比例
        this.currentStrokeStyle = '#0000E3'; // 当前描边色
        this.scrollSpeed = 50;
        this.sourceX = 0; // canvas 绘制图像时取原图像像素点位置的X坐标
        this.sourceY = 0; // canvas 绘制图像时取原图像像素点位置的Y坐标

        this.temporaryData = []; // 拖拽临时数据

        this.handleLabelChange = this.handleLabelChange.bind(this);
        this.handleCancalAction = this.handleCancalAction.bind(this);
        this.drawLabel = this.drawLabel.bind(this);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseWheel = this.onMouseWheel.bind(this);

        this.removeSelected = this.removeSelected.bind(this);
        this.removeAll = this.removeAll.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        this.canvas.onmousedown = this.onMouseDown;
        this.canvas.onmouseup = this.onMouseUp;
        this.canvas.onmouseout = this.onMouseOut;
        this.canvas.onmousemove = this.onMouseMove;
        this.canvas.onmousewheel = this.onMouseWheel;
        this.tools = tools;

        this.actionEditable = actionEditable; // 是否可操作
        this.rectEditable = rectEditable; // 是否可画矩形
        this.circleEditable = circleEditable; // 是否可画圆
        this.polygon4Editable = polygon4Editable; // 是否可画四边形
        this.pointEditable = pointEditable; // 是否可画点
        this.polygonEditable = polygonEditable; // 是否可画多边形
    }

    init(img, canvasWidth, canvasHeight) {
        this.img = img;
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvasWidth = canvasWidth; // canvas宽度
        this.canvasHeight = canvasHeight; // canvas高度
        this.imgWidth = img.width; // img宽度
        this.imgHeight = img.height; // img高度
        this.ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
    }

    // 删除所有图形
    removeAll() {
        this.shapes = this.shapes.filter(item => item.shape_id).map(item => ({
            ...item,
            isUpdate: false,
            isDelete: true
        }));
        this.draw();
    }

    // 删除选中图形或点
    removeSelected() {
        if (this.selectedShape !== null) {
            const sId = this.selectedShape.shapeId;
            const pId = this.selectedShape.pointId;

            this.shapes = this.shapes.map(item => {
                if (item.id === sId) {
                    // eslint-disable-next-line
                    if (item.paintType === 5 && pId !== undefined && item.points.length > 3 && item.points[pId]) {
                        item.points.splice(pId, 1);
                        item.points = item.points.map((o, i) => ({ ...o, pointId: i }));
                        item.isUpdate = true;
                        delete this.selectedShape.pointId;
                        return { ...item };
                    } else {
                        this.selectedShape = null;
                        if (item.shape_id) {
                            return {
                                ...item,
                                isDelete: true
                            };
                        } else {
                            return null;
                        }
                    }
                } else {
                    return { ...item };
                }
            }).filter(i => i !== null).map((o, i) => ({ ...o, index: i }));
            this.draw();
        }
    }

    // 重置
    reset() {
        this.paintType = 0; // 图形格式：0代表操作模式 1代表矩形 2代表圆形 3代表多边形 4代表点
        this.startPoint = {
            x: 0,
            y: 0
        };
        this.isPainting = false; // 绘图状态
        this.label_editing = false; // 标签编辑状态
        this.isDragging = false; // 拖动状态
        this.isSizeChanging = false; // 矩形或圆形处于变形状态
        this.isPositionChanging = false; // 拖动图形中
        this.selectedShape = null; // 被选中形状
        this.shapes = []; // 图形数据
        this.scaleSize = 1; // 当前缩放比例
        this.currentStrokeStyle = '#0000E3'; // 当前描边色
        this.scrollSpeed = 50;
        this.sourceX = 0; // canvas 绘制图像时取原图像像素点位置的X坐标
        this.sourceY = 0; // canvas 绘制图像时取原图像像素点位置的Y坐标

        this.temporaryData = []; // 拖拽临时数据
    }

    handleLabelChange(v) {// 标签编辑
        if (this.selectedShape) {
            const sId = this.selectedShape.shapeId;

            this.tools.mark_edit_tool.value = v;
            this.tools.mark_edit_tool.removeAttribute('disabled');
            this.shapes = this.shapes.map(obj => {
                if (obj.id === sId) {
                    return {
                        ...obj,
                        label: v,
                        isUpdate: !!obj.shape_id
                    };
                } else {
                    return obj;
                }
            });
            this.draw();
        }
    }

    handleCancalAction() {// 撤销操作
        let lastShape = this.shapes[this.shapes.length - 1];
        const selectedShape = this.selectedShape;
        let currentEditedShape = null;

        if (selectedShape) {
            if (selectedShape.paintType === 5) {
                this.shapes.forEach((item, index) => {
                    if (item.id === selectedShape.shapeId) {
                        if (item.points.length > 0) {
                            // if (item.isCompleted) {
                            //     item.points.push(item.points[0]);
                            // } else {
                                item.points.pop();
                           // }
                            if (item.shape_id) {
                                item.isUpdate = true;
                            }
                            this.shapes[index] = null;
                        } else {
                            if (item.shape_id) {
                                item.isDelete = true;
                                item.isUpdate = false;
                            }
                            this.shapes[index] = null;
                        }
                        item.isCompleted = false;
                        item.selected = false;
                        currentEditedShape = item;
                    }
                });
                if (currentEditedShape) {
                    this.shapes.push(currentEditedShape);
                    this.canvas.style.cursor = 'crosshair';
                }
                this.shapes = this.shapes.filter(item => !!item).map((item, index) => ({ ...item, id: index }));
                this.isPainting = true;
                this.paintType = selectedShape.paintType;
                this.selectedShape = null;
            }
        } else if (lastShape) {
            if (lastShape.paintType === 5) {
                if (lastShape.points.length > 1) {
                    if (lastShape.shape_id) {
                        lastShape.isUpdate = true;
                    }
                    if (!lastShape.isCompleted) {
                        lastShape.points.pop();
                    }
                } else if (lastShape.points.length === 1) {
                    if (lastShape.shape_id) {
                        lastShape.isCompleted = true;
                        lastShape.isDelete = true;
                        lastShape.isUpdate = false;
                    } else {
                        lastShape = null;
                        this.shapes.pop();
                    }
                }
                if (lastShape.isCompleted && !lastShape.isDelete) {
                    lastShape.isCompleted = false;
                    this.paintType = lastShape.paintType;
                    this.isPainting = true;
                }
                if (lastShape) {
                    this.shapes[this.shapes.length - 1] = lastShape;
                }
            }
        }
        this.draw();
    }

    onMouseWheel(e) {// 鼠标滚轮事件
        e.preventDefault();
        if (e.ctrlKey) {
            if (!this.positionZooming) {
                this.positionZooming = true;
                this.zoomPosition = {
                    x: e.offsetX / this.scaleSize + this.sourceX,
                    y: e.offsetY / this.scaleSize + this.sourceY
                };
            } else if (e.deltaY < 0) {
                this.zoom('enlarge', e, 'center');
            } else if (e.deltaY > 0) {
                this.zoom('narrow', e, 'center');
            }
        } else {
            this.positionZooming = false;
            this.zoomPosition = null;
            if (e.deltaY < 0) {
                this.zoom('enlarge', e);
            } else if (e.deltaY > 0) {
                this.zoom('narrow', e);
            }
        }
    }

    // 鼠标按下事件
    onMouseDown(e) {
        this.label_editing = false;
        this.isPainting = true;
        const x = e.offsetX;
        const y = e.offsetY;
        const len = this.shapes.length;

        this.startPoint = { // 当前点在画布上的坐标
            x,
            y
        };
        const currentPoint = { // 当前点在img上的坐标
            x: this.sourceX + x / this.scaleSize,
            y: this.sourceY + y / this.scaleSize
        };

        // 操作模式
        if (this.paintType === 0) {
            const {
                checkInShapeResult,
                checkInShapeBorderResult
            } = this.checkCurrentPoint(this.shapes, currentPoint);
            // console.log(this.shapes, checkInShapeResult, checkInShapeBorderResult)

            if (checkInShapeBorderResult) {
                this.selectedShape = checkInShapeBorderResult;
                this.tools.mark_edit_tool.value = checkInShapeBorderResult.label;
                this.tools.mark_edit_tool.removeAttribute('disabled');
                this.shapes = this.shapes.map(item => item.id === this.selectedShape.shapeId ? { ...item, selected: true } : { ...item, selected: false });
                this.isSizeChanging = true;
            } else if (checkInShapeResult) {
                this.selectedShape = checkInShapeResult;
                this.tools.mark_edit_tool.value = checkInShapeResult.label;
                this.tools.mark_edit_tool.removeAttribute('disabled');
                this.shapes = this.shapes.map(item => item.id === this.selectedShape.shapeId ? { ...item, selected: true } : { ...item, selected: false });
                this.isPositionChanging = true;
                if (checkInShapeResult.paintType === 3 || checkInShapeResult.paintType === 5) {
                    this.tools.mark_edit_tool.value = this.shapes.filter(i => i.id === this.selectedShape.shapeId)[0].label;
                }
            } else {
                this.selectedShape = null;
                this.shapes = this.shapes.map(item => ({ ...item, selected: false }));
                this.isDragging = true;
                this.tools.mark_edit_tool.value = '';
                this.tools.mark_edit_tool.disabled = 'disabled';
            }
            this.draw();
            this.temporaryData.push({
                x,
                y
            });
        }

        // 绘制矩形
        if (this.paintType === 1) {
            this.selectedShape = null;
            this.shapes.forEach((item, index) => {
                this.shapes[index].selected = false;
            });
            this.shapes.push({
                id: len,
                x,
                y,
                w: 0,
                h: 0,
                label: '',
                color: this.currentStrokeStyle,
                paintType: this.paintType
            });
        }

        // 绘制圆形
        if (this.paintType === 2) {
            this.selectedShape = null;
            this.shapes.forEach((item, index) => {
                this.shapes[index].selected = false;
            });
            this.shapes.push({
                id: len,
                x,
                y,
                r: 0,
                label: '',
                color: this.currentStrokeStyle,
                paintType: this.paintType
            });
        }

        // 绘制多边形
        if (this.paintType === 3 || this.paintType === 5) {
            this.selectedShape = null;
            this.shapes.forEach((item, index) => {
                this.shapes[index].selected = false;
            });
            const INIT = { // 初始数据
                id: len,
                points: [currentPoint],
                paintType: this.paintType,
                isCompleted: false,
                label: '',
                color: this.currentStrokeStyle
            };

            if (len === 0 || this.shapes[len - 1].paintType !== 3 && this.shapes[len - 1].paintType !== 5 || (this.shapes[len - 1].paintType === 3 || this.shapes[len - 1].paintType === 5) && this.shapes[len - 1].isCompleted) {
                this.shapes.push(INIT);
            } else {
                // console.log(this.shapes)
                const polygon = this.shapes[len - 1];

                if (this.isPainting) {
                    let points = polygon.points;

                    if (polygon.paintType === 3) {
                        if (points.length === 4) {
                            polygon.isCompleted = true;
                            this.isPainting = false;
                            this.selectedShape = { shapeId: polygon.id, paintType: polygon.paintType };
                            polygon.selected = true;
                            this.toggleActionMode(0);
                        }
                    } else {
                        const sPoint = points[0];
                        const distance = Math.sqrt(Math.pow(sPoint.x - currentPoint.x, 2) + Math.pow(sPoint.y - currentPoint.y, 2)) * this.scaleSize;

                        if (points.length > 2 && distance < 30) {
                            points = points.slice(0, -1);
                            polygon.isCompleted = true;
                            this.isPainting = false;
                            this.selectedShape = { shapeId: polygon.id, paintType: polygon.paintType };
                            polygon.selected = true;
                            this.toggleActionMode(0);
                        }
                    }
                    this.shapes[len - 1] = {
                        ...polygon,
                        points
                    };
                }
            }
            this.draw();
        }

        // 绘制点
        if (this.paintType === 4) {
            this.selectedShape = null;
            this.shapes.forEach((item, index) => {
                this.shapes[index].selected = false;
            });
            this.shapes.push({
                id: len,
                ...currentPoint,
                label: '',
                color: this.currentStrokeStyle,
                paintType: this.paintType
            });
            this.draw();
        }
    }

    // 鼠标移动事件
    onMouseMove(e) {
        const paintType = this.paintType;
        const startPoint = this.startPoint;
        const canvasWidth = this.canvasWidth;
        const canvasHeight = this.canvasHeight;
        const imgWidth = this.imgWidth;
        const imgHeight = this.imgHeight;
        const isPainting = this.isPainting;
        const isDragging = this.isDragging;
        const isSizeChanging = this.isSizeChanging;
        const isPositionChanging = this.isPositionChanging;
        const selectedShape = this.selectedShape;
        const shapes = this.shapes;
        const scaleSize = this.scaleSize;
        const sourceX = this.sourceX;
        const sourceY = this.sourceY;
        const temporaryData = this.temporaryData;

        if (isPainting && this.paintType !== 0) {
            const width = Math.abs(e.offsetX - startPoint.x);
            const height = Math.abs(e.offsetY - startPoint.y);
            const lastShape = shapes[shapes.length - 1];

            if (paintType === 3 || paintType === 5) { // 多边形
                if (lastShape && (lastShape.paintType === 3 || lastShape.paintType === 5) && !lastShape.isCompleted) {
                    lastShape.points[lastShape.points.length - 1] = {
                        x: sourceX + e.offsetX / scaleSize,
                        y: sourceY + e.offsetY / scaleSize
                    };
                    this.shapes[shapes.length - 1] = {
                        ...lastShape
                    };
                }
            } else if (paintType === 1) { // 矩形
                const x = e.offsetX < startPoint.x ? e.offsetX : startPoint.x;
                const y = e.offsetY < startPoint.y ? e.offsetY : startPoint.y;

                this.shapes[shapes.length - 1] = {
                    ...shapes[shapes.length - 1],
                    x: sourceX + x / scaleSize,
                    y: sourceY + y / scaleSize,
                    w: width / scaleSize,
                    h: height / scaleSize
                };
            } else if (paintType === 2) { // 圆形
                const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

                this.shapes[shapes.length - 1] = {
                    ...shapes[shapes.length - 1],
                    x: sourceX + startPoint.x / scaleSize,
                    y: sourceY + startPoint.y / scaleSize,
                    r: radius / scaleSize
                };
            } else if (paintType === 4) { // 点
                this.shapes[shapes.length - 1] = {
                    ...shapes[shapes.length - 1],
                    x: sourceX + e.offsetX / scaleSize,
                    y: sourceY + e.offsetY / scaleSize
                };
            }
            this.draw();
        } else if (paintType === 0) {
            // checkInShapeBorderResult没有用到暂时先注释
            // const { checkInShapeBorderResult } = this.checkCurrentPoint(shapes, {
            //     x: sourceX + e.offsetX / scaleSize,
            //     y: sourceY + e.offsetY / scaleSize
            // });

            if (isDragging && !selectedShape) { // 拖动整体
                const distanceX = (e.offsetX - temporaryData[temporaryData.length - 1].x) / scaleSize;
                const distanceY = (e.offsetY - temporaryData[temporaryData.length - 1].y) / scaleSize;

                this.sourceX = sourceX - distanceX;
                this.sourceY = sourceY - distanceY;

                // 临界点控制
                if (this.sourceX < 0) {
                    this.sourceX = 0;
                }
                if (this.sourceY < 0) {
                    this.sourceY = 0;
                }
                if (this.sourceX > imgWidth - canvasWidth / scaleSize) {
                    this.sourceX = imgWidth - canvasWidth / scaleSize;
                }
                if (this.sourceY > imgHeight - canvasHeight / scaleSize) {
                    this.sourceY = imgHeight - canvasHeight / scaleSize;
                }
                this.draw();
                this.temporaryData.push({
                    x: e.offsetX,
                    y: e.offsetY
                });
            } else if (isPositionChanging) { // 拖动图形
                const distanceX = (e.offsetX - temporaryData[temporaryData.length - 1].x) / scaleSize;
                const distanceY = (e.offsetY - temporaryData[temporaryData.length - 1].y) / scaleSize;

                for (let index = 0; index < shapes.length; index++) {
                    let item = shapes[index];

                    if (item.id === selectedShape.shapeId) {
                        item = { ...item, isUpdate: !!item.shape_id };
                        this.shapes[index] = { ...item };
                        if (selectedShape.paintType !== 3 && selectedShape.paintType !== 5) {
                            this.shapes[index] = {
                                ...item,
                                x: item.x + distanceX > 0 ? item.x + distanceX : 0,
                                y: item.y + distanceY > 0 ? item.y + distanceY : 0
                            };
                            // eslint-disable-next-line
                        } else if (selectedShape.pointId !== undefined) {
                            for (let i = 0; i < item.points.length; i++) {
                                const p = item.points[i];

                                if (i === selectedShape.pointId) {
                                    this.shapes[index].points[i] = {
                                        x: p.x + distanceX > 0 ? p.x + distanceX : 0,
                                        y: p.y + distanceY > 0 ? p.y + distanceY : 0
                                    };
                                    break;
                                }
                            }
                        } else if (selectedShape.paintType === 3 || selectedShape.paintType === 5) {
                            // 屏蔽多边形拖动
                            // this.shapes[index] = {
                            //     ...item,
                            //     points: item.points.map(p=>({
                            //         x: p.x + distanceX,
                            //         y: p.y + distanceY
                            //     }))
                            // }
                        }
                        break;
                    }
                }
                this.draw();
                this.temporaryData.push({
                    x: e.offsetX,
                    y: e.offsetY
                });
            } else if (isSizeChanging) { // 改变形状大小
                const currentPoint = { // 鼠标当前位置
                    x: e.offsetX,
                    y: e.offsetY
                };
                const lastPoint = { // 鼠标上一个位置
                    x: temporaryData[temporaryData.length - 1].x,
                    y: temporaryData[temporaryData.length - 1].y
                };
                const distanceX = (currentPoint.x - lastPoint.x) / scaleSize;
                const distanceY = (currentPoint.y - lastPoint.y) / scaleSize;
                const {
                    shapeId,
                    l,
                    r,
                    u,
                    d,
                    ul,
                    ur,
                    dl,
                    dr
                } = selectedShape;
                let sShape = shapes.filter(item => item.id === shapeId)[0];

                sShape = {
                    ...sShape,
                    isUpdate: !!sShape.shape_id
                };
                if (sShape.paintType === 1) {
                    if (Math.abs(distanceX) < sShape.w) {
                        if (l || dl || ul) {
                            sShape.x += distanceX;
                            sShape.w -= distanceX;
                        } else if (r || dr || ur) {
                            sShape.w += distanceX;
                        }
                    } else {
                        this.isSizeChanging = false;
                        this.canvas.style.cursor = 'auto';
                    }
                    if (Math.abs(distanceY) < sShape.h) {
                        if (u || ul || ur) {
                            sShape.y += distanceY;
                            sShape.h -= distanceY;
                        } else if (d || dl || dr) {
                            sShape.h += distanceY;
                        }
                    } else {
                        this.isSizeChanging = false;
                        this.canvas.style.cursor = 'auto';
                    }
                } else if (sShape.paintType === 2) {
                    const distance1 = Math.sqrt(Math.pow(sourceX + currentPoint.x / scaleSize - sShape.x, 2) + Math.pow(sourceY + currentPoint.y / scaleSize - sShape.y, 2));
                    const distance2 = Math.sqrt(Math.pow(sourceX + lastPoint.x / scaleSize - sShape.x, 2) + Math.pow(sourceY + lastPoint.y / scaleSize - sShape.y, 2));

                    sShape.r = sShape.r + distance1 - distance2;
                }
                this.shapes = shapes.map(item => item.id === sShape.id ? sShape : item);
                this.draw();
                this.temporaryData.push({
                    x: e.offsetX,
                    y: e.offsetY
                });
            }
        }
    }

    // 鼠标弹起事件
    onMouseUp(e) {
        if (this.paintType !== 3 && this.paintType !== 5) {
            const cPoint = {
                x: e.offsetX,
                y: e.offsetY
            };

            if ((this.paintType === 1 || this.paintType === 2) && this.isPainting && (cPoint.x === this.startPoint.x && cPoint.y === this.startPoint.y)) {
                this.shapes.pop();
            }
            if (this.paintType === 4) {
                const SHAPES = this.shapes.slice(0, this.shapes.length - 1);
                let existed = false;
                const currentPoint = {
                    x: cPoint.x / this.scaleSize + this.sourceX,
                    y: cPoint.y / this.scaleSize + this.sourceY
                };

                SHAPES.forEach(item => {
                    if (item.x === currentPoint.x && item.y === currentPoint.y) {
                        existed = true;
                    }
                });
                if (existed) {
                    this.shapes.pop();
                }
            }
            this.isPainting = false;
            this.isDragging = false;
            if (parseInt(this.paintType, 10) !== 0) { // 原先this.paintType!=0
                this.temporaryData = [];
                this.selectedShape = { ...this.shapes[this.shapes.length - 1], shapeId: this.shapes[this.shapes.length - 1].id };
                this.tools.mark_edit_tool.value = this.shapes[this.shapes.length - 1].label;
                this.tools.mark_edit_tool.removeAttribute('disabled');
                this.shapes = this.shapes.map(shape => {
                    return shape.id === this.selectedShape.shapeId ? { ...shape, selected: true } : { ...shape, selected: false };
                });
                if (this.paintType !== 4) {
                    this.toggleActionMode(0);
                }
            }
        } else {
            const lastShape = this.shapes[this.shapes.length - 1];

            if (this.isPainting && !lastShape.isCompleted) {
                this.shapes[this.shapes.length - 1].points.push({
                    x: this.sourceX + e.offsetX / this.scaleSize + 1,
                    y: this.sourceY + e.offsetY / this.scaleSize + 1
                });
            }
        }
        this.zoomPosition = null;
        this.isPositionChanging = false;
        this.isSizeChanging = false;
        this.draw();
    }

    // 鼠标离开区域事件
    onMouseOut() {
        if (this.paintType !== 3 && this.paintType !== 5) {
            this.isPainting = false;
        }
        this.isDragging = false;
        this.isPositionChanging = false;
    }

    // 键盘按下事件
    onKeyDown(e) {
        console.log(e.keyCode, this);
        if (!this.label_editing) {
            switch (e.keyCode) {
                case 27: // ESC 切换操作模式
                case 65: // A    切换操作模式
                case 32: // 空格 切换操作模式
                    e.preventDefault();
                    this.toggleActionMode(0);
                    break;
                case 37: // ←
                    this.moveLeft();
                    break;
                case 38: // ↑
                    this.moveUp();
                    break;
                case 39: // →
                    this.moveRight();
                    break;
                case 40: // ↓
                    this.moveDown();
                    break;
                case 46: // delete
                case 68: // d
                    e.preventDefault();
                    if (e.ctrlKey) {
                        this.removeAll();
                    } else {
                        this.removeSelected();
                    }
                    this.draw();
                    break;
                case 69: // E 切换为四边形
                    this.toggleActionMode(3);
                    break;
                case 81: // Q 切换为矩形
                    this.toggleActionMode(1);
                    break;
                case 82: // R 切换为点
                    this.toggleActionMode(4);
                    break;
                case 87: // W  切换为圆形
                    this.toggleActionMode(2);
                    break;
                case 84: // T  切换为多边形
                    this.toggleActionMode(5);
                    break;
                case 90: // Z  撤销
                    if (e.ctrlKey) {
                        this.handleCancalAction();
                    }
                    break;
                // case 187: //＋
                // case 107: //＋
                //     this.zoom('enlarge')
                //     break
                // case 189: //－
                // case 109: //－
                //     this.zoom('narrow')
                //     break
            }
        } else if (e.keyCode === 13) {
            this.tools.mark_edit_tool.blur();
        }
    }

    // 键盘弹起事件
    onKeyUp(e) {
        // console.log(e.keyCode)
        if (e.keyCode === 17) {
            this.zoomPosition = null;
            this.positionZooming = false;
        }
    }
    // 切换操作模式
    toggleActionMode(mode) {
        const editableDict = {
            0: 'actionEditable',
            1: 'rectEditable',
            2: 'circleEditable',
            3: 'polygon4Editable',
            4: 'pointEditable',
            5: 'polygonEditable'
        };

        if (editableDict[mode] && this[editableDict[mode]] === true) {
            this.paintType = mode;
            this.canvas.style.cursor = 'crosshair';
            if (mode !== 3 && mode !== 5) {
                this.isPainting = false;
            }
            this.filterUncompletedPolygon();
            this.draw();
        }
    }

    // 过滤未完成多边形
    filterUncompletedPolygon() {
        this.shapes = this.shapes.filter(item => item.paintType !== 3 && item.paintType !== 5 || (item.paintType === 3 || item.paintType === 5) && item.isCompleted);
    }

    // 动态设置鼠标样式
    checkCurrentPoint(shapes, cPoint) {
        let checkInShapeResult = false;
        let checkInShapeBorderResult = false;
        let distance = 20;

        for (let i = shapes.length - 1; i >= 0; i--) {
            const borderCheckResult = this.checkInShapeBorder(shapes[i], cPoint);
            const shapeCheckResult = this.checkInShape(shapes[i], cPoint);
            const pointCheckResult = this.checkInPoint(shapes[i], cPoint);

            if (borderCheckResult) {
                checkInShapeBorderResult = borderCheckResult;
            }
            if (pointCheckResult && pointCheckResult.distance < distance) {
                distance = pointCheckResult.distance;
                checkInShapeResult = pointCheckResult;
            } else if (shapeCheckResult && !checkInShapeResult) {
                checkInShapeResult = shapeCheckResult;
            }
        }
        if (checkInShapeBorderResult) {
            const {
                l,
                r,
                u,
                d,
                ur,
                ul,
                dr,
                dl,
                aroundBorder
            } = checkInShapeBorderResult;

            if (ul) {
                this.canvas.style.cursor = 'nw-resize';
            }
            if (dl) {
                this.canvas.style.cursor = 'ne-resize';
            }
            if (ur) {
                this.canvas.style.cursor = 'nesw-resize';
            }
            if (dr) {
                this.canvas.style.cursor = 'nwse-resize';
            }
            if (l) {
                this.canvas.style.cursor = 'w-resize';
            }
            if (r) {
                this.canvas.style.cursor = 'e-resize';
            }
            if (u) {
                this.canvas.style.cursor = 'n-resize';
            }
            if (d) {
                this.canvas.style.cursor = 's-resize';
            }
            if (aroundBorder) {
                this.canvas.style.cursor = 'all-scroll';
            }
        } else if (checkInShapeResult) {
            this.canvas.style.cursor = 'all-scroll';
        } else {
            this.canvas.style.cursor = 'auto';
        }
        return {
            checkInShapeResult,
            checkInShapeBorderResult
        };
    }

    checkInPoint(shape, point) {
        if (shape.paintType === 3 || shape.paintType === 5) {
            let distance = 20;
            let pointId;

            for (let i = 0; i < shape.points.length; i++) {
                const item = shape.points[i];
                const _distance = Math.sqrt(Math.pow(item.x - point.x, 2) + Math.pow(item.y - point.y, 2));

                if (_distance * this.scaleSize < distance) {
                    distance = _distance * this.scaleSize;
                    pointId = i;
                }
            }
            // eslint-disable-next-line
            if (distance < 20 && pointId !== undefined) {
                return {
                    paintType: shape.paintType,
                    shapeId: shape.id,
                    pointId,
                    label: shape.label,
                    distance: distance * this.scaleSize
                };
            }
        }
    }

    // 检查当前点是否在形状内
    checkInShape(shape, point) {
        if (shape.isDelete) {
            return false;
        } else {
            let distance;

            if (shape.paintType === 1) {
                if (shape.x <= point.x && point.x <= shape.x + shape.w && shape.y <= point.y && point.y <= shape.y + shape.h) {
                    return {
                        paintType: shape.paintType,
                        shapeId: shape.id,
                        label: shape.label
                    };
                }
            }
            if (shape.paintType === 2) {
                distance = Math.sqrt(Math.pow(shape.x - point.x, 2) + Math.pow(shape.y - point.y, 2));
                if (distance <= shape.r) {
                    return {
                        paintType: shape.paintType,
                        shapeId: shape.id,
                        label: shape.label
                    };
                }
            }
            if (shape.paintType === 3 || shape.paintType === 5) {
                if (this.checkInPolygon(point, shape.points)) {
                    return {
                        paintType: shape.paintType,
                        shapeId: shape.id,
                        label: shape.label
                    };
                }
            }
            if (shape.paintType === 4) {
                distance = Math.sqrt(Math.pow(shape.x - point.x, 2) + Math.pow(shape.y - point.y, 2));
                if (distance * this.scaleSize <= 10) {
                    return {
                        paintType: shape.paintType,
                        shapeId: shape.id,
                        label: shape.label
                    };
                }
            }
        }
    }

    // 检查点是否在多边形内
    checkInPolygon(p, poly) {
        let px = p.x,
            py = p.y,
            sum = 0;

        for (let i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
            let sx = poly[i].x,
                sy = poly[i].y,
                tx = poly[j].x,
                ty = poly[j].y;

            // 点与多边形顶点重合或在多边形的边上
            if ((sx - px) * (px - tx) >= 0 && (sy - py) * (py - ty) >= 0 && (px - sx) * (ty - sy) === (py - sy) * (tx - sx)) {
                return 'on';
            }

            // 点与相邻顶点连线的夹角
            let angle = Math.atan2(sy - py, sx - px) - Math.atan2(ty - py, tx - px);

            // 确保夹角不超出取值范围（-π 到 π）
            if (angle >= Math.PI) {
                angle -= Math.PI * 2;
            } else if (angle <= -Math.PI) {
                angle += Math.PI * 2;
            }

            sum += angle;
        }

        // 计算回转数并判断点和多边形的几何关系
        return Math.round(sum / Math.PI) !== 0;
    }

    // 检查是否在图形边缘
    checkInShapeBorder(shape, point) {
        if (shape.paintType !== 1 && shape.paintType !== 2 || shape.isDelete) {
            return false;
        } else {
            const x1 = shape.x;
            const x2 = point.x;
            const y1 = shape.y;
            const y2 = point.y;
            const w = shape.w;
            const h = shape.h;
            const scaleSize = this.scaleSize;

            if (shape.paintType === 1) {
                let l = false;
                let r = false;
                let u = false;
                let d = false;
                let ul = false;
                let ur = false;
                let dr = false;
                let dl = false;

                if (-10 / scaleSize < x2 - x1 && x2 - x1 <= 10 / scaleSize) {
                    if (-10 / scaleSize < y2 - y1 && y2 - y1 <= 10 / scaleSize) {
                        ul = true;
                    } else if (-10 / scaleSize < y2 - y1 - h && y2 - y1 - h <= 10 / scaleSize) {
                        dl = true;
                    } else if (10 / scaleSize < y2 - y1 && y2 - y1 < -10 / scaleSize + h) {
                        l = true;
                    }
                } else if (-10 / scaleSize < x2 - x1 - w && x2 - x1 - w <= 10 / scaleSize) {
                    if (-10 / scaleSize < y2 - y1 && y2 - y1 <= 10 / scaleSize) {
                        ur = true;
                    } else if (-10 / scaleSize < y2 - y1 - h && y2 - y1 - h <= 10 / scaleSize) {
                        dr = true;
                    } else if (10 / scaleSize < y2 - y1 && y2 - y1 < -10 / scaleSize + h) {
                        r = true;
                    }
                } else if (-10 / scaleSize < y2 - y1 && y2 - y1 <= 10 / scaleSize) {
                    if (10 / scaleSize < x2 - x1 && x2 - x1 < -10 / scaleSize + w) {
                        u = true;
                    }
                } else if (-10 / scaleSize < y2 - y1 - h && y2 - y1 - h <= 10 / scaleSize) {
                    if (10 / scaleSize < x2 - x1 && x2 - x1 < -10 / scaleSize + w) {
                        d = true;
                    }
                }
                if (l || r || u || d || ur || ul || dr || dl) {
                    return {
                        shapeId: shape.id,
                        u,
                        l,
                        d,
                        r,
                        ur,
                        ul,
                        dr,
                        dl,
                        paintType: shape.paintType,
                        label: shape.label
                    };
                } else {
                    return false;
                }
            }
            if (shape.paintType === 2) {
                const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

                if (-10 / scaleSize <= shape.r - distance && shape.r - distance <= 10) {
                    return {
                        shapeId: shape.id,
                        paintType: shape.paintType,
                        aroundBorder: true,
                        label: shape.label
                    };
                } else {
                    return false;
                }
            }
        }
    }

    // 切换颜色
    onColorChange(v) {
        this.isPainting = false;
        this.filterUncompletedPolygon();
        this.currentStrokeStyle = v;
    }

    // 缩放
    zoom(tag, e, mode) {
        const ps = this.scaleSize;

        if (this.zoomPosition && mode === 'center') {
            if (tag === 'enlarge') { // 放大
                this.scaleSize = this.scaleSize + 0.2;
            }
            if (tag === 'narrow') { // 缩小
                this.scaleSize = this.scaleSize - 0.2;
                if (this.scaleSize < this.minScaleSize) {
                    this.scaleSize = this.minScaleSize;
                }
            }
        } else {
            if (tag === 'enlarge') { // 放大
                this.scaleSize = this.scaleSize * 1.2;
            }
            if (tag === 'narrow') { // 缩小
                this.scaleSize = this.scaleSize / 1.2;
                if (this.scaleSize < this.minScaleSize) {
                    this.scaleSize = this.minScaleSize;
                }
            }
        }
        const ss = this.scaleSize;
        const cw = this.canvasWidth;
        const ch = this.canvasHeight;
        const iw = this.imgWidth;
        const ih = this.imgHeight;

        if (this.zoomPosition && mode === 'center') {
            this.sourceX = this.zoomPosition.x - cw / 2 / ss;
            this.sourceY = this.zoomPosition.y - ch / 2 / ss;
        } else {
            this.sourceX = this.sourceX + (cw / ps - cw / ss) / 2;
            this.sourceY = this.sourceY + (ch / ps - ch / ss) / 2;
        }
        const sx = this.sourceX;
        const sy = this.sourceY;

        if (sx > iw - cw / ss) {
            this.sourceX = iw - cw / ss;
        }
        if (sy > ih - ch / ss) {
            this.sourceY = ih - ch / ss;
        }
        if (sx < 0) {
            this.sourceX = 0;
        }
        if (sy < 0) {
            this.sourceY = 0;
        }
        this.draw();
    }

    // 图片左移
    moveLeft() {
        const ss = this.scaleSize;
        const cw = this.canvasWidth;
        const iw = this.imgWidth;
        const speed = this.scrollSpeed;
        const sx = this.sourceX - speed;

        if (sx >= 0 && sx <= iw - cw / ss) {
            this.sourceX = sx;
        } else {
            this.sourceX = 0;
        }
        this.draw();
    }

    // 图片右移
    moveRight() {
        const ss = this.scaleSize;
        const cw = this.canvasWidth;
        const iw = this.imgWidth;
        const speed = this.scrollSpeed;
        const sx = this.sourceX + speed;

        if (sx >= 0 && sx <= iw - cw / ss) {
            this.sourceX = sx;
        } else {
            this.sourceX = iw - cw / ss;
        }
        this.draw();
    }

    // 图片下移
    moveDown() {
        const ss = this.scaleSize;
        const ch = this.canvasHeight;
        const ih = this.imgHeight;
        const speed = this.scrollSpeed;
        const sy = this.sourceY + speed;

        if (sy >= 0 && sy <= ih - ch / ss) {
            this.sourceY = sy;
        } else {
            this.sourceY = ih - ch / ss;
        }
        this.draw();
    }

    // 图片上移
    moveUp() {
        const ss = this.scaleSize;
        const ch = this.canvasHeight;
        const ih = this.imgHeight;
        const speed = this.scrollSpeed;
        const sy = this.sourceY - speed;

        if (sy >= 0 && sy <= ih - ch / ss) {
            this.sourceY = sy;
        } else {
            this.sourceY = 0;
        }
        this.draw();
    }

    // 绘制矩形
    drawRect(rect) {
        let {
            x,
            y,
            w,
            h,
            color,
            selected
        } = rect;

        if (selected) {
            this.ctx.setLineDash([5, 5]);
        } else {
            this.ctx.setLineDash([1, 0]);
        }
        x = (x - this.sourceX) * this.scaleSize;
        y = (y - this.sourceY) * this.scaleSize;
        w *= this.scaleSize;
        h *= this.scaleSize;
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.strokeRect(x, y, w, h);
        if (rect.label) {
            const textPosition = {
                x: rect.x + rect.w / 2,
                y: rect.y + rect.h / 2 + this.textFontSize / 2 / this.scaleSize
            };

            textPosition.x = (textPosition.x - this.sourceX) * this.scaleSize;
            textPosition.y = (textPosition.y - this.sourceY) * this.scaleSize;
            this.ctx.fillStyle = '#ff0';
            this.ctx.textAlign = 'center';
            this.ctx.font = '20px serif';
            this.ctx.fillText(rect.label, textPosition.x, textPosition.y);
            this.ctx.fillStyle = rect.color;
        }
    }

    // 绘制圆形
    drawCircle(circle, solid) {
        let {
            x,
            y,
            r,
            color,
            selected
        } = circle;
        // r = r * this.scaleSize

        if (selected) {
            this.ctx.setLineDash([5, 5]);
        } else {
            this.ctx.setLineDash([1, 0]);
        }
        x = (x - this.sourceX) * this.scaleSize;
        y = (y - this.sourceY) * this.scaleSize;
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        if (!solid) {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        } else {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
    }

    // 绘制实心点
    drawPoint(point) {
        let {
            x,
            y,
            r,
            color,
            selected
        } = point;

        x = (x - this.sourceX) * this.scaleSize;
        y = (y - this.sourceY) * this.scaleSize;
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        if (selected) {
            this.ctx.arc(x, y, r, 0, Math.PI * 2);
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        } else {
            this.ctx.arc(x, y, r, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
    }

    // 绘制线段
    drawLine(sPoint, ePoint, color, selected) {
        sPoint = {
            ...sPoint,
            x: (sPoint.x - this.sourceX) * this.scaleSize,
            y: (sPoint.y - this.sourceY) * this.scaleSize
        };
        ePoint = {
            ...ePoint,
            x: (ePoint.x - this.sourceX) * this.scaleSize,
            y: (ePoint.y - this.sourceY) * this.scaleSize
        };
        if (selected) {
            this.ctx.setLineDash([5, 5]);
        } else {
            this.ctx.setLineDash([1, 0]);
        }
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(sPoint.x, sPoint.y);
        this.ctx.lineTo(ePoint.x, ePoint.y);
        this.ctx.stroke();
    }

    // 绘制多边形
    drawBrokenLine(polygon) {
        let {
            points,
            color,
            isCompleted,
            selected,
            r
        } = polygon;

        points.forEach((point, index) => {
            const {
                x,
                y
            } = point;

            if (this.selectedShape && this.selectedShape.shapeId === polygon.id && this.selectedShape.pointId === index) {
                color = '#0f0';
                this.drawCircle({
                    x,
                    y,
                    r,
                    selected,
                    color
                }, 'solid');
                color = polygon.color;
            } else {
                this.drawCircle({
                    x,
                    y,
                    r,
                    selected,
                    color
                });
                color = polygon.color;
            }

            color = polygon.color;
            if (index > 0 && index < points.length) {
                this.drawLine(points[index - 1], point, color, selected);
            }
        });
        if (isCompleted) {
            this.drawLine(points[points.length - 1], points[0], color, selected);
        }
    }

    // 绘制全部
    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.drawOwnImage();
        this.ctx.beginPath();
        this.drawShapes();
    }

    // 绘制当前图形
    drawOwnImage() {
        this.ctx.drawImage(this.img, this.sourceX, this.sourceY, this.canvasWidth / this.scaleSize, this.canvasHeight / this.scaleSize, 0, 0, this.canvasWidth, this.canvasHeight);
    }

    drawLabel(polygon) {
        let maxX = polygon.points[0].x;
        let minX = polygon.points[0].x;
        let maxY = polygon.points[0].y;
        let minY = polygon.points[0].y;

        polygon.points.forEach(item => {
            if (item.x > maxX) {
                maxX = item.x;
            }
            if (item.y > maxY) {
                maxY = item.y;
            }
            if (item.x < minX) {
                minX = item.x;
            }
            if (item.y < minY) {
                minY = item.y;
            }
        });
        const textPosition = {
            x: (maxX + minX) / 2,
            y: (maxY + minY) / 2 + this.textFontSize / 2 / this.scaleSize
        };

        textPosition.x = (textPosition.x - this.sourceX) * this.scaleSize;
        textPosition.y = (textPosition.y - this.sourceY) * this.scaleSize;
        this.ctx.fillStyle = '#ff0';
        this.ctx.textAlign = 'center';
        this.ctx.font = '20px serif';
        this.ctx.fillText(polygon.label, textPosition.x, textPosition.y);
        this.ctx.fillStyle = polygon.color;
    }

    quickMark() { }

    // 绘制所有图形
    drawShapes() {
        if (this.shapes.length > 0) {
            for (let index = 0; index < this.shapes.length; index++) {
                const item = this.shapes[index];

                if (!item.isDelete) {
                    if (item.paintType === 1) {
                        this.drawRect(item);
                    }
                    if (item.paintType === 2) {
                        this.drawCircle(item);
                    }
                    if (item.paintType === 3 || item.paintType === 5) {
                        if (item.label) {
                            this.drawLabel(item);
                        }
                        this.drawBrokenLine({
                            ...item,
                            r: 3
                        });
                    }
                    if (item.paintType === 4) {
                        this.drawPoint({
                            ...item,
                            r: 3
                        });
                    }
                }
            }
        } else {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.drawOwnImage();
        }
    }
}
