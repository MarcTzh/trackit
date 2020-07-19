const lazada = require('../Lazada');
const q10 = require('../q10');
const amazon = require('../Amazon');
const { checkPrice } = require('../checkPrice');
// jest.setTimeout(5000);


test('Amazon puppeteer', () => {
    const url = 'https://www.amazon.sg/ASUS-MX34VQ-Curved-Monitor-Dark/dp/B076G3X26M?ref_=s9_apbd_simh_hd_bw_b6tKmeR&pf_rd_r=Q8JXJJGZ570KZ05BZK33&pf_rd_p=4176285e-21fd-5c35-ae64-d5444cdbee0e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051';
    return amazon.checkAmazonPrice(url).then(price => {
        expect(price).toBe(1299);
    });
});

test('Amazon puppeteer (checkPrice)', () => {
    const url = 'https://www.amazon.sg/ASUS-MX34VQ-Curved-Monitor-Dark/dp/B076G3X26M?ref_=s9_apbd_simh_hd_bw_b6tKmeR&pf_rd_r=Q8JXJJGZ570KZ05BZK33&pf_rd_p=4176285e-21fd-5c35-ae64-d5444cdbee0e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051';
    return checkPrice(url).then(price => {
        expect(price).toBe(1299);
    });
});

test('Lazada puppeteer', () => {
    const url = 'https://www.lazada.sg/products/apple-airpods-pro-i457194887-s1226848688.html?spm=a2o42.10453684.0.0.2a071771vghSkC';
    return lazada.checkLazadaPrice(url).then(price => {
        expect(price).toBe(319);
    });
});

test('Lazada puppeteer (checkPrice)', () => {
    const url = 'https://www.lazada.sg/products/apple-airpods-pro-i457194887-s1226848688.html?spm=a2o42.10453684.0.0.2a071771vghSkC';
    return checkPrice(url).then(price => {
        expect(price).toBe(319);
    });
});

test('Qoo10 puppeteer', () => {
    const url = 'https://www.qoo10.sg/gmkt.inc/Goods/Goods.aspx?goodscode=634868559';
    return q10.q10CheckPrice(url).then(price => {
        expect(price).toBe(189);
    });
})

test('Qoo10 puppeteer (checkPrice)', () => {
    const url = 'https://www.qoo10.sg/gmkt.inc/Goods/Goods.aspx?goodscode=634868559';
    return checkPrice(url).then(price => {
        expect(price).toBe(189);
    });
})

// test('abc', () => {
//     expect(123).toBe(123);
// });