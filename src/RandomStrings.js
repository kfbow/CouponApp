/** @flow */
'use strict';

// Cycle through different phrases when describing the prices

const randomValue = (a) => {
    return a[Math.floor(Math.random() * a.length)];
}

export const stringOriginal = () => {
    return randomValue([
        'retail',
        "don't pay",
        "why pay",
        "regular price",
        "others pay",
    ]);
}

export const stringDiscounted = () => {
    return randomValue([
        'discounted',
        'only here',
        'through us',
        'with coupon',
        'with voucher',
        'use our code',
    ]);
}
