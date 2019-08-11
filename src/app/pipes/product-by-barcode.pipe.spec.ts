import { ProductByBarcodePipe } from './product-by-barcode.pipe';

describe('ProductByBarcodePipe', () => {
  it('create an instance', () => {
    const pipe = new ProductByBarcodePipe();
    expect(pipe).toBeTruthy();
  });
});
