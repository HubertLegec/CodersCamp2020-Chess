import { URLParameters } from '../src/app/URLParameters';

describe('URLParameters', () => {

    test('get array with params from url', () => {
        const urlParameters = new URLParameters('?name1=green&name2=yellow&name3=black');

        const params = urlParameters.getParams();

        expect(params[0]).toEqual('green');
        expect(params[1]).toEqual('yellow');
        expect(params[2]).toEqual('black');
    })
    
})