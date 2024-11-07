import type { SNSHandler } from 'aws-lambda'

export const handler: SNSHandler = async event => {
  const [record] = event.Records
  console.log(record.Sns.Message)
}
