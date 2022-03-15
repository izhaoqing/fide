// const FONT_SCALE = 0.83; // 10 / 12

// 标尺中每小格代表的宽度(根据scale的不同实时变化)
// const getGridSize = (scale: number) => {
//     if (scale <= 0.25) return 40;
//     if (scale <= 0.5) return 20;
//     if (scale <= 1) return 10;
//     if (scale <= 2) return 5;
//     if (scale <= 4) return 2;
//     return 1;
// };

// 一个刻度表示像素值
const getTickGap = (scale: number) => {
    const n = 10 / scale;
    return Math.floor(n);
};

// eslint-disable-next-line max-statements
export default function drawRuler(ctx: CanvasRenderingContext2D, opt: RulerOpt) {
    // const { scale, start, width, height, ratio } = opt;

    // tick
    // const gridSize = getGridSize(scale); // 每小格表示的宽度
    // const gridPixel = gridSize * scale;
    // const gridSize10 = gridSize * 10; // 每大格表示的宽度
    // const gridPixel10 = gridSize10 * scale;

    // const startValue = Math.floor(start / gridSize) * gridSize; // 绘制起点的刻度(略小于start, 且是gridSize的整数倍)
    // const startValue10 = Math.floor(start / gridSize10) * gridSize10; // 长间隔绘制起点的刻度(略小于start, 且是gridSize_10的整数倍)

    // const offsetX = (startValue - start) / gridSize * gridPixel; // 起点刻度距离ctx原点(start)的px距离
    // const offsetX10 = (startValue10 - start) / gridSize10 * gridPixel10; // 长间隔起点刻度距离ctx原点(start)的px距离
    // const endValue = start + Math.ceil(width / scale); // 终点刻度(略超出标尺宽度即可)

    // // 3. 画刻度和文字(因为刻度遮住了阴影)
    // ctx.beginPath(); // 一定要记得开关路径,因为clearRect并不能清除掉路径,如果不关闭路径下次绘制时会接着上次的绘制

    // 文字颜色
    ctx.fillStyle = '#68727e';
    // 刻度颜色
    ctx.strokeStyle = '#444';
    // // 长间隔和短间隔需要两次绘制，才可以完成不同颜色的设置；分开放到两个for循环是为了节省性能，因为如果放到一个for循环的话，每次循环都会重新绘制操作dom
    // // 绘制长间隔和文字
    // for (let value = startValue10, count = 0; value < endValue; value += gridSize10, count++) {
    //     const x = offsetX10 + count * gridPixel10 + 0.5; // prevent canvas 1px line blurry
    //     ctx.moveTo(x, 0);
    //     ctx.save();
    //     ctx.translate(x, height * 0.4);
    //     ctx.scale(FONT_SCALE / ratio, FONT_SCALE / ratio);
    //     ctx.fillText(`${value}`, 4 * ratio, 7 * ratio);
    //     ctx.restore();
    //     ctx.lineTo(x, height * 9 / 16);
    // }

    // ctx.stroke();
    // ctx.closePath();

    // // 绘制短间隔
    // ctx.beginPath();
    // ctx.strokeStyle = '#353f51';
    // for (let value = startValue, count = 0; value < endValue; value += gridSize, count++) {
    //     const x = offsetX + count * gridPixel + 0.5; // prevent canvas 1px line blurry
    //     ctx.moveTo(x, 0);
    //     if (value % gridSize10 !== 0) {
    //         ctx.lineTo(x, height * 1 / 4);
    //     }
    // }
    // ctx.stroke();
    // ctx.closePath();

    // // 恢复ctx matrix
    // ctx.setTransform(1, 0, 0, 1, 0, 0);

    opt.direction === 'vertical' ? drawV(ctx, opt) : drawH(ctx, opt);
}

function drawV(ctx: CanvasRenderingContext2D, opt: RulerOpt) {
    const { ratio, start, height } = opt;
    const scale = opt.scale * 1;

    ctx.scale(1 / ratio, 1 / ratio);
    ctx.beginPath();

    // 一个刻度表示像素值
    const gapSize = getTickGap(scale);
    // 一个刻度实际像素值
    const gapPixel = getTickGap(scale) * scale;
    // const longRatio = shortRatio * 10;
    const endVal = Math.ceil(height / scale);

    for (let val = start, count = 0; val < endVal; val += gapSize, count++) {
        const y = count * gapPixel;
        ctx.moveTo(0, y);
        if (count % 10 === 0) {
            ctx.lineTo(20, y + 0.5);
            ctx.save();
            ctx.rotate(Math.PI / 2);
            ctx.translate(4, -14);
            ctx.fillText(`${val}`, y, 0);
            ctx.restore();
        } else {
            ctx.lineTo(6, y + 0.5);
        }
    }
    ctx.stroke();
}

// eslint-disable-next-line max-statements
function drawH(ctx: CanvasRenderingContext2D, opt: RulerOpt) {
    const { ratio, width } = opt;
    const start = 0;
    const scale = opt.scale * 13;

    ctx.scale(1 / ratio, 1 / ratio);
    ctx.beginPath();

    // 一个刻度表示像素值
    const gapSize = getTickGap(scale);
    // 一个刻度实际像素值
    const gapPixel = getTickGap(scale) * scale;
    // const longRatio = shortRatio * 10;
    const endVal = Math.ceil(width / scale);

    for (let val = start, count = 0; val < endVal; val += gapSize, count++) {
        const x = count * gapPixel;
        ctx.moveTo(x, 0);
        if (count % 10 === 0) {
            ctx.lineTo(x + 0.5, 20);
            ctx.fillText(`${val}`, x + 4, 14);
        } else {
            ctx.lineTo(x + 0.5, 6);
        }
    }
    ctx.stroke();
}

export interface RulerOpt {
    width: number;
    height: number;
    direction: 'vertical' | 'horizontal';
    scale: number;
    start: number;
    ratio: number;
}
