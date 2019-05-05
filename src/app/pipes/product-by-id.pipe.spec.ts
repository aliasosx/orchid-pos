import { ProductByIdPipe } from './product-by-id.pipe';

describe('ProductByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
