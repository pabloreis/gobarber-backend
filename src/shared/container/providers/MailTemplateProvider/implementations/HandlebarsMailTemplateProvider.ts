import Handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemaplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemaplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = Handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
