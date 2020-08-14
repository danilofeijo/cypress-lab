/// <reference types="cypress" />

describe('Asserts', () => {
  it('Equality', () => {
    const a = 1;

    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a, 'Deveria ser 1').to.be.equal(1);

    expect('a').to.be.equal('a');
    expect('a').not.to.be.equal('b');
  });

  it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(b).to.be.null;
    expect(a).not.to.be.null;
    expect(c).to.be.undefined;
  });

  it('Object equality', () => {
    const obj = {
      a: 1,
      b: 2,
    };

    expect(obj).eq(obj);
    expect(obj).eql(obj);
    expect(obj).eqls(obj);
    expect(obj).equal(obj);
    expect(obj).equals(obj);
    expect(obj).to.be.equal(obj);

    expect(obj).to.be.deep.equal({ a: 1, b: 2 });
    expect(obj).to.be.eql({ a: 1, b: 2 });

    expect(obj).include({ a: 1 });
    expect(obj).to.have.property('a');
    expect(obj).to.have.property('b', 2);
    expect(obj).to.not.be.empty;
    expect({}).to.be.empty;
  });

  it('Array equality', () => {
    const arr = [1, 2, 3];

    expect(arr).to.have.members([1, 2, 3]);
    expect(arr).to.include.members([1, 3]);
    expect(arr).to.not.be.empty;
    expect([]).to.be.empty;
  });

  it('Type asserts', () => {
    const str = 'String';
    const num = 1;

    expect(str).to.be.a('string');
    expect(num).to.be.a('number');
    expect({}).to.be.an('object');
    expect([]).to.be.an('array');
  });

  it('String asserts', () => {
    const str = 'String Lorem Ipsum';

    expect(str).to.be.equal('String Lorem Ipsum');
    expect(str).to.have.length(18);
    expect(str).to.contains('Lorem');
    expect(str).to.match(/String/);
    expect(str).to.match(/^Str/);
    expect(str).to.match(/sum$/);
    expect(str).to.match(/.{18}/);
    expect(str).to.match(/\w+/);
    expect(str).to.match(/\D+/);
  });

  it('Number asserts', () => {
    const number = 3;
    const floatNum = 4.5;

    expect(number).to.be.equal(3);
    expect(number).to.be.above(2.99);
    expect(number).to.be.below(3.01);
    expect(floatNum).to.be.equal(4.5);
    expect(floatNum).to.be.closeTo(4.49, 0.01);
  });
});
