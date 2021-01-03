import IMailTemaplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemaplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
