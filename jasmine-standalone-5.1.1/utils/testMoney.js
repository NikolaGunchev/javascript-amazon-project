import { formatCurrency } from "../../scirpts/utils/money.js";

describe('test suite: formatCurrency',()=>{
    it('convert cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95')
    })

    it('works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00')
    })

    it('rounds up to the nearest integer',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01')
    })
})