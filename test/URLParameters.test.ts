import { URLParameters } from '../src/app/display/URLParameters';

describe('URLParameters', () => {

    test('get params from url', () => {
        const urlParameters = new URLParameters('?name1=green&name2=yellow&name3=black');

        const firstName = urlParameters.getFirstName();
        const secondName = urlParameters.getSecondName();
        const time = urlParameters.getTime();

        expect(firstName).toEqual('green');
        expect(secondName).toEqual('yellow');
        expect(time).toEqual('black');
    })
    
})