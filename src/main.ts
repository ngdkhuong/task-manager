import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GraphPublisher } from '@nestjs/devtools-integration';

async function bootstrap() {
  const shouldPublishGraph = process.env.PUBLISH_GRAPH === 'true';

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    logger: ['error', 'warn', 'log'],
    cors: true,
  });
  await app.listen(3000);

  if (shouldPublishGraph) {
    await app.init();

    const publishOptions = {
      apiKey: process.env.DEVTOOLS_API_KEY,
      repository: process.env.REPOSITORY_NAME,
      owner: process.env.GITHUB_REPOSITORY_OWNER,
      sha: process.env.COMMIT_SHA,
      target: process.env.TARGET_SHA,
      trigger: process.env.GITHUB_BASE_REF ? 'pull' : 'push',
      branch: process.env.BRANCH_NAME,
    }; // Replace 'key' and 'value' with the appropriate properties and values for your use case
    const graphPublisher = new GraphPublisher(app);

    await graphPublisher.publish(publishOptions);

    await app.close();
  } else {
    await app.listen(3000);
  }
}
bootstrap();
