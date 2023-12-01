import {SIZE_UNITS} from '@/consts'

export const formatSize = (length: number) => {

    let i = 0;

    while ((length / 1000) | 0 && i < SIZE_UNITS.length - 1) {
        length /= 1024;

        i++;
    }

    return `${length.toFixed(2)} ${SIZE_UNITS[i]}`;
}