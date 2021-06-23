import $bus from '@/utils/eventBus';
import { debounce } from '@/utils';

let imgs = [];

function handleScroll() {
    setImages();
}

$bus.on('scroll', debounce(handleScroll, 50));

function setImages() {
    for (const imgObj of imgs) {
        setImage(imgObj);
    }
}

function setImage(imgObj) {
    const { top } = imgObj.dom.getBoundingClientRect();
    if (top < window.innerHeight) {
        const newImg = new Image();
        newImg.onload = () => {
            imgObj.dom.src = imgObj.src;
            imgs = imgs.filter(i => i !== imgObj);
        };
        newImg.src = imgObj.src;
    }
}

export default {
    inserted(el, binding) {
        const img = {
            dom: el,
            src: binding.value,
        };
        setImage(img);
        imgs.push(img);
    },
    unbind(el) {
        imgs = imgs.filter(i => i.dom === el);
    },
};
