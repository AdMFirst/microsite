
import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

export async function GET(req: NextRequest) {
  const url = 'https://css4.pub/2015/usenix/example.pdf';

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        resolve(
          NextResponse.json({ error: `Failed to fetch ${url}: ${response.statusMessage}` }, { status: response.statusCode })
        );
        return;
      }

      const headers = new Headers();
      headers.set('Content-Type', 'application/pdf');

      const readableStream = new ReadableStream({
        start(controller) {
          response.on('data', (chunk) => {
            controller.enqueue(chunk);
          });

          response.on('end', () => {
            controller.close();
          });

          response.on('error', (err) => {
            controller.error(err);
          });
        }
      });

      const res = new NextResponse(readableStream, { headers });
      resolve(res);
    }).on('error', (error) => {
      resolve(
        NextResponse.json({ error: error.message }, { status: 500 })
      );
    });
  });
}
