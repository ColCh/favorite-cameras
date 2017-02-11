import replaceParam from '../replace-param-value';


describe('replaceParam', () => {
  it('should add param', () => {
    expect(replaceParam('http://google.ru/', 'goo', 'foo')).toEqual('http://google.ru/?goo=foo');
  });
  
  it('should add param as second param', () => {
    expect(replaceParam('http://google.ru/?someparam=someval', 'goo', 'foo')).toEqual('http://google.ru/?someparam=someval&goo=foo');
  });
  
  it('should add param to the list of params', () => {
    expect(replaceParam('http://google.ru/?someparam=someval&foo=bar', 'goo', 'foo')).toEqual('http://google.ru/?someparam=someval&foo=bar&goo=foo');
  });
  
  it('should correct param', () => {
    expect(replaceParam('http://google.ru/?goo=bar', 'goo', 'foo')).toEqual('http://google.ru/?goo=foo');
  });
  
  it('should correct param when two params presented', () => {
    expect(replaceParam('http://google.ru/?someparam=someval&goo=bar', 'goo', 'foo')).toEqual('http://google.ru/?someparam=someval&goo=foo');
  });
  
  it('should correct param when list of params presented', () => {
    expect(replaceParam('http://google.ru/?someparam=someval&foo=bar&goo=bar', 'goo', 'foo')).toEqual('http://google.ru/?someparam=someval&foo=bar&goo=foo');
  });
});