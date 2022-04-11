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
    return Math.floor(n) || 1;
};

export default function drawRuler(ctx: CanvasRenderingContext2D, opt: RulerOpt) {
    const { width, height, ratio } = opt;

    // todo
    ctx.font = `${10}px -apple-system, 
        "Helvetica Neue", ".SFNSText-Regular", 
        "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB", 
        "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`;
    ctx.lineWidth = 1;
    ctx.textBaseline = 'middle';

    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, width, height);

    // 画标尺底色
    ctx.fillStyle = '#0e0f12';
    ctx.fillRect(0, 0, width, height);

    // 文字颜色
    ctx.fillStyle = '#68727e';
    // 刻度颜色
    ctx.strokeStyle = '#444';

    opt.direction === 'vertical' ? drawV(ctx, opt) : drawH(ctx, opt);
}

// eslint-disable-next-line max-statements
function drawV(ctx: CanvasRenderingContext2D, opt: RulerOpt) {
    const { ratio, height, scale, spaceWidth } = opt;
    const start = opt.start - spaceWidth / scale;

    ctx.scale(1 / ratio, 1 / ratio);
    ctx.beginPath();

    // 一个刻度表示像素值
    const gapSize = getTickGap(scale);
    // 一个刻度实际像素值
    const gapPixel = gapSize * scale;
    const startVal = Math.floor(start / gapSize) * gapSize;
    const endVal = start + Math.ceil(height / scale);
    const offset = (startVal - start) / gapSize * gapPixel;

    for (let val = startVal, count = 0; val < endVal; val += gapSize, count++) {
        const y = offset + count * gapPixel;
        ctx.moveTo(0, y);
        if (val % (gapSize * 10) === 0) {
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

function drawH(ctx: CanvasRenderingContext2D, opt: RulerOpt) {
    const { ratio, width, scale, spaceWidth } = opt;
    const start = opt.start - spaceWidth / scale;

    ctx.scale(1 / ratio, 1 / ratio);
    ctx.beginPath();

    // 一个刻度表示像素值
    const gapSize = getTickGap(scale);
    // 一个刻度实际像素值
    const gapPixel = gapSize * scale;
    const startVal = Math.floor(start / gapSize) * gapSize;
    const endVal = start + Math.ceil(width / scale);
    const offset = (startVal - start) / gapSize * gapPixel;

    for (let val = startVal, count = 0; val < endVal; val += gapSize, count++) {
        const x = offset + count * gapPixel;
        ctx.moveTo(x, 0);
        if (val % (gapSize * 10) === 0) {
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
    spaceWidth: number;
}
