const { checkPrice } = require('../AmazonParser');
// const { webscrapping } = require('../../src/Webscraping/Webscraping');
jest.setTimeout(5000);
//web crawler
test('price check (ourprice) in SG store 1', () => {
    const input = 'https://www.amazon.sg/ASUS-MX34VQ-Curved-Monitor-Dark/dp/B076G3X26M?ref_=s9_apbd_simh_hd_bw_b6tKmeR&pf_rd_r=Q8JXJJGZ570KZ05BZK33&pf_rd_p=4176285e-21fd-5c35-ae64-d5444cdbee0e&pf_rd_s=merchandised-search-12&pf_rd_t=BROWSE&pf_rd_i=6314449051';
    return checkPrice(input).then(price => {
        expect(price).toBe(1299);
    });
});

test('price check (ourprice) in SG store 2', () => {
    const input = 'https://www.amazon.sg/ASUS-XG27VQ-1920x1080-Adaptive-Sync-FreeSyncTM/dp/B076G2V2X8?pf_rd_r=JD6NGA86YRAPS62VFRTC&pf_rd_p=c00ec331-cbe5-48d8-b516-23dbeab1a1aa&pd_rd_r=04c561d9-297f-4ea5-965c-c77dbc3d4d6f&pd_rd_w=UiIl0&pd_rd_wg=SlPdF&ref_=pd_gw_unk';
    return checkPrice(input).then(price => {
        expect(price).toBe(719);
    });
});

test('abc', () => {
    expect(123).toBe(123);
});