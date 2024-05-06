(async ()=>{
    let xPercent = 100;
    const cnv = document.querySelector(".corousel");
    if (cnv === null) return;
    const ctx = cnv.getContext("2d");
    const throttle = (callee, timeout)=>{
        // Таймер будет определять,
        // надо ли нам пропускать текущий вызов.
        let timer = null;
        // Как результат возвращаем другую функцию.
        // Это нужно, чтобы мы могли не менять другие части кода,
        // чуть позже мы увидим, как это помогает.
        return function perform(...args) {
            // Если таймер есть, то функция уже была вызвана,
            // и значит новый вызов следует пропустить.
            if (timer) return;
            // Если таймера нет, значит мы можем вызвать функцию:
            timer = setTimeout(()=>{
                // Аргументы передаём неизменными в функцию-аргумент:
                callee(...args);
                // По окончании очищаем таймер:
                clearTimeout(timer);
                timer = null;
            }, timeout);
        };
    };
    let images = [].map.call(document.querySelector(".preload-images").querySelectorAll("img"), (el)=>el.src);
    let drawImageIndex = 0;
    let scale = 1;
    const throttledDraw = throttle(()=>{
        requestAnimationFrame(()=>{
            const rect = cnv.getBoundingClientRect();
            xPercentCurr = parseInt(rect.bottom / (window.innerHeight + 400) * 100);
            xPercentCurr > 99 && (xPercentCurr = 99);
            xPercentCurr < 0 && (xPercentCurr = 0);
            if (xPercent === xPercentCurr) return;
            xPercent = xPercentCurr;
            const currDraw = Math.floor(images.length / 100 * xPercent);
            drawImageIndex = currDraw;
            scale = 1;
            if (scale < 1) scale = 1;
        });
    }, 100);
    document.addEventListener("scroll", throttledDraw);
    const loadedImages = await Promise.all(images.map((url)=>{
        return new Promise((resolve)=>{
            const img = new Image();
            img.addEventListener("load", ()=>{
                resolve(img);
            }, false);
            img.src = url;
        });
    })).then((images)=>{
        return images.map((img)=>{
            const cnv = document.createElement("canvas");
            cnv.width = 1920;
            cnv.height = 1038;
            const ctx = cnv.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const imgData = ctx.getImageData(0, 0, 1920, 1038);
            const data = imgData.data;
            for(let i = 0; i < data.length; i += 4){
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];
                const alpha = data[i + 3];
                if (red > 240 && green > 240 && blue > 240) {
                    data[i] = 0;
                    data[i + 1] = 0;
                    data[i + 2] = 0;
                    data[i + 3] = 1;
                }
                if (red > 200 && green > 200 && blue > 200) {
                    data[i] = 0;
                    data[i + 1] = 0;
                    data[i + 2] = 0;
                    data[i + 3] = 0.5;
                }
            }
            var img = new Image;
            return imgData;
        });
    });
    function loop() {
        ctx.putImageData(loadedImages[drawImageIndex], 0, 0);
        cnv.style.transform = `scale(${scale})`;
        window.requestAnimationFrame(loop);
    }
    loop();
})();

//# sourceMappingURL=index.14eab4da.js.map
